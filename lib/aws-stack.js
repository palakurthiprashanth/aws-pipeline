"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelineStack = void 0;
const cdk = require("@aws-cdk/core");
const aws_codepipeline_1 = require("@aws-cdk/aws-codepipeline");
const aws_codepipeline_actions_1 = require("@aws-cdk/aws-codepipeline-actions");
const core_1 = require("@aws-cdk/core");
const aws_codebuild_1 = require("@aws-cdk/aws-codebuild");
// import * as sqs from '@aws-cdk/aws-sqs';
class PipelineStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const pipeline = new aws_codepipeline_1.Pipeline(this, "Pipeline", {
            pipelineName: 'Pipeline',
            crossAccountKeys: false,
        });
        const sourceOutput = new aws_codepipeline_1.Artifact('sourceOutput');
        pipeline.addStage({
            stageName: 'Source',
            actions: [
                new aws_codepipeline_actions_1.GitHubSourceAction({
                    actionName: 'GitHub_Source',
                    owner: 'prashanth',
                    repo: 'aws-pipeline',
                    oauthToken: core_1.SecretValue.secretsManager('github-code-pipeline-token'),
                    output: sourceOutput,
                })
            ]
        });
        const cdkBuildProject = new aws_codepipeline_1.Artifact('cdkBuildProject');
        pipeline.addStage({
            stageName: 'Build',
            actions: [
                new aws_codepipeline_actions_1.CodeBuildAction({
                    actionName: 'Build',
                    input: sourceOutput,
                    outputs: [cdkBuildProject],
                    project: new aws_codebuild_1.PipelineProject(this, "cdkBuildProject", {
                        environment: {
                            buildImage: aws_codebuild_1.LinuxBuildImage.STANDARD_5_0
                        },
                        buildSpec: aws_codebuild_1.BuildSpec.fromSourceFilename('build-specs/cdk-build.spec.yml')
                    })
                })
            ]
        });
    }
}
exports.PipelineStack = PipelineStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXdzLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUFxQztBQUNyQyxnRUFBK0Q7QUFDL0QsZ0ZBQXdGO0FBQ3hGLHdDQUEyQztBQUMzQywwREFBcUY7QUFDckYsMkNBQTJDO0FBRTNDLE1BQWEsYUFBYyxTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQzFDLFlBQVksS0FBb0IsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDbEUsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxRQUFRLEdBQUUsSUFBSSwyQkFBUSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUU7WUFDN0MsWUFBWSxFQUFFLFVBQVU7WUFDeEIsZ0JBQWdCLEVBQUUsS0FBSztTQUN4QixDQUFDLENBQUE7UUFFRixNQUFNLFlBQVksR0FBRSxJQUFJLDJCQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFakQsUUFBUSxDQUFDLFFBQVEsQ0FBQztZQUNoQixTQUFTLEVBQUUsUUFBUTtZQUNuQixPQUFPLEVBQUU7Z0JBQ1AsSUFBSSw2Q0FBa0IsQ0FBQztvQkFDckIsVUFBVSxFQUFFLGVBQWU7b0JBQzNCLEtBQUssRUFBRSxXQUFXO29CQUNsQixJQUFJLEVBQUUsY0FBYztvQkFDcEIsVUFBVSxFQUFFLGtCQUFXLENBQUMsY0FBYyxDQUFDLDRCQUE0QixDQUFDO29CQUNwRSxNQUFNLEVBQUUsWUFBWTtpQkFDckIsQ0FBQzthQUNIO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsTUFBTSxlQUFlLEdBQUUsSUFBSSwyQkFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFdkQsUUFBUSxDQUFDLFFBQVEsQ0FBQztZQUNoQixTQUFTLEVBQUUsT0FBTztZQUNsQixPQUFPLEVBQUU7Z0JBQ1AsSUFBSSwwQ0FBZSxDQUFDO29CQUNsQixVQUFVLEVBQUUsT0FBTztvQkFDbkIsS0FBSyxFQUFFLFlBQVk7b0JBQ25CLE9BQU8sRUFBRSxDQUFFLGVBQWUsQ0FBRTtvQkFDNUIsT0FBTyxFQUFFLElBQUksK0JBQWUsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUU7d0JBQ3BELFdBQVcsRUFBRTs0QkFDWCxVQUFVLEVBQUUsK0JBQWUsQ0FBQyxZQUFZO3lCQUN6Qzt3QkFDRCxTQUFTLEVBQUUseUJBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxnQ0FBZ0MsQ0FBQztxQkFDMUUsQ0FBQztpQkFDSCxDQUFDO2FBQ0g7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUEzQ0Qsc0NBMkNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuaW1wb3J0IHsgUGlwZWxpbmUsIEFydGlmYWN0IH0gZnJvbSBcIkBhd3MtY2RrL2F3cy1jb2RlcGlwZWxpbmVcIjtcbmltcG9ydCB7IENvZGVCdWlsZEFjdGlvbiwgR2l0SHViU291cmNlQWN0aW9uIH0gZnJvbSBcIkBhd3MtY2RrL2F3cy1jb2RlcGlwZWxpbmUtYWN0aW9uc1wiO1xuaW1wb3J0IHsgU2VjcmV0VmFsdWUgfSBmcm9tIFwiQGF3cy1jZGsvY29yZVwiXG5pbXBvcnQgeyBCdWlsZFNwZWMsIExpbnV4QnVpbGRJbWFnZSwgUGlwZWxpbmVQcm9qZWN0IH0gZnJvbSAnQGF3cy1jZGsvYXdzLWNvZGVidWlsZCc7XG4vLyBpbXBvcnQgKiBhcyBzcXMgZnJvbSAnQGF3cy1jZGsvYXdzLXNxcyc7XG5cbmV4cG9ydCBjbGFzcyBQaXBlbGluZVN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5Db25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIGNvbnN0IHBpcGVsaW5lPSBuZXcgUGlwZWxpbmUodGhpcywgXCJQaXBlbGluZVwiLCB7XG4gICAgICBwaXBlbGluZU5hbWU6ICdQaXBlbGluZScsXG4gICAgICBjcm9zc0FjY291bnRLZXlzOiBmYWxzZSxcbiAgICB9KVxuXG4gICAgY29uc3Qgc291cmNlT3V0cHV0PSBuZXcgQXJ0aWZhY3QoJ3NvdXJjZU91dHB1dCcpO1xuXG4gICAgcGlwZWxpbmUuYWRkU3RhZ2Uoe1xuICAgICAgc3RhZ2VOYW1lOiAnU291cmNlJyxcbiAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgbmV3IEdpdEh1YlNvdXJjZUFjdGlvbih7XG4gICAgICAgICAgYWN0aW9uTmFtZTogJ0dpdEh1Yl9Tb3VyY2UnLFxuICAgICAgICAgIG93bmVyOiAncHJhc2hhbnRoJyxcbiAgICAgICAgICByZXBvOiAnYXdzLXBpcGVsaW5lJyxcbiAgICAgICAgICBvYXV0aFRva2VuOiBTZWNyZXRWYWx1ZS5zZWNyZXRzTWFuYWdlcignZ2l0aHViLWNvZGUtcGlwZWxpbmUtdG9rZW4nKSxcbiAgICAgICAgICBvdXRwdXQ6IHNvdXJjZU91dHB1dCxcbiAgICAgICAgfSlcbiAgICAgIF1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNka0J1aWxkUHJvamVjdD0gbmV3IEFydGlmYWN0KCdjZGtCdWlsZFByb2plY3QnKTtcblxuICAgIHBpcGVsaW5lLmFkZFN0YWdlKHtcbiAgICAgIHN0YWdlTmFtZTogJ0J1aWxkJyxcbiAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgbmV3IENvZGVCdWlsZEFjdGlvbih7XG4gICAgICAgICAgYWN0aW9uTmFtZTogJ0J1aWxkJyxcbiAgICAgICAgICBpbnB1dDogc291cmNlT3V0cHV0LFxuICAgICAgICAgIG91dHB1dHM6IFsgY2RrQnVpbGRQcm9qZWN0IF0sXG4gICAgICAgICAgcHJvamVjdDogbmV3IFBpcGVsaW5lUHJvamVjdCh0aGlzLCBcImNka0J1aWxkUHJvamVjdFwiLCB7XG4gICAgICAgICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICAgICAgICBidWlsZEltYWdlOiBMaW51eEJ1aWxkSW1hZ2UuU1RBTkRBUkRfNV8wXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYnVpbGRTcGVjOiBCdWlsZFNwZWMuZnJvbVNvdXJjZUZpbGVuYW1lKCdidWlsZC1zcGVjcy9jZGstYnVpbGQuc3BlYy55bWwnKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICBdXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==