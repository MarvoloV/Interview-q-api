import { handlerPath } from "@libs/handler-resolver";

export const CreateToken = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "post",
        path: "tokenCard/createToken",
      },
    },
  ],
};
