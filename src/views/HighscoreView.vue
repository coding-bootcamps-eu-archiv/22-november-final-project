<template>
  <h1>Highscore</h1>
  <div class="highscore-wrapper">
    <div class="highscore-type_wrapper">
      <p
        class="highscore-type"
        :class="{ 'highscore-type--active': toggleHighscoreDetails === 5 }"
        @click="toggleHighscoreType(5)"
      >
        5
      </p>
      <p
        class="highscore-type"
        :class="{ 'highscore-type--active': toggleHighscoreDetails === 10 }"
        @click="toggleHighscoreType(10)"
      >
        10
      </p>
      <p
        class="highscore-type"
        :class="{ 'highscore-type--active': toggleHighscoreDetails === 15 }"
        @click="toggleHighscoreType(15)"
      >
        15
      </p>
      <p
        class="highscore-type"
        :class="{ 'highscore-type--active': toggleHighscoreDetails === 20 }"
        @click="toggleHighscoreType(20)"
      >
        20
      </p>
    </div>
    <table class="score-table">
      <thead>
        <tr>
          <th></th>
          <th>name</th>
          <th>time</th>
          <th>right</th>
          <th>score</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td colspan="4"><hr /></td>
        </tr>
        <tr v-for="(gamer, index) of filteredHighscoreData" :key="gamer.id">
          <td>{{ index + 1 }}.</td>
          <td>{{ gamer.name }}</td>
          <td>{{ gamer.elapsedTime }}</td>
          <td>{{ gamer.result[0] }} / {{ gamer.result[1] }}</td>
          <td>{{ gamer.highscore }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "HighscoreView",
  data() {
    return {
      toggleHighscoreDetails: 5,
      highscoreData: [],
      filteredHighscoreData: [],
      gamer: [
        {
          id: "9b2e970b-307a-4754-a35e-4e16ecc8d65b",
          name: "JohnDoe",
          amountOfQuestions: 5,
          elapsedTime: 500,
          passedRatio: "100%",
          result: [3, 5],
        },
      ],
    };
  },
  methods: {
    toggleHighscoreType(n) {
      this.toggleHighscoreDetails = n;
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
      //sort highscore values
      const sortScore = this.highscoreData
        .map((gamer) => {
          return gamer.highscore;
        })
        .sort((a, b) => b - a);
      //push gamer data in the right order
      sortScore.forEach((score) => {
        this.filteredHighscoreData.push(
          this.highscoreData.filter((gamer) => {
            return gamer.highscore === score;
          })[0]
        );
      });
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
  },
};
</script>

<style>
.highscore-wrapper {
  display: grid;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 1rem;
  padding-inline: 1rem;
}

.highscore-type_wrapper {
  display: flex;
  justify-content: space-around;
}

.highscore-type {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 1rem;
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
  padding: 1rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
}
</style>
