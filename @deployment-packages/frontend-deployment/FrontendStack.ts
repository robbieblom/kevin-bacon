import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { FrontendDistribution } from "./distribution/FrontendDistribution";
import { FrontendBuildAction } from "./pipeline/FrontendBuildAction";
import { FrontendCacheInvalidationAction } from "./pipeline/FrontendCacheInvalidationAction";
import { FrontendPipeline } from "./pipeline/FrontendPipeline";
import { FrontendS3DeployAction } from "./pipeline/FrontendS3DeployAction";
import { FrontendSourceAction } from "./pipeline/FrontendSourceAction";
import {
  FrontendAppContext,
  FrontendBootstrappedEnvFile,
  FrontendManualSetup,
  FrontendSourceCode,
} from "./types";

export interface FrontendStackProps extends StackProps {
  appContext: FrontendAppContext;
  manualSetup: FrontendManualSetup;
  sourceCode: FrontendSourceCode;
  bootstrappedEnvFile: FrontendBootstrappedEnvFile;
}
export class FrontendStack extends Stack {
  pipelineName: CfnOutput;

  constructor(scope: Construct, id: string, props: FrontendStackProps) {
    super(scope, id, props);

    // distribution to create the hosting infrastructure
    const distribution = new FrontendDistribution(
      this,
      `${props.appContext.projectName}-distribution`,
      { appContext: props.appContext, manualSetup: props.manualSetup }
    );

    // pipeline infrastructure needed for deployment
    const sourceAction = new FrontendSourceAction(
      this,
      `${props.appContext.projectName}-source-action`,
      { appContext: props.appContext, manualSetup: props.manualSetup }
    );
    const buildAction = new FrontendBuildAction(
      this,
      `${props.appContext.projectName}-build-action`,
      {
        appContext: props.appContext,
        bootstrappedEnvFile: props.bootstrappedEnvFile,
        sourceCode: props.sourceCode,
        input: sourceAction.output,
      }
    );
    const s3DeployAction = new FrontendS3DeployAction(
      this,
      `${props.appContext.projectName}-s3-deploy-action`,
      { input: buildAction.output, bucket: distribution.hostingBucket }
    );
    const invalidateCacheAction = new FrontendCacheInvalidationAction(
      this,
      `${props.appContext.projectName}-invalidation-action`,
      {
        appContext: props.appContext,
        input: buildAction.output,
        cdn: distribution.cdn,
      }
    );
    const frontendPipeline = new FrontendPipeline(
      this,
      `${props.appContext.projectName}-pipeline`,
      {
        appContext: props.appContext,
        stages: [
          {
            stageName: "Source",
            actions: [sourceAction.action],
          },
          {
            stageName: "Build",
            actions: [buildAction.action],
          },
          {
            stageName: "Deploy",
            actions: [s3DeployAction.action, invalidateCacheAction.action],
          },
        ],
      }
    );

    this.pipelineName = new CfnOutput(
      this,
      `${props.appContext.projectName}-frontend-pipeline-name`,
      {
        value: frontendPipeline.pipeline.pipelineName,
      }
    );
  }
}

export default FrontendStack;
