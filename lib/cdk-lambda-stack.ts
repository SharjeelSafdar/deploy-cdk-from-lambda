import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as iam from "aws-cdk-lib/aws-iam";
import * as path from "path";

export class CdkLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lambdaFunction = new lambda.DockerImageFunction(
      this,
      "cdk-lambda-function",
      {
        functionName: "cdkLambdaFunction",
        code: lambda.DockerImageCode.fromImageAsset(
          path.join(__dirname, "../deployerLambda")
        ),
      }
    );
    // new lambda.Function(this, "cdk-lambda-function", {
    //   functionName: "cdkLambdaFunction",
    //   runtime: lambda.Runtime.NODEJS_14_X,
    //   code: lambda.Code.fromAsset(path.join(__dirname, "../deployerLambda")),
    //   handler: "index.handler",
    // });

    lambdaFunction.addToRolePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ["cloudformation:*"],
        resources: ["*"],
      })
    );
  }
}
