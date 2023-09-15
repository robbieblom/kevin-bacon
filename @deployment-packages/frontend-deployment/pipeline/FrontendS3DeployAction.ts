import { Artifact } from "aws-cdk-lib/aws-codepipeline";
import { S3DeployAction } from "aws-cdk-lib/aws-codepipeline-actions";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export interface FrontendS3DeployActionProps {
  input: Artifact;
  bucket: Bucket;
}

export class FrontendS3DeployAction extends Construct {
  action: S3DeployAction;

  constructor(
    scope: Construct,
    id: string,
    props: FrontendS3DeployActionProps
  ) {
    super(scope, id);

    const deployAction = new S3DeployAction({
      actionName: "Deploy",
      bucket: props.bucket,
      input: props.input,
      runOrder: 1,
    });

    this.action = deployAction;
  }
}
