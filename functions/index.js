"use strict";

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const express = require("express");
const exphbs = require("express-handlebars");
const app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/:resultId", async (req, res) => {
  const resultId = req.params.resultId;
  if (!resultId) {
    return res.status(404).render("404");
  }
  const result = await admin.firestore().document("results/").get();
  const data = result && result.exists && result.data();
  if (!data) {
    return res.status(404).render("404");
  }
  //
  return res.send(JSON.stringify(data));
});

exports.result_CbC8qrjxSk7UWmaHhslI = functions
  .region("europe-west3")
  .runWith({
    timeoutSeconds: 2,
    memory: "1GB",
  })
  .https.onRequest(app);
