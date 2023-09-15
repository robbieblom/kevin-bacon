import * as cdk from "aws-cdk-lib";
import {
  BuildSpec,
  LinuxBuildImage,
  PipelineProject,
} from "aws-cdk-lib/aws-codebuild";
import { Artifact } from "aws-cdk-lib/aws-codepipeline";
import { CodeBuildAction } from "aws-cdk-lib/aws-codepipeline-actions";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { LogGroup, RetentionDays } from "aws-cdk-lib/aws-logs";
import { Construct } from "constructs";
import {
  FrontendAppContext,
  FrontendBootstrappedEnvFile,
  FrontendSourceCode,
} from "../types";
import buildSpec from "./buildspec";

export interface FrontendBuildActionProps {
  appContext: FrontendAppContext;
  bootstrappedEnvFile: FrontendBootstrappedEnvFile;
  sourceCode: FrontendSourceCode;
  input: Artifact;
}

export class FrontendBuildAction extends Construct {
  action: CodeBuildAction;
  output: Artifact;

  constructor(scope: Construct, id: string, props: FrontendBuildActionProps) {
    super(scope, id);

    const buildProject = new PipelineProject(
      this,
      `${props.appContext.projectName}-build-project`,
      {
        buildSpec: BuildSpec.fromObject(
          buildSpec(
            props.appContext,
            props.bootstrappedEnvFile,
            props.sourceCode
          )
        ),
        environment: {
          buildImage: LinuxBuildImage.STANDARD_7_0,
        },
        logging: {
          cloudWatch: {
            logGroup: new LogGroup(
              this,
              `${props.appContext.projectName}-build-project-logs`,
              {
                logGroupName: `${props.appContext.projectName}-build-project-logs`,
                removalPolicy: cdk.RemovalPolicy.DESTROY,
                retention: RetentionDays.THREE_DAYS,
              }
            ),
          },
        },
      }
    );
    buildProject.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ["ssm:GetParametersByPath", "ssm:GetParameters"],
        resources: [
          `arn:aws:ssm:*:${props.appContext.accountId}:parameter/${props.appContext.projectName}/*`,
        ],
      })
    );

    const buildOutput = new Artifact();
    const buildAction = new CodeBuildAction({
      actionName: "Build",
      project: buildProject,
      input: props.input,
      outputs: [buildOutput],
    });

    this.action = buildAction;
    this.output = buildOutput;
  }
}
