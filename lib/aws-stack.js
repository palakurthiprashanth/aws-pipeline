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
                    actionName: 'Github_Source',
                    owner: 'palakurthiprashanth',
                    repo: 'aws-pipeline',
                    oauthToken: core_1.SecretValue.secretsManager('github-token'),
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
                        buildSpec: aws_codebuild_1.BuildSpec.fromSourceFilename("buildspec.yml")
                    })
                })
            ]
        });
        pipeline.addStage({
            stageName: 'Pipeline_Update',
            actions: [
                new aws_codepipeline_actions_1.CloudFormationCreateUpdateStackAction({
                    actionName: 'Pipeline_Update',
                    stackName: 'PipelineStack',
                    templatePath: cdkBuildProject.atPath('PipelineStack.template.json'),
                    adminPermissions: true
                })
            ]
        });
    }
}
exports.PipelineStack = PipelineStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXdzLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUFxQztBQUNyQyxnRUFBK0Q7QUFDL0QsZ0ZBQTJLO0FBQzNLLHdDQUEyQztBQUMzQywwREFBcUY7QUFDckYsMkNBQTJDO0FBRTNDLE1BQWEsYUFBYyxTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQzFDLFlBQVksS0FBb0IsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDbEUsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDeEIsTUFBTSxRQUFRLEdBQUUsSUFBSSwyQkFBUSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUU7WUFDN0MsWUFBWSxFQUFFLFVBQVU7WUFDeEIsZ0JBQWdCLEVBQUUsS0FBSztTQUN4QixDQUFDLENBQUE7UUFFRixNQUFNLFlBQVksR0FBRSxJQUFJLDJCQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFakQsUUFBUSxDQUFDLFFBQVEsQ0FBQztZQUNoQixTQUFTLEVBQUUsUUFBUTtZQUNuQixPQUFPLEVBQUU7Z0JBQ1AsSUFBSSw2Q0FBa0IsQ0FBQztvQkFDckIsVUFBVSxFQUFFLGVBQWU7b0JBQzNCLEtBQUssRUFBRSxxQkFBcUI7b0JBQzVCLElBQUksRUFBRSxjQUFjO29CQUNwQixVQUFVLEVBQUUsa0JBQVcsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDO29CQUN0RCxNQUFNLEVBQUUsWUFBWTtpQkFDckIsQ0FBQzthQUNIO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsTUFBTSxlQUFlLEdBQUUsSUFBSSwyQkFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFdkQsUUFBUSxDQUFDLFFBQVEsQ0FBQztZQUNoQixTQUFTLEVBQUUsT0FBTztZQUNsQixPQUFPLEVBQUU7Z0JBQ1AsSUFBSSwwQ0FBZSxDQUFDO29CQUNsQixVQUFVLEVBQUUsT0FBTztvQkFDbkIsS0FBSyxFQUFFLFlBQVk7b0JBQ25CLE9BQU8sRUFBRSxDQUFFLGVBQWUsQ0FBRTtvQkFDNUIsT0FBTyxFQUFFLElBQUksK0JBQWUsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUU7d0JBQ3BELFdBQVcsRUFBRTs0QkFDWCxVQUFVLEVBQUUsK0JBQWUsQ0FBQyxZQUFZO3lCQUN6Qzt3QkFDRCxTQUFTLEVBQUUseUJBQVMsQ0FBQyxrQkFBa0IsQ0FDckMsZUFBZSxDQUNoQjtxQkFDRixDQUFDO2lCQUNILENBQUM7YUFDSDtTQUNGLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxRQUFRLENBQUM7WUFDaEIsU0FBUyxFQUFFLGlCQUFpQjtZQUM1QixPQUFPLEVBQUU7Z0JBQ1AsSUFBSSxnRUFBcUMsQ0FBQztvQkFDeEMsVUFBVSxFQUFFLGlCQUFpQjtvQkFDN0IsU0FBUyxFQUFFLGVBQWU7b0JBQzFCLFlBQVksRUFBRSxlQUFlLENBQUMsTUFBTSxDQUFDLDZCQUE2QixDQUFDO29CQUNuRSxnQkFBZ0IsRUFBRSxJQUFJO2lCQUN2QixDQUFDO2FBQ0g7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUF4REQsc0NBd0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuaW1wb3J0IHsgUGlwZWxpbmUsIEFydGlmYWN0IH0gZnJvbSBcIkBhd3MtY2RrL2F3cy1jb2RlcGlwZWxpbmVcIjtcbmltcG9ydCB7IENsb3VkRm9ybWF0aW9uQ3JlYXRlUmVwbGFjZUNoYW5nZVNldEFjdGlvbiwgQ2xvdWRGb3JtYXRpb25DcmVhdGVVcGRhdGVTdGFja0FjdGlvbiwgQ29kZUJ1aWxkQWN0aW9uLCBHaXRIdWJTb3VyY2VBY3Rpb24gfSBmcm9tIFwiQGF3cy1jZGsvYXdzLWNvZGVwaXBlbGluZS1hY3Rpb25zXCI7XG5pbXBvcnQgeyBTZWNyZXRWYWx1ZSB9IGZyb20gXCJAYXdzLWNkay9jb3JlXCJcbmltcG9ydCB7IEJ1aWxkU3BlYywgTGludXhCdWlsZEltYWdlLCBQaXBlbGluZVByb2plY3QgfSBmcm9tICdAYXdzLWNkay9hd3MtY29kZWJ1aWxkJztcbi8vIGltcG9ydCAqIGFzIHNxcyBmcm9tICdAYXdzLWNkay9hd3Mtc3FzJztcblxuZXhwb3J0IGNsYXNzIFBpcGVsaW5lU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogY2RrLkNvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuICAgIGNvbnN0IHBpcGVsaW5lPSBuZXcgUGlwZWxpbmUodGhpcywgXCJQaXBlbGluZVwiLCB7XG4gICAgICBwaXBlbGluZU5hbWU6ICdQaXBlbGluZScsXG4gICAgICBjcm9zc0FjY291bnRLZXlzOiBmYWxzZSxcbiAgICB9KVxuXG4gICAgY29uc3Qgc291cmNlT3V0cHV0PSBuZXcgQXJ0aWZhY3QoJ3NvdXJjZU91dHB1dCcpO1xuXG4gICAgcGlwZWxpbmUuYWRkU3RhZ2Uoe1xuICAgICAgc3RhZ2VOYW1lOiAnU291cmNlJyxcbiAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgbmV3IEdpdEh1YlNvdXJjZUFjdGlvbih7XG4gICAgICAgICAgYWN0aW9uTmFtZTogJ0dpdGh1Yl9Tb3VyY2UnLFxuICAgICAgICAgIG93bmVyOiAncGFsYWt1cnRoaXByYXNoYW50aCcsXG4gICAgICAgICAgcmVwbzogJ2F3cy1waXBlbGluZScsXG4gICAgICAgICAgb2F1dGhUb2tlbjogU2VjcmV0VmFsdWUuc2VjcmV0c01hbmFnZXIoJ2dpdGh1Yi10b2tlbicpLFxuICAgICAgICAgIG91dHB1dDogc291cmNlT3V0cHV0LFxuICAgICAgICB9KVxuICAgICAgXVxuICAgIH0pO1xuXG4gICAgY29uc3QgY2RrQnVpbGRQcm9qZWN0PSBuZXcgQXJ0aWZhY3QoJ2Nka0J1aWxkUHJvamVjdCcpO1xuXG4gICAgcGlwZWxpbmUuYWRkU3RhZ2Uoe1xuICAgICAgc3RhZ2VOYW1lOiAnQnVpbGQnLFxuICAgICAgYWN0aW9uczogW1xuICAgICAgICBuZXcgQ29kZUJ1aWxkQWN0aW9uKHtcbiAgICAgICAgICBhY3Rpb25OYW1lOiAnQnVpbGQnLFxuICAgICAgICAgIGlucHV0OiBzb3VyY2VPdXRwdXQsXG4gICAgICAgICAgb3V0cHV0czogWyBjZGtCdWlsZFByb2plY3QgXSxcbiAgICAgICAgICBwcm9qZWN0OiBuZXcgUGlwZWxpbmVQcm9qZWN0KHRoaXMsIFwiY2RrQnVpbGRQcm9qZWN0XCIsIHtcbiAgICAgICAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgICAgICAgIGJ1aWxkSW1hZ2U6IExpbnV4QnVpbGRJbWFnZS5TVEFOREFSRF81XzBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBidWlsZFNwZWM6IEJ1aWxkU3BlYy5mcm9tU291cmNlRmlsZW5hbWUoXG4gICAgICAgICAgICAgIFwiYnVpbGRzcGVjLnltbFwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIF1cbiAgICB9KTtcblxuICAgIHBpcGVsaW5lLmFkZFN0YWdlKHtcbiAgICAgIHN0YWdlTmFtZTogJ1BpcGVsaW5lX1VwZGF0ZScsXG4gICAgICBhY3Rpb25zOiBbXG4gICAgICAgIG5ldyBDbG91ZEZvcm1hdGlvbkNyZWF0ZVVwZGF0ZVN0YWNrQWN0aW9uKHtcbiAgICAgICAgICBhY3Rpb25OYW1lOiAnUGlwZWxpbmVfVXBkYXRlJyxcbiAgICAgICAgICBzdGFja05hbWU6ICdQaXBlbGluZVN0YWNrJyxcbiAgICAgICAgICB0ZW1wbGF0ZVBhdGg6IGNka0J1aWxkUHJvamVjdC5hdFBhdGgoJ1BpcGVsaW5lU3RhY2sudGVtcGxhdGUuanNvbicpLFxuICAgICAgICAgIGFkbWluUGVybWlzc2lvbnM6IHRydWVcbiAgICAgICAgfSlcbiAgICAgIF1cbiAgICB9KTtcbiAgfVxufVxuIl19