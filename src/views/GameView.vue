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
        {{ currentQuestionNumber + "/" + selectedQuestionLength }}
      </p>
    </div>
    <p class="stop-watch">{{ stopwatch }}</p>

    <form>
      <div class="wrapper">
        <div class="questions_wrapper">
          <p>{{ currentQuestion.question }}</p>
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
              />
              <div class="questions_label" v-html="answer.text"></div>
            </label>
          </div>
        </div>
      </div>
      <button class="next-btn" @click.prevent="callNextQuestion">Next</button>
    </form>
    {{ setOfQuestions }}
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
      stopwatch: "0:34",
      setOfQuestions: {},
      currentQuestion: {},
    };
  },
  computed: {
    getProgressValue() {
      return (
        (this.currentQuestionNumber / this.selectedQuestionLength) * 100 + "%"
      );
    },
  },
  methods: {
    callNextQuestion() {
      this.currentQuestionNumber += 1;
      this.currentQuestion =
        this.setOfQuestions.data[this.currentQuestionNumber];
    },
  },
  // wir brauchen mounted, weil created bereits mit start der App geladen wird
  async created() {
    const response = await fetch(this.store.url);
    this.setOfQuestions = await response.json();
    this.selectedQuestionLength = this.setOfQuestions.numberOfItems;
    this.currentQuestion = this.setOfQuestions.data[this.currentQuestionNumber];
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
}

.next-btn {
  background-color: rgb(17, 161, 26);
  border: none;
  border-radius: 2rem;
  padding: 1rem 2rem;
  transition: scale 0.2s ease-out;
  margin: 2rem;
}

.next-btn:hover {
  scale: 1.1;
}
</style>
