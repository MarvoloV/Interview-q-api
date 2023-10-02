import validator from "validator";

export const generateToken = (): string => {
  const caracteres =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let token = "";

  for (let i = 0; i < 16; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    token += caracteres.charAt(indiceAleatorio);
  }

  return token;
};
export const generateExpiredToken = (): number => {
  const fechaActual = new Date();

  // Calcular la fecha de expiración sumando 15 minutos
  const tiempoDeExpiracion = 15 * 60 * 1000; // 15 minutos en milisegundos
  const fechaDeExpiracion = fechaActual.getTime() + tiempoDeExpiracion;

  return fechaDeExpiracion;
};
export const isValidToken = (exp: number): boolean => {
  const currentDate = new Date();
  const isValid = currentDate.getTime() < exp ? true : false;
  return isValid;
};

export const validarNumero = (numero: number | string): boolean => {
  // Convierte el número a una cadena para contar los dígitos
  const numeroComoCadena = numero.toString();

  // Comprueba si la longitud de la cadena está entre 3 y 7 dígitos
  if (
    validator.isNumeric(numeroComoCadena) &&
    validator.isLength(numeroComoCadena, { min: 13, max: 16 })
  ) {
    return true; // El número cumple con los requisitos
  } else {
    return false; // El número no cumple con los requisitos
  }
};
export const customErrorValidation = (error) => {
  const simplifiedErrors = {};
  for (const key in error.errors) {
    simplifiedErrors[key] = {
      message: error.errors[key].message,
    };
  }

  // Crear un objeto que contenga la propiedad "errors"
  const result = {
    errors: simplifiedErrors,
  };
  return result;
};
