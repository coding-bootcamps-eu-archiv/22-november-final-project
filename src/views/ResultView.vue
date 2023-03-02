<template>
  <main>
    <div v-if="store.url">
      <!-- Result bar -->
      <h2 class="result-percentage">{{ resultData.passedRatio }}</h2>
      <div class="result-bar">
        <div
          class="result-bar_current"
          :style="{
            '--progress-value': resultData.passedRatio,
          }"
        ></div>
      </div>
      <section class="result-text">
        <h3 class="result-header">Well Done!</h3>

        <!-- Result Infos -->
        <div class="result-wrapper">
          <div class="result-wrapper_element">
            <h4 class="result-wrapper_element-h4">Time</h4>
            <p class="result-wrapper_element-p">{{ store.stopwatch }}</p>
          </div>
          <div
            class="result-wrapper_element result-wrapper_element-interactive"
            @click="toggleAnswersRight"
            :class="{
              'result-wrapper_element-interactive--active':
                toggleAnswerDetails === 'right',
            }"
          >
            <h4 class="result-wrapper_element-h4">right</h4>
            <p class="result-wrapper_element-p">
              {{ resultData.result[0] }}
            </p>
          </div>
          <div
            class="result-wrapper_element result-wrapper_element-interactive"
            @click="toggleAnswersWrong"
            :class="{
              'result-wrapper_element-interactive--active':
                toggleAnswerDetails === 'wrong',
            }"
          >
            <h4 class="result-wrapper_element-h4">wrong</h4>
            <p class="result-wrapper_element-p">
              {{ resultData.result[1] - resultData.result[0] }}
            </p>
          </div>
        </div>

        <!-- Answer information -->
        <div v-if="toggleAnswerDetails === 'right'" class="result-answer-info">
          <div v-for="question of getRightAnswers" :key="question.id">
            <p
              class="result-answer-info_question"
              v-html="question.question"
            ></p>
            <ul>
              <li
                class="result-answer-info_right"
                v-for="select of question.selectedAnswers"
                :key="question.answerDetails[select - 1].id"
                v-html="question.answerDetails[select - 1].text"
              ></li>
            </ul>
          </div>
        </div>
        <div
          v-else-if="toggleAnswerDetails === 'wrong'"
          class="result-answer-info"
        >
          <div v-for="question of getWrongAnswers" :key="question.id">
            <p
              class="result-answer-info_question"
              v-html="question.question"
            ></p>
            <ul>
              <li
                class="result-answer-info_wrong"
                v-for="select of question.selectedAnswers"
                :key="question.answerDetails[select - 1].id"
                v-html="question.answerDetails[select - 1].text"
              ></li>
              <li
                class="result-answer-info_right"
                v-for="answer of question.answerDetails"
                :key="answer.id"
                v-show="answer.isValid"
                v-html="answer.text"
              ></li>
            </ul>
          </div>
        </div>

        <!-- Result Message -->
        <p v-if="getPassedRatioNumber === 100" class="result-description">
          Wow you are very talented! I bet you can`t repeat that, can you?
        </p>
        <p
          v-else-if="getPassedRatioNumber > 50 && getPassedRatioNumber < 100"
          class="result-description"
        >
          That was already pretty good! Try it again to join the 100% club.
        </p>
        <p v-else-if="getPassedRatioNumber <= 50" class="result-description">
          I know this wasn't easy, but I also know you’ve got what it takes to
          get better.
        </p>
      </section>
      <button class="new-btn" @click="newGame">New Game</button>
    </div>
    <div v-else class="no-url-error">
      Sorry no data found
      <p>redirection in: <br />{{ timer }}</p>
    </div>
  </main>
</template>

<script>
import { useQuizStore } from "@/stores/quizStore.js";

export default {
  name: "ResultView",
  setup() {
    const store = useQuizStore();
    return { store };
  },
  data() {
    return {
      resultData: {},
      toggleAnswerDetails: "",
      timer: 5,
      currentInterval: undefined,
    };
  },
  computed: {
    getPassedRatioNumber() {
      return +this.resultData.passedRatio.split("").slice(0, -1).join("");
    },
    getRightAnswers() {
      return this.resultData.details.filter((question) => {
        return question.isCorrect;
      });
    },
    getWrongAnswers() {
      return this.resultData.details.filter((question) => {
        return !question.isCorrect;
      });
    },
  },
  methods: {
    toggleAnswersRight() {
      if (this.toggleAnswerDetails === "right") {
        this.toggleAnswerDetails = "";
      } else {
        this.toggleAnswerDetails = "right";
      }
    },
    toggleAnswersWrong() {
      if (this.toggleAnswerDetails === "wrong") {
        this.toggleAnswerDetails = "";
      } else {
        this.toggleAnswerDetails = "wrong";
      }
    },
    newGame() {
      this.$router.push({ name: "entryPage" });
    },
  },
  async created() {
    try {
      const response = await fetch(
        "https://22-november.api.cbe.uber.space/quiz/result",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(this.store.givenAnswers),
        }
      );
      const resultData = await response.json();
      this.resultData = resultData;
      console.log(resultData);
    } catch {
      this.currentInterval = setInterval(() => {
        this.timer--;
      }, 1000);
    }
  },
  watch: {
    timer(newV, oldV) {
      if (newV < oldV && newV === 0) {
        clearInterval(this.currentInterval);
        this.$router.push({ name: "entryPage" });
      }
    },
  },
};

/*
valid Body:
    {
        elapsedTime: 180,
        data: [
          {
            id: "0dcbdd75-ce3a-48a7-89b2-4707ad6818e1",
            selected: [3],
          },
          {
            id: "1b54d1f0-aaef-4e1f-b7c4-d153afcd60db",
            selected: [2],
          },
        ],
      }


response:
{
    "elapsedTime": 180,
    "passedRatio": "100.00%",
    "total": 2,
    "result": [
        2,
        2
    ],
    "details": [
        {
            "id": "0dcbdd75-ce3a-48a7-89b2-4707ad6818e1",
            "isCorrect": true,
            "question": "What is the correct HTML for referring to an external style sheet?",
            "selectedAnswers": [
                3
            ],
            "answerDetails": [
                {
                    "id": 1,
                    "text": "At the end of the document.",
                    "isValid": false,
                    "selectedByUser": false
                },
                {
                    "id": 2,
                    "text": "In the &lt;body&gt; section.",
                    "isValid": false,
                    "selectedByUser": false
                },
                {
                    "id": 3,
                    "text": "In the &lt;head&gt; section.",
                    "isValid": true,
                    "selectedByUser": true
                }
            ]
        },
        {
            "id": "1b54d1f0-aaef-4e1f-b7c4-d153afcd60db",
            "isCorrect": true,
            "question": "Which property is used to change the background color with css?",
            "selectedAnswers": [
                2
            ],
            "answerDetails": [
                {
                    "id": 1,
                    "text": "bgcolor",
                    "isValid": false,
                    "selectedByUser": false
                },
                {
                    "id": 2,
                    "text": "background-color",
                    "isValid": true,
                    "selectedByUser": true
                },
                {
                    "id": 3,
                    "text": "color",
                    "isValid": false,
                    "selectedByUser": false
                },
                {
                    "id": 4,
                    "text": "coulor",
                    "isValid": false,
                    "selectedByUser": false
                }
            ]
        }
    ]
} */
</script>

<style>
.result-bar,
.result-bar_current {
  width: 50vw;
  height: 1rem;
  background: rgb(0, 0, 0, 0.7);
  box-shadow: inset 0 0 5px white, 0 0 10px white, 0 0 20px white;
  border-radius: 1rem;
  display: inline-block;
  position: relative;
}

.result-bar {
  margin: 2rem;
  overflow: hidden;
}

@keyframes slide-in-left {
  0% {
    transform: translateX(-500px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.result-bar_current {
  --progress-value: 0%;

  background: rgb(227, 181, 5);
  position: absolute;
  width: var(--progress-value);
  left: 0px;
  animation: slide-in-left 2s ease-out;
}

@keyframes text-pop-up-top {
  0% {
    transform: translateY(0);
    transform-origin: 50% 50%;
    text-shadow: none;
    opacity: 0;
  }
  100% {
    transform: translateY(50px);
    transform-origin: 50% 50%;
    text-shadow: 0 0 5px white, 0 0 10px white, 0 0 20px white;
    opacity: 1;
  }
}
@keyframes text-pop-up-bottom {
  0% {
    transform: translateY(0);
    transform-origin: 50% 50%;
    text-shadow: none;
    opacity: 0;
  }
  100% {
    transform: translateY(-50px);
    transform-origin: 50% 50%;
    _text-shadow: 0 0 5px white, 0 0 10px white, 0 0 20px white;
    opacity: 1;
  }
}

.result-percentage {
  color: rgb(227, 181, 5);
  font-size: 3rem;
  opacity: 0;
  animation: text-pop-up-top 2s ease-in 1s forwards;
}

.result-text {
  display: grid;
  place-content: center;
  grid-template: 0.3fr 1fr/95vw;
  margin: 2rem;
  opacity: 0;
  animation: text-pop-up-bottom 2s ease-in 2s forwards;
}
.result-header {
  color: rgb(227, 181, 5, 0.8);
  font-size: 1.5rem;
  text-decoration: underline;
}

.result-wrapper {
  display: flex;
  justify-content: space-around;
}

.result-wrapper_element {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 1rem;
  padding-inline: 1rem;
  min-width: 20vw;
}

.result-wrapper_element-interactive {
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  cursor: pointer;
}

.result-wrapper_element-interactive:hover {
  background-color: rgb(255, 255, 255, 0.3);
}
.result-wrapper_element-interactive--active {
  box-shadow: inset 0 0 5px white, 0 0 10px white, 0 0 20px white;
}

.result-wrapper_element-h4 {
  font-weight: 500;
  font-size: 1rem;
  margin-block: 0.6rem;
  color: rgba(255, 255, 255, 0.3);
}

.result-wrapper_element-p {
  color: rgba(255, 255, 255, 0.7);
  margin-block: 0;
}

.result-answer-info {
  background-color: rgba(0, 0, 0, 0.3);
  margin: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  text-align: start;
  width: fit-content;
}

.result-answer-info_question,
.result-answer-info_right,
.result-answer-info_wrong {
  font-size: 0.75rem;
}
.result-answer-info_wrong {
  color: red;
  text-transform: none;
  list-style-type: circle;
}

.result-answer-info_wrong::marker {
  content: "\2718  ";
}

.result-answer-info_right::marker {
  content: "\2713  ";
}

.result-answer-info_right {
  color: rgb(17, 161, 26);
  text-transform: none;
}

@media screen and (min-width: 450px) {
  .result-bar,
  .result-bar_current {
    height: 1.5rem;
  }
  .result-percentage {
    font-size: 4rem;
  }

  .result-answer-info_question,
  .result-answer-info_right,
  .result-answer-info_wrong {
    font-size: 1rem;
  }
}

@media screen and (min-width: 500px) {
  .result-text {
    grid-template-columns: 70vw;
  }
  .result-wrapper_element-h4 {
    font-size: 1rem;
  }
}

.result-description {
  margin-top: 2rem;
  color: rgb(255, 255, 255, 0.7);
  _text-transform: none;
  font-size: 1rem;
}

.new-btn {
  background-color: rgb(17, 161, 26);
  border: none;
  border-radius: 2rem;
  padding: 1rem 2rem;
  transition: scale 0.2s ease-out;
  opacity: 0;
  animation: text-pop-up-bottom 2s ease-in 2s forwards;
}
.new-btn:hover {
  scale: 1.1;
}

.no-url-error {
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
}
</style>
