import mongoose from "mongoose";
import validator from "validator";

export interface ITokenCard {
  card_number: number;
  email: string;
  expiration_month: string;
  expiration_year: string;
  token: string;
  exp: number;
  cvv?: number;
}

const TokenCardSchema = new mongoose.Schema<ITokenCard>({
  card_number: {
    type: Number,
    trim: true,
    required: true,
    validate: [
      {
        validator: (value: Number) => {
          const creditCard = value.toString();
          return validator.isCreditCard(creditCard);
        },
        message: "Numero de tarjeta no Valido",
      },
      {
        validator: (value: number) => {
          const numeroComoCadena = value.toString();
          return (
            validator.isNumeric(numeroComoCadena) &&
            validator.isLength(numeroComoCadena, { min: 13, max: 16 })
          );
        },
        message: "El número de tarjeta debe tener entre 13 y 16 dígitos.",
      },
    ],
  },
  expiration_month: {
    type: String,
    required: true,
    validate: [
      {
        validator: (value: string) => {
          return validator.isNumeric(value);
        },
        message: "Solo se permite ingresar numeros ",
      },
      {
        validator: (value: string) => {
          const numero = parseInt(value, 10);
          return (
            validator.isLength(value, { min: 1, max: 2 }) &&
            numero < 13 &&
            numero > 0
          );
        },
        message: "Ingresar un mes valido del 1 al 12",
      },
    ],
  },
  expiration_year: {
    type: String,
    minlength: 4,
    maxlength: 4,
    validate: {
      validator: (value) => {
        const yearNumber = parseInt(value, 10);
        const dateCurrent = new Date();
        const dateExpiration = dateCurrent.getFullYear() + 5;
        return (
          yearNumber <= dateExpiration &&
          yearNumber >= dateCurrent.getUTCFullYear()
        );
      },
      message: "Año de expiración no Valido",
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        return !validator.isEmail(value, {
          // domain_specific_validation: true,
          host_blacklist: ["gmail.com", "hotmail.com", "yahoo.es"],
        });
      },
      message:
        "correo invalido solo esta permitido @gmail.com, @hotmail.com y @yahoo.es",
    },
  },

  token: {
    type: String,
    unique: true,
    index: true,
  },
  exp: {
    type: Number,
  },
  cvv: {
    type: Number,
    validate: [
      {
        validator: (value: number) => {
          const numeroComoCadena = value.toString();
          return (
            validator.isNumeric(numeroComoCadena) &&
            validator.isLength(numeroComoCadena, { min: 3, max: 4 })
          );
        },
        message: "El cvv debe ser como minimo de 3  y maximo 4 digitos",
      },
    ],
  },
});
TokenCardSchema.pre("save", async function (next) {
  this.cvv = undefined;
  next();
});
export const TokenCard = mongoose.model("TokenCard", TokenCardSchema);
