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
  return res.render("result_abcd", {
    resultId: req.params.resultId,
  });
});

exports.result_CbC8qrjxSk7UWmaHhslI = functions
  .region("europe-west3")
  .runWith({
    timeoutSeconds: 2,
    memory: "1GB",
  })
  .https.onRequest(app);
