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

    const resultResponse = await getResultFn(resultId);
    console.log(JSON.stringify({ resultResponse }));
    const result = JSON.parse(resultResponse.dataJSON);
    console.log(JSON.stringify({ result }));
    const quizUrl = quizBaseUrl + result.quizUrl;
    console.log(JSON.stringify({ quizUrl }));
    const quizResponse = await fetch(quizUrl);
    console.log(JSON.stringify({ quizResponse }));
    const quiz = await quizResponse.json();
    console.log(JSON.stringify({ quiz }));

    if (!data || !quiz) {
      res.status(404);
      return res.render("404");
    }
    const opts = {
      id: data.id || "noid",
      result,
      quiz,
    };
    console.log(JSON.stringify(opts));
    return res.render("abcd_results", {
      ...opts,
      stringified: JSON.stringify(opts),
    });
  });

  return app;
}

exports.constructApp = constructApp;
