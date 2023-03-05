import { defineStore } from "pinia";

export const useQuizStore = defineStore("quiz", {
  state: () => ({
    url: "https://22-november.api.cbe.uber.space/",
    givenAnswers: {
      elapsedTime: 180,
      data: [],
    },
    stopwatch: "",
  }),
});
