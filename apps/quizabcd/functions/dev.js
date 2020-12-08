"use strict";

const sampleData = {
  id: "b3c682a6-1e3b-4e8a-8a2c-cc09834c0401",
  dataJSON: JSON.stringify({
    id: "b3c682a6-1e3b-4e8a-8a2c-cc09834c0401",
    name: "",
    answers: [2, 2, 2, 2],
    quiz: {
      id: "sanktuaria-demo",
      title: "Sanktuaria w Polsce",
      type: "abcd",
      introHtml:
        "Czy potrafisz rozpoznać, który wizarunek Matki Przenajświętszej pochodzi z jakiego sanktuarium?",
      introImageUrl: "sanktuaria-4.jpg",
      questions: [
        {
          title: "Co to za sanktuarium?",
          imageUrl: "sanktuaria-1.jpg",
          distractors: ["Częstochowa", "Ostrożany", "Obory", "Gietrzwałd"],
          correctNo: 0,
        },
        {
          title: "Co to za sanktuarium?",
          imageUrl: "sanktuaria-2.jpg",
          distractors: ["Częstochowa", "Ostrożany", "Obory", "Gietrzwałd"],
          correctNo: 3,
        },
        {
          title: "Co to za sanktuarium?",
          imageUrl: "sanktuaria-3.jpg",
          distractors: ["Częstochowa", "Ostrożany", "Obory", "Gietrzwałd"],
          correctNo: 2,
        },
        {
          title: "Co to za sanktuarium?",
          imageUrl: "sanktuaria-4.jpg",
          distractors: ["Częstochowa", "Ostrożany", "Obory", "Gietrzwałd"],
          correctNo: 1,
        },
      ],
    },
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
  getResultFn: () => {
    return sampleData;
  },
});

app.listen(3200);
