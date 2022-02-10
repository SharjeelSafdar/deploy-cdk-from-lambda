import { Stack, StackProps } from "aws-cdk-lib";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as iam from "aws-cdk-lib/aws-iam";
import * as ecr from "aws-cdk-lib/aws-ecr";

export class CdkLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const deployerLambdaRepo = ecr.Repository.fromRepositoryName(
      this,
      "deployer-lambda-repo",
      "cdk-deployer-lambda"
    );

    const lambdaFunction = new lambda.DockerImageFunction(
      this,
      "cdkLambdaFunction",
      {
        functionName: "deployerLambdaImage",
        code: lambda.DockerImageCode.fromEcr(deployerLambdaRepo, {
          tag: "latest",
          cmd: ["app.handler"],
        }),
        timeout: cdk.Duration.seconds(900),
        memorySize: 1024,
      }
    );

    lambdaFunction.addToRolePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ["sts:AssumeRole"],
        resources: ["arn:aws:iam::*:role/cdk-*"],
      })
    );
  }
}
