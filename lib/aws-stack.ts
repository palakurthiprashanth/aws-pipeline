import * as cdk from '@aws-cdk/core';
import { Pipeline, Artifact } from "@aws-cdk/aws-codepipeline";
import { CodeBuildAction, GitHubSourceAction } from "@aws-cdk/aws-codepipeline-actions";
import { SecretValue } from "@aws-cdk/core"
import { BuildSpec, LinuxBuildImage, PipelineProject } from '@aws-cdk/aws-codebuild';
// import * as sqs from '@aws-cdk/aws-sqs';

export class PipelineStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const pipeline= new Pipeline(this, "Pipeline", {
      pipelineName: 'Pipeline',
      crossAccountKeys: false,
    })

    const sourceOutput= new Artifact('sourceOutput');

    pipeline.addStage({
      stageName: 'Source',
      actions: [
        new GitHubSourceAction({
          actionName: 'Github_Source',
          owner: 'palakurthiprashanth',
          repo: 'aws-pipeline',
          oauthToken: SecretValue.secretsManager('github-token'),
          output: sourceOutput,
        })
      ]
    });

    const cdkBuildProject= new Artifact('cdkBuildProject');

    pipeline.addStage({
      stageName: 'Build',
      actions: [
        new CodeBuildAction({
          actionName: 'Build',
          input: sourceOutput,
          outputs: [ cdkBuildProject ],
          project: new PipelineProject(this, "cdkBuildProject", {
            environment: {
              buildImage: LinuxBuildImage.STANDARD_5_0
            },
            buildSpec: BuildSpec.fromSourceFilename(
              "build-specs/cdk-build-spec.yml"
            )
          })
        })
      ]
    });
  }
}
