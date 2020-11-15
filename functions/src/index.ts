import * as functions from "firebase-functions";
import { handleResultFn } from "./result";

export const result_cbC8qrjxSk7UWmaHhslI = functions
  .region("europe-west3")
  .runWith({
    timeoutSeconds: 2,
    memory: "1GB",
  })
  .https.onRequest(async (request, response) => {
    response.send(await handleResultFn(request.url));
  });
