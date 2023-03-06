<template>
  <div v-if="store.url">
    <main>
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
      <div class="result-text">
        <h3 class="result-header">Well Done!</h3>

        <!-- Result Infos -->
        <section class="result-wrapper">
          <div class="result-wrapper_element">
            <h4 class="result-wrapper_element-h4">Time</h4>
            <p class="result-wrapper_element-p">{{ store.stopwatch }}</p>
          </div>
          <div
            class="result-wrapper_element"
            @click="toggleAnswers('right')"
            :class="{
              'result-wrapper_element-interactive--active':
                toggleAnswerDetails === 'right',
              'result-wrapper_element-interactive--empty':
                getRightAnswers.length === 0,
              'result-wrapper_element-interactive': getRightAnswers.length > 0,
              'result-wrapper_element-interactive-notificator':
                showNotificatorRight,
            }"
            @click.once="showNotificatorRight = false"
          >
            <h4 class="result-wrapper_element-h4">right</h4>
            <p class="result-wrapper_element-p">
              {{ getRightAnswers.length }}
            </p>
          </div>
          <div
            class="result-wrapper_element"
            @click="toggleAnswers('wrong')"
            :class="{
              'result-wrapper_element-interactive--active':
                toggleAnswerDetails === 'wrong',
              'result-wrapper_element-interactive--empty':
                getWrongAnswers.length === 0,
              'result-wrapper_element-interactive': getWrongAnswers.length > 0,
              'result-wrapper_element-interactive-notificator':
                showNotificatorWrong,
            }"
            @click.once="showNotificatorWrong = false"
          >
            <h4 class="result-wrapper_element-h4">wrong</h4>
            <p class="result-wrapper_element-p">
              {{ getWrongAnswers.length }}
            </p>
          </div>
        </section>

        <!-- Answer information -->
        <section
          v-if="toggleAnswerDetails === 'right'"
          class="result-answer-info"
        >
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
        </section>
        <section
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
        </section>

        <!-- Result Message -->
        <section>
          <p v-if="getPassedRatioNumber === 100" class="result-description">
            Wow you are very talented! I bet you can`t repeat that, can you?
          </p>
          <p
            v-else-if="getPassedRatioNumber > 50 && getPassedRatioNumber < 100"
            class="result-description"
          >
            That was already pretty good! Try it again to join the 100% club.
          </p>
          <p v-else class="result-description">
            I know this wasn't easy, but I also know you’ve got what it takes to
            get better.
          </p>
        </section>

        <!-- Highscore Form -->
        <form class="enter-score">
          <input
            type="text"
            name="username"
            id="username"
            class="enter-score_input"
            placeholder="PUT A NICKNAME"
            v-model="userName"
          />
          <label for="username">
            <button
              class="enter-score_btn"
              @click.prevent="sendHighscore"
              :class="{ 'enter-score_btn-active': userName }"
            >
              enter highscore
            </button>
          </label>
        </form>
      </div>
      <button class="new-btn" @click="newGame">New Game</button>
    </main>
  </div>
  <div v-else class="no-url-error">
    <main>
      Sorry no data found
      <p>redirection in: <br />{{ timer }}</p>
    </main>
  </div>
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
      resultData: {
        details: [],
        passedRatio: "",
      },
      toggleAnswerDetails: "",
      timer: 5,
      currentInterval: undefined,
      showNotificatorRight: true,
      showNotificatorWrong: true,
      userName: "",
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
    toggleAnswers(text) {
      if (this.toggleAnswerDetails === text) {
        this.toggleAnswerDetails = "";
      } else {
        this.toggleAnswerDetails = text;
      }
    },
    newGame() {
      this.$router.push({ name: "entryPage" });
    },
    async sendHighscore() {
      if (this.userName && !this.store.highscoreID) {
        const highscoreData = {
          name: this.userName,
          elapsedTime: this.resultData.elapsedTime,
          passedRatio: this.resultData.passedRatio,
          total: this.resultData.total,
          result: this.resultData.result,
          id: this.resultData.id,
        };

        localStorage.setItem("userName", JSON.stringify(this.userName));

        const response = await fetch(
          "https://22-november.api.cbe.uber.space/highscore",
          {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(highscoreData),
          }
        );
        const data = await response.json();
        this.store.highscoreID = data.id;
        this.$router.push({ name: "highscorePage" });
      } else if (this.store.highscoreID) {
        this.$router.push({ name: "highscorePage" });
      }
    },
  },
  async created() {
    if (localStorage.getItem("userName")) {
      this.userName = JSON.parse(localStorage.getItem("userName"));
    }
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
  position: relative;
}

.result-wrapper_element-interactive {
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background-color 0.3s;
}

.result-wrapper_element-interactive-notificator::before {
  content: "!";
  font-size: 1rem;
  color: rgb(255, 255, 255, 0.7);
  height: 1.1rem;
  aspect-ratio: 1;
  position: absolute;
  right: 10%;
  top: -10%;
  border-radius: 2rem;
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.7);
  background-color: rgba(0, 0, 0, 0.3);
}

.result-wrapper_element-interactive:hover {
  background-color: rgb(255, 255, 255, 0.3);
}
.result-wrapper_element-interactive--active {
  box-shadow: inset 0 0 5px white, 0 0 10px white, 0 0 20px white;
}

.result-wrapper_element-interactive--empty {
  pointer-events: none;
}

.result-wrapper_element-interactive--empty::before {
  display: none;
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
  font-size: 1rem;
}

.enter-score {
  justify-self: center;
  position: relative;
  width: fit-content;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  margin: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 1rem;
}

.enter-score_input {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 2rem;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  text-transform: none;
}
.enter-score_input:focus {
  outline: none;
  box-shadow: inset 0 0 5px white, 0 0 10px white, 0 0 20px white;
}
.enter-score_input:focus + label > .enter-score_btn-active {
  box-shadow: inset 0 0 5px white, 0 0 10px white, 0 0 20px white;
}

.enter-score_btn {
  background-color: rgb(17, 161, 26, 0.5);
  color: rgba(255, 255, 255, 0.5);
  font-size: 1rem;
  border: none;
  border-radius: 2rem;
  padding: 0.5rem 1rem;
  position: relative;
  pointer-events: none;
  width: 100%;
}

.enter-score_btn-active {
  cursor: pointer;
  pointer-events: all;
  background-color: rgb(17, 161, 26);
  color: white;
}

@media screen and (min-width: 700px) {
  .enter-score {
    padding: 0;
    background-color: transparent;
  }
  .enter-score_btn {
    position: absolute;
    width: max-content;
    top: 0;
    right: 0;
  }
  .enter-score_input {
    width: 60vw;
  }
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
