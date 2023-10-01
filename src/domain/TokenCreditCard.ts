export class TokenCreditCard {
  card_Number: string;

  expiration_month: string;

  expiration_year: string;

  email: string;

  token: string;
  exp: string;
  constructor(data?: Partial<TokenCreditCard>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
