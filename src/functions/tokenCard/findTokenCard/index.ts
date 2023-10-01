import { handlerPath } from "@libs/handler-resolver";

export const findTokenCard = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "get",
        path: "tokenCard/findTokenCard/{id}",
      },
    },
  ],
};
