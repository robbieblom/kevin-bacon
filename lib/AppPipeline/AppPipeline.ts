import * as cdk from "aws-cdk-lib";
import { BuildSpec, LinuxBuildImage } from "aws-cdk-lib/aws-codebuild";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Bucket } from "aws-cdk-lib/aws-s3";
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { AppContext, BootstrappedEnvFile } from "../types";

const generateBootstrappedEnvCommands = (
  bootstrappedEnvFile: BootstrappedEnvFile
) => {
  const commands: string[] = [];

  // parameter store commands
  const envFileEntries = Object.entries(bootstrappedEnvFile["parameter-store"]);
  envFileEntries.forEach(([key, ssmPath]) => {
    commands.push(
      `echo ${key}=$(aws ssm get-parameter --name ${ssmPath} --query 'Parameter.Value') >> ./.env`
    );
  });

  //secrets manager commands TODO later

  return commands;
};

export interface AppPipelineProps {
  appContext: AppContext;
  bootstrappedEnvFile: BootstrappedEnvFile;
  source: CodePipelineSource;
}

export class AppPipeline extends Construct {
  pipeline: CodePipeline;

  constructor(scope: Construct, id: string, props: AppPipelineProps) {
    super(scope, id);
    const appContext = props.appContext;

    const bootstrappedEnvCommands = generateBootstrappedEnvCommands(
      props.bootstrappedEnvFile
    );

    const pipeline = new CodePipeline(
      this,
      `${appContext.projectName}-pipeline`,
      {
        pipelineName: `${appContext.projectName}-pipeline`,
        synth: new ShellStep(`${appContext.projectName}-synth-step`, {
          input: props.source,
          commands: [
            "npm install",
            ...bootstrappedEnvCommands,
            `npx cdk synth ${appContext.projectName}-app-stack`,
          ],
        }),
        codeBuildDefaults: {
          buildEnvironment: {
            buildImage: LinuxBuildImage.STANDARD_7_0,
          },
          rolePolicy: [
            new PolicyStatement({
              effect: Effect.ALLOW,
              actions: [
                "ssm:GetParametersByPath",
                "ssm:GetParameters",
                "ssm:GetParameter",
              ],
              resources: [
                `arn:aws:ssm:*:${props.appContext.accountId}:parameter/${props.appContext.projectName}/*`,
              ],
            }),
            new PolicyStatement({
              effect: Effect.ALLOW,
              actions: ["sts:AssumeRole"],
              resources: ["arn:aws:iam::*:role/cdk-*"],
            }),
            new PolicyStatement({
              actions: ["codepipeline:StartPipelineExecution"],
              resources: [
                `arn:aws:codepipeline:*:*:${props.appContext.projectName}*`,
              ],
              effect: Effect.ALLOW,
            }),
            new PolicyStatement({
              actions: ["secretsmanager:GetSecretValue"],
              resources: [
                `arn:aws:secretsmanager:*:*:secret:${props.appContext.projectName}*`,
              ],
              effect: Effect.ALLOW,
            }),
          ],
          partialBuildSpec: BuildSpec.fromObject({
            version: "0.2",
            phases: {
              install: {
                "runtime-versions": {
                  nodejs: "latest",
                },
              },
            },
          }),
        },
        publishAssetsInParallel: false,
        artifactBucket: new Bucket(
          this,
          `${appContext.projectName}-pipeline-bucket`,
          {
            bucketName: appContext.siteDNS + "-pipeline-bucket",
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
          }
        ),
        crossAccountKeys: false,
      }
    );

    this.pipeline = pipeline;
  }
}
