import { formatJSONResponse } from "@libs/api-gateway";
import { APIGatewayProxyEvent, Context } from "aws-lambda";

const CreateToken = async (event: APIGatewayProxyEvent, context: Context) => {
  const { name } = JSON.parse(event.body) as { name: string };
  const { awsRequestId } = context;
  return formatJSONResponse({
    message: `Hello  ${name}, welcome to the exciting Serverless world`,
    event,
    awsRequestId,
  });
};

export const main = CreateToken;
