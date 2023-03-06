<template>
  <h2 class="highscore-heading">Highscore</h2>
  <main class="highscore-wrapper">
    <div class="highscore-type_wrapper">
      <button
        class="highscore-type"
        :class="{ 'highscore-type--active': currentHighscoreType === 5 }"
        @click="toggleHighscoreType(5)"
      >
        5
      </button>
      <button
        class="highscore-type"
        :class="{ 'highscore-type--active': currentHighscoreType === 10 }"
        @click="toggleHighscoreType(10)"
      >
        10
      </button>
      <button
        class="highscore-type"
        :class="{ 'highscore-type--active': currentHighscoreType === 15 }"
        @click="toggleHighscoreType(15)"
      >
        15
      </button>
      <button
        class="highscore-type"
        :class="{ 'highscore-type--active': currentHighscoreType === 20 }"
        @click="toggleHighscoreType(20)"
      >
        20
      </button>
    </div>
    <table class="score-table">
      <thead>
        <tr>
          <th></th>
          <th class="score-table_th">name</th>
          <th class="score-table_th">time</th>
          <th class="score-table_th">right</th>
          <th class="score-table_th">score</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td colspan="4"><hr /></td>
        </tr>
        <tr
          v-for="(gamer, index) of toggleHighscoreDetails"
          :key="gamer.id"
          :class="{ 'score-table_td-current': gamer.id === store.highscoreID }"
        >
          <td class="score-table_td">{{ index + 1 }}.</td>
          <td class="score_gamer-name score-table_td">{{ gamer.name }}</td>
          <td class="score-table_td">{{ gamer.elapsedTime }}</td>
          <td class="score-table_td">
            {{ gamer.result[0] }} / {{ gamer.result[1] }}
          </td>
          <td class="score-table_td">{{ gamer.highscore }}</td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script>
import { useQuizStore } from "@/stores/quizStore.js";

export default {
  name: "HighscoreView",
  setup() {
    const store = useQuizStore();
    return { store };
  },
  data() {
    return {
      currentHighscoreType: 5,
      highscoreData: [],
      currentEntry: "",
    };
  },
  computed: {
    toggleHighscoreDetails() {
      return this.highscoreData.filter((gamer) => {
        return gamer.result[1] === this.currentHighscoreType;
      });
    },
  },
  methods: {
    toggleHighscoreType(n) {
      this.currentHighscoreType = n;
    },
    getHighscoreScore() {
      this.highscoreData.forEach((gamer) => {
        const timePerQuestion = gamer.elapsedTime / gamer.result[1];
        let factor = 1;
        //if average time per question < 15s -> factor = 10
        //for every 5 seconds more, factor reduces at 1
        //minimum factor = 1
        for (let i = 0; i <= 9; i++) {
          if (timePerQuestion <= 15 + i * 5) {
            factor = 10 - i;
            i = 9;
          }
        }
        let bonus = 0;
        if (gamer.passedRatio === "100%") {
          bonus = 300;
        }
        gamer.highscore = gamer.result[0] * 10 * factor + bonus;
      });
    },
    sortByHighscore() {
      //sort highscoreData
      return this.highscoreData.sort((a, b) => b.highscore - a.highscore);
    },
    getCurrentEntry() {
      this.currentEntry = this.highscoreData.filter((game) => {
        return game.id === this.store.highscoreID;
      })[0];
      this.currentHighscoreType = this.currentEntry.total;
    },
  },
  async created() {
    const response = await fetch(
      "https://22-november.api.cbe.uber.space/highscore"
    );
    const highscoreData = await response.json();
    this.highscoreData = highscoreData;
    this.getHighscoreScore();
    this.sortByHighscore();
    if (this.store.highscoreID) {
      this.getCurrentEntry();
    }
  },
};
</script>

<style>
.highscore-heading {
  margin-top: 3rem;
}

.highscore-wrapper {
  display: grid;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 1rem;
  padding-inline: 0.3rem;
  max-width: 100vw;
}

.highscore-type_wrapper {
  display: flex;
  justify-content: space-around;
}

.highscore-type {
  margin-block: 1rem;
  border: none;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 1rem;
  color: rgb(227, 181, 5);
  box-shadow: 0 0 5px rgb(227, 181, 5);
  padding: 0.5rem 1rem;
  min-width: 20vw;
  transition: box-shadow 0.3s, background-color 0.3s;
}
.highscore-type:hover {
  background-color: rgb(255, 255, 255, 0.3);
}
.highscore-type--active {
  box-shadow: inset 0 0 5px white, 0 0 10px white, 0 0 20px white;
  color: white;
}

.score-table {
  background-color: rgba(0, 0, 0, 0.3);
  padding: 0.2rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
}

.score_gamer-name {
  text-transform: none;
  word-break: break-all;
}

.score-table_th {
  font-size: 0.7rem;
}

.score-table_td {
  font-size: 1rem;
}

.score-table_td-current > td {
  color: rgb(227, 181, 5);
  box-shadow: inset 0 0 5px white, 0 0 10px white, 0 0 20px white;
}

@media screen and (min-width: 500px) {
  .score-table {
    padding-inline: 1rem;
  }
  .highscore-wrapper {
    padding-inline: 1rem;
  }
  .score-table_th {
    font-size: inherit;
  }
  .score-table_td {
    font-size: inherit;
  }
}
</style>
