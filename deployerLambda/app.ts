import { Handler } from "aws-lambda";
import { execSync } from "child_process";

export const handler: Handler = async () => {
  const cmd = `
    cdk synth
    cdk deploy
  `;
  execSync(cmd);
};
