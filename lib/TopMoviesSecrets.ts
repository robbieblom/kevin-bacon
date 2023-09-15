import { Stack, StackProps } from "aws-cdk-lib";
import { StringParameter } from "aws-cdk-lib/aws-ssm";
import { Construct } from "constructs";
import { isEmpty } from "lodash";
import {
  ParameterStoreSecretsToSet,
  SecretsManagerSecretsToSet,
} from "./types";

export interface TopMoviesSecretsProps extends StackProps {
  parameterStore?: ParameterStoreSecretsToSet;
  secretsManager?: SecretsManagerSecretsToSet;
}

export class TopMoviesSecrets extends Stack {
  constructor(scope: Construct, id: string, props: TopMoviesSecretsProps) {
    super(scope, id, props);

    // parameter store
    if (props.parameterStore && !isEmpty(props.parameterStore)) {
      const paramEntries = Object.entries(props.parameterStore);
      paramEntries.forEach(([key, paramVal]) => {
        new StringParameter(this, paramVal.name, {
          parameterName: paramVal.name,
          stringValue: paramVal.setValue,
        });
      });
    }

    // secrets manager
    if (props.secretsManager) {
      // TODO
    }
  }
}
