"use strict";

const express = require("express");
const exphbs = require("express-handlebars");

const quizBaseUrl = "https://quiz.siejmy.pl/";

function constructApp(opts) {
  const getResultFn = opts.getResultFn;

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

    const data = await getResultFn(resultId);
    const dataParsed = JSON.parse(data.dataJSON);
    const quizUrl = quizBaseUrl + dataParsed.dataJSON.quizUrl;
    const quizResponse = await fetch(quizUrl);
    const quiz = await quizResponse.json();

    if (!data || !quiz) {
      res.status(404);
      return res.render("404");
    }
    console.log(JSON.parse(data.dataJSON));
    return res.render("abcd_results", {
      id: data.id || "noid",
      ...dataParsed,
      ...quiz,
      stringified: data.dataJSON,
    });
  });

  return app;
}

exports.constructApp = constructApp;
