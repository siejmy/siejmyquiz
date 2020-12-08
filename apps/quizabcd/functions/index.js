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

app.get("/:alias/:resultId", async (req, res) => {
  console.log("REQ query", req.query);
  console.log("REQ params", req.params);
  console.log("REQ path", req.path);
  const resultId = req.params.resultId;
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

const result = functions
  .region("us-central1")
  .runWith({
    timeoutSeconds: 2,
    memory: "1GB",
  })
  .https.onRequest(app);

exports.quizabcd = { result };
