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
          <p>{{ $route.params.topic + " " + $route.params.number }}</p>
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
      <button class="next-btn">Next</button>
    </form>
  </main>
</template>

<script>
export default {
  name: "GameView",
  props: {
    url: String,
  },
  data() {
    return {
      currentQuestionNumber: 10,
      selectedQuestionLength: 15,
      stopwatch: "0:34",
      currentQuestion: {
        groupId: "9d5ae045-ef9a-4068-bc6c-1b102bda5f55",
        createdAt: 1667606819049,
        isActive: true,
        id: "9b2e970b-307a-4754-a35e-4e16ecc8d65b",
        question: "Inside which HTML element do we put the JavaScript?",
        answers: [
          {
            id: 1,
            text: "&lt;js&gt;",
            isValid: false,
          },
          {
            id: 2,
            text: "&lt;scripting&gt;",
            isValid: false,
          },
          {
            id: 3,
            text: "&lt;javascript&gt;",
            isValid: false,
          },
          {
            id: 4,
            text: "&lt;script&gt;",
            isValid: true,
          },
        ],
      },
    };
  },
  computed: {
    getProgressValue() {
      return (
        (this.currentQuestionNumber / this.selectedQuestionLength) * 100 + "%"
      );
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
