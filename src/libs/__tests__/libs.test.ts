import {
  customErrorValidation,
  generateExpiredToken,
  generateToken,
  isValidToken,
  validarNumero,
} from "../utils";

it("should generate a 16-character string", () => {
  const token = generateToken();
  expect(token.length).toBe(16);
});
it("should return a number representing the expiration date 15 minutes from now", () => {
  const expirationDate = generateExpiredToken();
  expect(typeof expirationDate).toBe("number");
  expect(expirationDate).toBeGreaterThan(Date.now());
  expect(expirationDate - Date.now()).toBeCloseTo(15 * 60 * 1000, -2);
});
it("should return true when token expiration date is in the future", () => {
  const exp = new Date().getTime() + 1000;
  expect(isValidToken(exp)).toBe(true);
});
it("should return true for a valid number with 13 digits", () => {
  expect(validarNumero(1234567890123)).toBe(true);
});
it("should return false for a non-numeric input", () => {
  expect(validarNumero("abc")).toBe(false);
});
it('should return an object with "errors" property when passed an error object with "errors" property', () => {
  const error = {
    errors: {
      email: {
        message: "correo invalido",
      },
      card_number: {
        message: "numero de tarjeta invalido",
      },
    },
  };

  const result = customErrorValidation(error);

  expect(result).toEqual({
    errors: {
      email: {
        message: "correo invalido",
      },
      card_number: {
        message: "numero de tarjeta invalido",
      },
    },
  });
});
