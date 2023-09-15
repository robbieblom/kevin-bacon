import * as cdk from "aws-cdk-lib";
import { CodePipelineSource, ShellStep } from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import "dotenv/config";
import { FrontendStage } from "../@deployment-packages/frontend-deployment";
import { AppPipeline } from "./AppPipeline/AppPipeline";
import {
  AppContext,
  BootstrappedEnvFile,
  TopMoviesManualSetup,
  TopMoviesSourceCode,
} from "./types";

export interface TopMoviesAppProps extends cdk.StackProps {
  appContext: AppContext;
  bootstrappedEnvFile: BootstrappedEnvFile;
  manualSetup: TopMoviesManualSetup;
  sourceCode: TopMoviesSourceCode;
}

export class TopMoviesApp extends cdk.Stack {
  constructor(scope: Construct, id: string, props: TopMoviesAppProps) {
    super(scope, id, props);

    const source = CodePipelineSource.gitHub(
      `${props.appContext.repositoryOwner}/${props.appContext.repositoryName}`,
      `${props.appContext.repositoryBranch}`,
      {
        authentication: props.manualSetup.githubSecret,
      }
    );

    const appPipeline = new AppPipeline(
      this,
      `${props.appContext.projectName}-app-pipeline`,
      {
        appContext: props.appContext,
        bootstrappedEnvFile: props.bootstrappedEnvFile,
        source,
      }
    );

    const frontendStage = new FrontendStage(
      this,
      `${props.appContext.projectName}-frontend-stage`,
      {
        appContext: {
          projectName: props.appContext.projectName,
          siteDNS: props.appContext.siteDNS,
          accountId: props.appContext.accountId,
          repositoryName: props.appContext.repositoryName,
          repositoryOwner: props.appContext.repositoryOwner,
          repositoryBranch: props.appContext.repositoryBranch,
        },
        manualSetup: props.manualSetup,
        sourceCode: props.sourceCode.frontend,
        bootstrappedEnvFile: {
          "parameter-store": {
            API_KEY:
              props.bootstrappedEnvFile["parameter-store"]
                .API_KEY,
            GTM_ID: props.bootstrappedEnvFile["parameter-store"].GTM_ID,
          },
        },
      }
    );

    const frontendStageDeployment =
      appPipeline.pipeline.addStage(frontendStage);

    frontendStageDeployment.addPost(
      new ShellStep(`${props.appContext.projectName}-frontend-post-deploy`, {
        input: source,
        envFromCfnOutputs: { pipelineName: frontendStage.stack.pipelineName },
        commands: [
          `mkdir empty-directory && cd empty-directory`,
          `sudo apt-get install jq`,
          `GITHUB_TOKEN=$(aws secretsmanager get-secret-value --secret-id ${props.appContext.projectName}/github-secret --output json | jq -r '.SecretString | fromjson["CDK-CodePipeline-Token"]')`,
          `REPO_URL=https://${props.appContext.repositoryOwner}:$GITHUB_TOKEN@github.com/${props.appContext.repositoryOwner}/${props.appContext.repositoryName}.git`,
          `git init .`,
          `git remote add origin $REPO_URL`,
          `git checkout -b base`,
          `git fetch $REPO_URL --depth 2 ${props.appContext.repositoryBranch}`,
          `git reset --hard FETCH_HEAD`,
          `if git diff --quiet HEAD~1 HEAD -- ${props.sourceCode.frontend.frontendHome}; then 
            echo "No changes detected in Gatsby code. Skipping build and deploy."
          else
            echo "Changes detected in Gatsby code. Proceeding with build and deploy."
            aws codepipeline start-pipeline-execution --name $pipelineName
          fi`,
        ],
      })
    );
  }
}
