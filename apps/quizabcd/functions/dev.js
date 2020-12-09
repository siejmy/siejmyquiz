"use strict";

const sampleData = {
  id: "b3c682a6-1e3b-4e8a-8a2c-cc09834c0401",
  dataJSON: JSON.stringify({
    id: "b3c682a6-1e3b-4e8a-8a2c-cc09834c0401",
    name: "",
    answers: [2, 2, 2, 2],
    quizUrl: "",
    statsSummary: {
      sampleCount: 44,
      decileHistogram: [5, 0, 19, 0, 0, 12, 0, 2, 0, 6],
      average: 0.4147727272727273,
    },
    statsEntry: { quizId: "sanktuaria-demo", correctCount: 1, totalCount: 4 },
  }),
};

const { constructApp } = require("./app.js");

const app = constructApp({
  getResultFn: async () => {
    return sampleData;
  },
});

app.listen(3200);
