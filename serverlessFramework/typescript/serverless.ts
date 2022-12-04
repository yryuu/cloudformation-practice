import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import { ChimeAppAdminLambda } from './src/resources/lambda/chimeAppInstance';

const serverlessConfiguration: AWS = {
  service: 'typescript',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: "dev",
    region: "us-east-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: { ChimeAppAdminLambda, hello },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  resources: {
    Resources:
    {
      AWSSDKChimeLayer: {
        Type: "AWS::Lambda::LayerVersion",
        Properties: {
          CompatibleRuntimes: ["nodejs14.x"],
          Content: {
            S3Bucket: "aws-blog-business-productivity-chime-sdk",
            S3Key: "chat-sdk-demo/aws-sdk-chime-layer.zip"
          },
        },
      },
      UserPool: {
        Type: "AWS::Cognito::UserPool",
        Properties: {
          UserPoolName: "kainn-chat-user-pool",
          AutoVerifiedAttributes: ['email'],
          LambdaConfig: {
            PostAuthentication: {
              'Fn::GetAtt': ['HelloLambdaFunction', 'Arn'], // <== Aqui adicionar o nome da fila "morta" ou seja quando a fila falhar será tratada pela fila morta
            }
          }
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
