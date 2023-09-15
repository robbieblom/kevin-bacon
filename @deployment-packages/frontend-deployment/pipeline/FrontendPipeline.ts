import * as cdk from "aws-cdk-lib";
import { Pipeline, StageOptions } from "aws-cdk-lib/aws-codepipeline";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { FrontendAppContext } from "../types";

export interface FrontendPipelineProps {
  appContext: FrontendAppContext;
  stages: StageOptions[];
}

export class FrontendPipeline extends Construct {
  pipeline: Pipeline;

  constructor(scope: Construct, id: string, props: FrontendPipelineProps) {
    super(scope, id);

    const pipeline = new Pipeline(
      this,
      `${props.appContext.projectName}-frontend-pipeline`,
      {
        artifactBucket: new Bucket(
          this,
          `${props.appContext.projectName}-fe-pipeline-bucket`,
          {
            bucketName: props.appContext.siteDNS + "-fe-pipeline-bucket",
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
          }
        ),
        crossAccountKeys: false,
      }
    );

    for (let stage of props.stages) {
      pipeline.addStage(stage);
    }

    this.pipeline = pipeline;
  }
}
