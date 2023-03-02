import { defineStore } from "pinia";

export const useQuizStore = defineStore("quiz", {
  state: () => ({
    url: "",
    givenAnswers: {
      elapsedTime: 180,
      data: [],
    },
    stopwatch: "",
  }),
});
