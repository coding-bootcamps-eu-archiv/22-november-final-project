<template>
  <main>
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
      <p class="result-description">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias ad
        totam nihil voluptatum placeat, quidem doloremque doloribus minima
        debitis aliquam maxime alias accusamus quam fugiat, vitae repudiandae,
        temporibus minus veritatis.
      </p>
    </section>
    <button class="new-btn">New Game</button>
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
    };
  },
  async created() {
    const response = await fetch(
      "https://22-november.api.cbe.uber.space/quiz/result",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          elapsedTime: 180,
          data: [
            {
              id: "0dcbdd75-ce3a-48a7-89b2-4707ad6818e1",
              selected: [3],
            },
            {
              id: "1b54d1f0-aaef-4e1f-b7c4-d153afcd60db",
              selected: [0],
            },
          ],
        }),
      }
    );
    const resultData = await response.json();
    this.resultData = resultData;
    console.log(resultData);
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

@media screen and (min-width: 450px) {
  .result-bar,
  .result-bar_current {
    height: 1.5rem;
  }
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
  font-size: 4rem;
  opacity: 0;
  animation: text-pop-up-top 2s ease-in 1s forwards;
}

.result-text {
  display: grid;
  place-content: center;
  grid-template: 0.3fr 1fr/70vw;
  margin: 2rem;
  opacity: 0;
  animation: text-pop-up-bottom 2s ease-in 2s forwards;
}
.result-header {
  color: rgb(227, 181, 5, 0.8);
  font-size: 1.5rem;
  text-decoration: underline;
}
.result-description {
  color: rgb(255, 255, 255, 0.6);
  text-transform: none;
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
</style>
