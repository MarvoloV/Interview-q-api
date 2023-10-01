import { formatJSONResponse } from "@libs/api-gateway";
import { connectDatabase } from "@libs/database";
import { customErrorValidation } from "@libs/utils";
import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { pk_validate } from "src/data/pkToken";
import { createTokenCardController } from "src/tokenCard/controller/tokenCard.controller";

export const main = async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const { Authorization } = event.headers;
    const isValidate = pk_validate.includes(Authorization.slice(8));
    if (!isValidate) {
      throw { message: "token invalido" };
    }

    await connectDatabase();

    const tokenCard = await createTokenCardController(JSON.parse(event.body));
    if (tokenCard.errors) {
      throw customErrorValidation(tokenCard);
    }
    return formatJSONResponse({ token: tokenCard.token });
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
};
