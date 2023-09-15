import { RemovalPolicy } from "aws-cdk-lib";
import { Distribution } from "aws-cdk-lib/aws-cloudfront";
import { BuildSpec, PipelineProject } from "aws-cdk-lib/aws-codebuild";
import { Artifact } from "aws-cdk-lib/aws-codepipeline";
import { CodeBuildAction } from "aws-cdk-lib/aws-codepipeline-actions";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { LogGroup, RetentionDays } from "aws-cdk-lib/aws-logs";
import { Construct } from "constructs";
import { FrontendAppContext } from "../types";

export interface FrontendCacheInvalidationActionProps {
  appContext: FrontendAppContext;
  cdn: Distribution;
  input: Artifact;
}

export class FrontendCacheInvalidationAction extends Construct {
  action: CodeBuildAction;

  constructor(
    scope: Construct,
    id: string,
    props: FrontendCacheInvalidationActionProps
  ) {
    super(scope, id);

    const invalidateBuildProject = new PipelineProject(
      this,
      `${props.appContext.projectName}-cache-invalidation`,
      {
        buildSpec: BuildSpec.fromObject({
          version: "0.2",
          phases: {
            build: {
              commands: [
                'aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_ID} --paths "/*"',
              ],
            },
          },
        }),
        environmentVariables: {
          CLOUDFRONT_ID: { value: props.cdn.distributionId },
        },
        logging: {
          cloudWatch: {
            logGroup: new LogGroup(
              this,
              `${props.appContext.projectName}-invalidate-build-project-logs`,
              {
                logGroupName: `${props.appContext.projectName}-invalidate-build-project-logs`,
                removalPolicy: RemovalPolicy.DESTROY,
                retention: RetentionDays.THREE_DAYS,
              }
            ),
          },
        },
      }
    );

    // Add Cloudfront invalidation permissions to the project
    const distributionArn = `arn:aws:cloudfront::${props.appContext.accountId}:distribution/${props.cdn.distributionId}`;
    invalidateBuildProject.addToRolePolicy(
      new PolicyStatement({
        resources: [distributionArn],
        actions: ["cloudfront:CreateInvalidation"],
      })
    );
    const invalidateCacheAction = new CodeBuildAction({
      actionName: "InvalidateCache",
      project: invalidateBuildProject,
      input: props.input,
      runOrder: 2,
    });

    this.action = invalidateCacheAction;
  }
}
