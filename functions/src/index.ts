import * as functions from "firebase-functions";

export const result_cbC8qrjxSk7UWmaHhslI = functions
  .region("europe-west3")
  .runWith({
    timeoutSeconds: 2,
    memory: "1GB",
  })
  .https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    functions.logger.info(request, { structuredData: true });
    response.send("Hello from Firebase!");
  });
