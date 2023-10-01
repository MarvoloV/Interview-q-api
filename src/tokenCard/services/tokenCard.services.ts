import { generateExpiredToken, generateToken } from "@libs/utils";
import { TokenCard, ITokenCard } from "../Model/tokenCard.model";

export const createTokenCard = async (tokenCard: ITokenCard) => {
  try {
    const token = generateToken();
    const exp = generateExpiredToken();
    tokenCard.token = token;
    tokenCard.exp = exp;
    const newTokenCard = await TokenCard.create(tokenCard);

    return newTokenCard;
  } catch (error) {
    return error;
  }
};

export const findCreditCardByToken = async (token: string) => {
  try {
    return await TokenCard.findOne({ token });
  } catch (error) {
    return error;
  }
};
