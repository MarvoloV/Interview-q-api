import {
  formatJSONResponse,
  formatJSONResponseBadRequest,
} from "@libs/api-gateway";
import { connectDatabase } from "@libs/database";
import { isValidToken } from "@libs/utils";
import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { findCreditCardByTokenController } from "src/tokenCard/controller/tokenCard.controller";

export const main = async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const headers = event.headers;
  if (!headers.Authorization) {
    return formatJSONResponseBadRequest({
      message: "Authorization token not provided",
    });
  }
  const token = headers.Authorization;
  await connectDatabase();

  const tokenCard = await findCreditCardByTokenController(token);
  if (!tokenCard) {
    return formatJSONResponseBadRequest({
      message: "tokenId not found",
    });
  }
  if (!isValidToken(tokenCard.exp)) {
    return formatJSONResponseBadRequest({
      message: "tokenId expired",
    });
  }
  return formatJSONResponse({
    tokenCard,
  });
};
