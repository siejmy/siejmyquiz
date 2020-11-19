"use strict";

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const express = require("express");
const exphbs = require("express-handlebars");
const app = express();

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    partialsDir: __dirname + "/views/partials/",
    helpers: require("./handlebars-helpers"),
  })
);
app.set("view engine", "handlebars");

app.get("/", async (req, res) => {
  console.log("REQ", req.query);
  const resultId = req.query.id;
  if (!resultId) {
    res.status(404);
    return res.render("404");
  }
  const docPath = "results/" + resultId;
  console.log("docPath=" + docPath);
  const result = await admin.firestore().doc(docPath).get();
  console.log(result);
  console.log("exists=" + result.exists);
  const data = result && result.exists && result.data();
  if (!data) {
    res.status(404);
    return res.render("404");
  }
  console.log(JSON.parse(data.dataJSON));
  const templateName = data.templateName;
  return res.render(templateName, {
    id: data.id,
    ...JSON.parse(data.dataJSON),
    stringified: data.dataJSON,
  });
});

exports.result_CbC8qrjxSk7UWmaHhslI = functions
  .region("europe-west3")
  .runWith({
    timeoutSeconds: 2,
    memory: "1GB",
  })
  .https.onRequest(app);
