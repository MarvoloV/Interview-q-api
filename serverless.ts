import type { AWS } from "@serverless/typescript";

import { CreateToken, findTokenCard } from "@functions/index";

const serverlessConfiguration: AWS = {
  service: "culqi-serveless",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-offline"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      DB_URL:
        "mongodb+srv://marvolov:ZHBpEU9GpZtBNdrL@clusterprueba.u0lxo.mongodb.net/study?retryWrites=true&w=majority",
    },
  },
  // import the function via paths
  functions: { CreateToken, findTokenCard },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
