import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { FrontendStack } from "./FrontendStack";
import {
  FrontendAppContext,
  FrontendBootstrappedEnvFile,
  FrontendManualSetup,
  FrontendSourceCode,
} from "./types";

export interface FrontendStageProps extends cdk.StageProps {
  appContext: FrontendAppContext;
  manualSetup: FrontendManualSetup;
  sourceCode: FrontendSourceCode;
  bootstrappedEnvFile: FrontendBootstrappedEnvFile;
}
export class FrontendStage extends cdk.Stage {
  stack: FrontendStack;
  constructor(scope: Construct, id: string, props: FrontendStageProps) {
    super(scope, id, props);

    const frontendStack = new FrontendStack(
      this,
      `${props.appContext.projectName}-frontend-stack`,
      {
        appContext: props.appContext,
        manualSetup: props.manualSetup,
        sourceCode: props.sourceCode,
        bootstrappedEnvFile: props.bootstrappedEnvFile,
      }
    );

    this.stack = frontendStack;
  }
}

export default FrontendStage;
