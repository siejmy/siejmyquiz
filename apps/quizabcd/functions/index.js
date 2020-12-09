"use strict";

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const { constructApp } = require("./app.js");

const app = constructApp({
  getResultFn: async (resultId) => {
    const docPath = "results/" + resultId;
    const result = await admin.firestore().doc(docPath).get();
    console.log(result);
    return result && result.exists && result.data();
  },
});

const result = functions
  .region("us-central1")
  .runWith({
    timeoutSeconds: 2,
    memory: "1GB",
  })
  .https.onRequest(app);

exports.quizabcd = { result };
