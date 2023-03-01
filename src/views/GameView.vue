<template>
  <main>
    <div class="progress-bar">
      <div
        class="progress-bar_current"
        :style="{
          '--progress-value': getProgressValue,
        }"
      ></div>
      <p class="progress-text">
        {{ displayProgress + "/" + selectedQuestionLength }}
      </p>
    </div>
    <p class="stop-watch">
      {{ stopwatch.min + ":" }}
      <span class="stop-watch_span" v-if="stopwatch.sec < 10">0</span
      >{{ stopwatch.sec }}
    </p>
    <form>
      <div class="wrapper">
        <div class="questions_wrapper">
          <p v-html="currentQuestion.question"></p>
          <div class="checkbox-wrapper">
            <label
              v-for="answer of currentQuestion.answers"
              :key="answer.id"
              :for="answer.id"
            >
              <input
                type="checkbox"
                :name="currentQuestion.question"
                class="input-question"
                :id="answer.id"
                v-model="currentAnswer.selected"
                :value="answer.id"
              />
              <div class="questions_label" v-html="answer.text"></div>
            </label>
          </div>
        </div>
      </div>
      <button
        class="next-btn"
        @click.prevent="callNextQuestion"
        :disabled="noAnswerSelected"
      >
        {{ buttonCaption }}
      </button>
    </form>
  </main>
</template>

<script>
import { useQuizStore } from "@/stores/quizStore.js";

export default {
  name: "GameView",
  setup() {
    const store = useQuizStore();
    return { store };
  },
  data() {
    return {
      currentQuestionNumber: 0,
      selectedQuestionLength: 15,
      stopwatch: {
        min: 0,
        sec: 0,
      },
      currentInterval: undefined,
      setOfQuestions: {},
      currentQuestion: {},
      currentAnswer: {
        id: "",
        selected: [],
      },
      buttonCaption: "next",
    };
  },
  computed: {
    noAnswerSelected() {
      return this.currentAnswer.selected.length === 0 ? true : false;
    },
    displayProgress() {
      return this.currentQuestionNumber + 1;
    },
    getProgressValue() {
      return (this.displayProgress / this.selectedQuestionLength) * 100 + "%";
    },
  },
  methods: {
    callNextQuestion() {
      this.currentAnswer.id = this.currentQuestion.id;
      this.store.givenAnswers.push(this.currentAnswer);
      this.currentAnswer = {
        id: "",
        selected: [],
      };
      if (this.currentQuestionNumber != this.setOfQuestions.data.length - 1) {
        this.currentQuestionNumber += 1;
        this.currentQuestion =
          this.setOfQuestions.data[this.currentQuestionNumber];
        if (
          this.currentQuestionNumber ===
          this.setOfQuestions.data.length - 1
        ) {
          this.buttonCaption = "result";
        }
      } else {
        clearInterval(this.currentInterval);

        let second = this.stopwatch.sec;
        if (second < 10) {
          second = "0" + second;
        }
        this.store.stopwatch = this.stopwatch.min + ":" + second;
        this.$router.push({ name: "resultPage" });
      }
    },
  },
  /**
   * Todo implement button to go to start page when page is refreshed = url empty (incl. message)
   * */
  async created() {
    const response = await fetch(this.store.url);
    this.setOfQuestions = await response.json();
    this.selectedQuestionLength = this.setOfQuestions.numberOfItems;
    this.currentQuestion = this.setOfQuestions.data[this.currentQuestionNumber];

    this.currentInterval = setInterval(() => {
      this.stopwatch.sec++;
      if (this.stopwatch.sec === 60) {
        this.stopwatch.min++;
        this.stopwatch.sec = 0;
      }
    }, 1000);
  },
};
</script>

<style>
.progress-bar,
.progress-bar_current {
  width: 50vw;
  height: 1rem;
  background: rgb(0, 0, 0, 0.7);
  border-radius: 1rem;
  display: inline-block;
  position: relative;
}

.progress-bar {
  margin: 2rem;
}

.progress-bar_current {
  --progress-value: 0%;

  background: rgb(227, 181, 5);
  position: absolute;
  width: var(--progress-value);
  left: 0px;
}

.progress-text {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 1rem;
  translate: -125% -90%;
}

.stop-watch {
  position: absolute;
  right: 1rem;
  top: 1.35rem;
  font-size: 1rem;
}

.wrapper {
  display: grid;
  place-content: center;
  height: 60vh;
}

.questions_wrapper {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 1rem;
  padding: 1rem;
}

.checkbox-wrapper {
  display: grid;
  grid-template: 1fr 1fr 1fr 1fr/1fr;
}

@media screen and (min-width: 450px) {
  .checkbox-wrapper {
    grid-template: 1fr 1fr /1fr 1fr;
  }
  .stop-watch {
    font-size: 1.5rem;
    top: 1rem;
  }
  .stop-watch_span {
    color: rgb(227, 181, 5);
    font-size: 1.5rem;
  }
  .progress-text {
    font-size: 1.5rem;
  }
  .progress-bar,
  .progress-bar_current {
    height: 1.5rem;
  }
}

.input-question {
  display: none;
}

.input-question:checked ~ .questions_label {
  box-shadow: inset 0 0 5px white, 0 0 10px white, 0 0 20px white;
}
.input-question:hover ~ .questions_label {
  background-color: rgb(255, 255, 255, 0.3);
}
.questions_label {
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  border: 2px solid rgb(255, 255, 255, 0.5);
  transition: box-shadow 0.3s, background-color 0.3s;
  position: relative;
  margin: 0.5rem 1rem;
  text-transform: none;
}

.next-btn {
  background-color: rgb(17, 161, 26);
  border: none;
  border-radius: 2rem;
  padding: 1rem 2rem;
  transition: scale 0.2s ease-out;
  margin: 2rem;
  cursor: pointer;
}

.next-btn:hover {
  scale: 1.1;
}

.next-btn:hover:disabled {
  scale: 1;
}

.next-btn:disabled {
  background-color: rgb(17, 161, 26, 0.7);
  cursor: default;
}
</style>
