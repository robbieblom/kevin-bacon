#!/usr/bin/env node

// this stack requires:
// - GitHub token in Secrets Manager.  This is configured whenever the project name changes: ${projectName}/github-secret
// - Certificate set up in ACM and passed as a prop
// - aws codebuild import-source-credentials --server-type GITHUB --auth-type PERSONAL_ACCESS_TOKEN --token <token> for each region

import * as cdk from "aws-cdk-lib";
import "dotenv/config";
import path from "path";
import "source-map-support/register";
import { TopMoviesApp } from "../lib/TopMoviesApp";
import { TopMoviesSecrets } from "../lib/TopMoviesSecrets";
import { AppContext } from "../lib/types";

const app = new cdk.App();

const API_KEY = process.env.API_KEY as string;
const GTM_ID = process.env.GTM_ID as string;
const certificateArn = process.env.certificateArn as string;
const accountId = process.env.accountId as string;
const hostedZoneId = process.env.hostedZoneId as string;
const region = process.env.region as string;

const appContext: AppContext = {
  projectName: "dev-top-movies",
  repositoryName: "kevin-bacon",
  repositoryOwner: "robbieblom",
  repositoryBranch: "develop",
  siteDNS: "dev-topmovies.bytetheoryinnovations.com",
  homeDirectory: path.join(__dirname, ".."),
  accountId,
  region,
};

// create secrets for app
const secretsStack = new TopMoviesSecrets(
  app,
  `${appContext.projectName}-params-stack`,
  {
    parameterStore: {
      API_KEY: {
        name: `/${appContext.projectName}/API_KEY`,
        setValue: API_KEY,
      },
      GTM_ID: {
        name: `/${appContext.projectName}/GTM_ID`,
        setValue: GTM_ID,
      },
      certificateArn: {
        name: `/${appContext.projectName}/certificateArn`,
        setValue: certificateArn,
      },
      accountId: {
        name: `/${appContext.projectName}/accountId`,
        setValue: accountId,
      },
      hostedZoneId: {
        name: `/${appContext.projectName}/hostedZoneId`,
        setValue: hostedZoneId,
      },
      region: {
        name: `/${appContext.projectName}/region`,
        setValue: region,
      },
    },
  }
);

// build app and use created secrets in bootstrap processes
// like AppPipeline and buildspec.yaml
const website = new TopMoviesApp(
  app,
  `${appContext.projectName}-app-stack`,
  {
    appContext,
    manualSetup: {
      certificateArn,
      hostedZoneId,
      githubSecret: cdk.SecretValue.secretsManager(
        `${appContext.projectName}/github-secret`,
        {
          jsonField: "CDK-CodePipeline-Token",
        }
      ),
    },
    sourceCode: {
      homeDirectory: appContext.homeDirectory,
      frontend: {
        frontendHome: "./src/frontend",
      },
    },
    env: {
      account: appContext.accountId,
      region: appContext.region,
    },
    bootstrappedEnvFile: {
      "parameter-store": {
        API_KEY: `/${appContext.projectName}/API_KEY`,
        GTM_ID: `/${appContext.projectName}/GTM_ID`,
        certificateArn: `/${appContext.projectName}/certificateArn`,
        accountId: `/${appContext.projectName}/accountId`,
        hostedZoneId: `/${appContext.projectName}/hostedZoneId`,
        region: `/${appContext.projectName}/region`,
      },
    },
  }
);
