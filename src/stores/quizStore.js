import { defineStore } from "pinia";

export const useQuizStore = defineStore("quiz", {
  state: () => ({
    url: "",
    givenAnswers: {
      elapsedTime: 0,
      data: [],
    },
    stopwatch: "",
    highscoreID: "",
  }),
});
