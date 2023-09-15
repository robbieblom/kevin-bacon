import { SecretValue } from "aws-cdk-lib";

export interface FrontendAppContext {
  projectName: string;
  siteDNS: string;
  accountId: string;
  repositoryName: string;
  repositoryOwner: string;
  repositoryBranch: string;
}

export interface FrontendSourceCode {
  frontendHome: string;
}

export interface FrontendBootstrappedEnvFile {
  "parameter-store": {
    API_KEY: string;
    GTM_ID: string;
  };
  "secrets-manager"?: {};
  variables?: {};
}

export interface FrontendManualSetup {
  certificateArn: string;
  hostedZoneId: string;
  githubSecret: SecretValue;
}
