import { formatJSONResponse } from "@libs/api-gateway";
import { APIGatewayProxyEvent, Context } from "aws-lambda";

const findTokenCard = async (event: APIGatewayProxyEvent, context: Context) => {
  const { id } = event.pathParameters;

  const { awsRequestId } = context;
  return formatJSONResponse({
    message: `Hello  ${id}, welcome to the exciting Serverless world`,
    id,
    awsRequestId,
  });
};

export const main = findTokenCard;
