import { CreateTokenCard } from "src/domain/CreateTokenCard";
import { ITokenCard } from "../Model/tokenCard.model";
import {
  createTokenCard,
  findCreditCardByToken,
} from "../services/tokenCard.services";

export const createTokenCardController = async (tokenCard: ITokenCard) => {
  try {
    const NewtokenCard = await createTokenCard(tokenCard);
    return NewtokenCard;
    // return NewtokenCard.token;
  } catch (error) {
    return error;
  }
};
export const findCreditCardByTokenController = async (token: string) => {
  const findToken: CreateTokenCard = await findCreditCardByToken(token);

  return findToken;
};
