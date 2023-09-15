import { Artifact } from "aws-cdk-lib/aws-codepipeline";
import {
  GitHubSourceAction,
  GitHubTrigger,
} from "aws-cdk-lib/aws-codepipeline-actions";
import { Construct } from "constructs";
import { FrontendAppContext, FrontendManualSetup } from "../types";

export interface FrontendSourceActionProps {
  appContext: FrontendAppContext;
  manualSetup: FrontendManualSetup;
}
export class FrontendSourceAction extends Construct {
  action: GitHubSourceAction;
  output: Artifact;

  constructor(scope: Construct, id: string, props: FrontendSourceActionProps) {
    super(scope, id);

    const sourceOutput = new Artifact();
    const sourceAction = new GitHubSourceAction({
      actionName: "GitHub_Source",
      owner: props.appContext.repositoryOwner,
      repo: props.appContext.repositoryName,
      oauthToken: props.manualSetup.githubSecret,
      output: sourceOutput,
      branch: props.appContext.repositoryBranch,
      trigger: GitHubTrigger.NONE,
    });
    this.action = sourceAction;
    this.output = sourceOutput;
  }
}
