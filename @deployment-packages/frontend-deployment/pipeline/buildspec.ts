import {
  FrontendAppContext,
  FrontendBootstrappedEnvFile,
  FrontendSourceCode,
} from "../types";

const generateBootstrappedEnvCommands = (
  bootstrappedEnvFile: FrontendBootstrappedEnvFile,
  sourceCode: FrontendSourceCode
) => {
  const commands: string[] = [];

  // parameter store commands
  const envFileParameterKeys = Object.keys(
    bootstrappedEnvFile["parameter-store"]
  );
  envFileParameterKeys.forEach((key) => {
    commands.push(
      `echo ${key}=$${key} >> ${sourceCode.frontendHome}/.env.production`
    );
  });

  // variables commands - take care of when I extract this as a package
  // const envFileVariableKeys = Object.keys(bootstrappedEnvFile.variables);
  // envFileVariableKeys.forEach((key) => {
  //   commands.push(
  //     `echo ${key}=$${key} >> ${sourceCode.frontendHome}/.env.production`
  //   );
  // });

  //secrets manager commands TODO later

  return commands;
};

export const buildSpec = (
  appContext: FrontendAppContext,
  bootstrappedEnvFile: FrontendBootstrappedEnvFile,
  sourceCode: FrontendSourceCode
) => {
  return {
    version: "0.2",
    env: bootstrappedEnvFile,
    phases: {
      install: {
        "runtime-versions": {
          nodejs: "latest",
        },
        commands: [
          "npm install -g gatsby-cli",
          `npm install --prefix ${sourceCode.frontendHome}`,
        ],
      },
      pre_build: {
        commands: generateBootstrappedEnvCommands(
          bootstrappedEnvFile,
          sourceCode
        ),
      },
      build: {
        commands: [`npm run build -w ${sourceCode.frontendHome}`],
      },
      post_build: {
        commands: ["echo Build completed on `date`"],
      },
    },
    artifacts: {
      files: ["**/*"],
      "base-directory": `${sourceCode.frontendHome}/public`,
    },
  };
};

export default buildSpec;
