import {
  FrontendManualSetup,
  FrontendSourceCode,
} from "../@deployment-packages/frontend-deployment/types";

export interface AppContext {
  projectName: string;
  repositoryName: string;
  repositoryOwner: string;
  repositoryBranch: string;
  siteDNS: string;
  homeDirectory: string;
  accountId: string;
  region: string;
}

export interface ParameterStoreSecretToSet {
  name: string;
  setValue: string;
  retrievedValue?: string;
}
export interface ParameterStoreSecretsToSet {
  [key: string]: ParameterStoreSecretToSet;
  API_KEY: ParameterStoreSecretToSet;
  GTM_ID: ParameterStoreSecretToSet;
  certificateArn: ParameterStoreSecretToSet;
  accountId: ParameterStoreSecretToSet;
  hostedZoneId: ParameterStoreSecretToSet;
  region: ParameterStoreSecretToSet;
}
export interface SecretsManagerSecretToSet {
  name: string;
  setValue?: string;
  retrievedValue: string;
}

export interface SecretsManagerSecretsToSet {}
export interface SecretsToSet {
  parameterStore: ParameterStoreSecretsToSet;
  secretsManager?: SecretsManagerSecretsToSet;
}

export interface BootstrappedEnvFile {
  "parameter-store": {
    API_KEY: string;
    GTM_ID: string;
    certificateArn: string;
    accountId: string;
    hostedZoneId: string;
    region: string;
  };
  "secrets-manager"?: {};
  variables?: {};
}
export interface TopMoviesSourceCode {
  homeDirectory: string;
  frontend: FrontendSourceCode;
}

export interface TopMoviesManualSetup extends FrontendManualSetup {}
