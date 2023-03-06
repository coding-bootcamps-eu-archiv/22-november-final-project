<template>
  <div v-if="store.url">
    <header>
      <div class="progress-bar">
        <div
          class="progress-bar_current"
          :style="{
            '--progress-value': getProgressValue,
          }"
        ></div>
        <p class="progress-text">
          {{ progressText }}
        </p>
      </div>
      <p class="stop-watch">
        {{ stopwatch }}
      </p>
    </header>
    <main>
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
                <p class="questions_label-game" v-html="answer.text"></p>
              </label>
            </div>
          </div>
          <button
            class="next-btn"
            @click.prevent="callNextQuestion"
            :disabled="noAnswerSelected"
          >
            {{ buttonCaption }}
          </button>
        </div>
      </form>
    </main>
  </div>
  <div v-else class="no-url-error">
    <main>
      Sorry no data found
      <p>redirection in: <br />{{ elapsedTime }}</p>
    </main>
  </div>
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
      elapsedTime: 0,
      stopwatch: "0:00",
      minute: 0,
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
    progressText() {
      return this.displayProgress + "/" + this.selectedQuestionLength;
    },
    getProgressValue() {
      return (
        (this.currentQuestionNumber / this.selectedQuestionLength) * 100 + "%"
      );
    },
  },
  methods: {
    callNextQuestion() {
      this.currentAnswer.id = this.currentQuestion.id;
      this.store.givenAnswers.data.push(this.currentAnswer);
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

        this.store.stopwatch = this.stopwatch;
        this.store.givenAnswers.elapsedTime = this.elapsedTime;
        this.$router.push({ name: "resultPage" });
      }
    },
  },
  async created() {
    if (!this.store.url) {
      this.elapsedTime = 5;

      this.currentInterval = setInterval(() => {
        this.elapsedTime--;
      }, 1000);
    }

    if (this.currentQuestionNumber === 0) {
      this.store.givenAnswers = {
        elapsedTime: 0,
        data: [],
      };
    }

    const response = await fetch(this.store.url);
    this.setOfQuestions = await response.json();
    this.selectedQuestionLength = this.setOfQuestions.numberOfItems;
    this.currentQuestion = this.setOfQuestions.data[this.currentQuestionNumber];

    this.currentInterval = setInterval(() => {
      this.elapsedTime++;
      let second = this.elapsedTime % 60;
      if (second < 10) {
        second = "0" + second;
      }
      if (this.elapsedTime % 60 === 0) {
        this.minute++;
      }
      this.stopwatch = this.minute + ":" + second;
    }, 1000);
  },
  watch: {
    elapsedTime(newV, oldV) {
      if (newV < oldV && newV === 0) {
        clearInterval(this.currentInterval);
        this.$router.push({ name: "entryPage" });
      }
    },
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

.stop-watch_span {
  color: rgb(227, 181, 5);
  font-size: 1rem;
}

.wrapper {
  display: grid;
  place-content: center;
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

@media screen and (min-width: 500px) {
  .checkbox-wrapper {
    grid-template: 1fr 1fr /1fr 1fr;
  }
  .stop-watch {
    font-size: 1.5rem;
    top: 1rem;
  }
  .stop-watch_span {
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

.input-question:checked ~ .questions_label-game {
  box-shadow: inset 0 0 5px white, 0 0 10px white, 0 0 20px white;
}
.input-question:hover ~ .questions_label-game {
  background-color: rgb(255, 255, 255, 0.3);
}
.questions_label-game {
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  border: 2px solid rgb(255, 255, 255, 0.5);
  transition: box-shadow 0.3s, background-color 0.3s;
  position: relative;
  margin: 0.5rem 1rem;
  text-transform: none;
  word-break: break-word;
  cursor: pointer;
}

.next-btn {
  background-color: rgb(17, 161, 26);
  border: none;
  border-radius: 2rem;
  padding: 1rem 2rem;
  transition: scale 0.2s ease-out;
  margin: 2rem;
  cursor: pointer;
  width: fit-content;
  justify-self: center;
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

.no-url-error {
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
}
</style>
