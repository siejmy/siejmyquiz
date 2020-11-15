import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp(functions.config().firebase);

import { handleResultFn } from "./result";

export const result_cbC8qrjxSk7UWmaHhslI = functions
  .region("europe-west3")
  .runWith({
    timeoutSeconds: 2,
    memory: "1GB",
  })
  .https.onRequest(async (request, response) => {
    const urlParts = request.url.split("/");
    if (urlParts.length < 2) {
      response.status(404).send("Nie znaleziono");
      return;
    }
    const id = urlParts[1];
    const resultRecord = await admin
      .firestore()
      .doc("results/" + id)
      .get();
    const resultData = resultRecord.data();
    if (!resultRecord.exists || !resultData) {
      response.status(404).send("Nie znaleziono");
      return;
    }

    response.send(await handleResultFn(resultData as any));
  });
