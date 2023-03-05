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
        <tr v-for="gamer of gamer" :key="gamer.id">
          <td>1.</td>
          <td>{{ gamer.name }}</td>
          <td>{{ gamer.elapsedTime }}</td>
          <td>{{ gamer.result[0] }} / {{ gamer.result[1] }}</td>
          <td>{{ gamer.passedRatio }}</td>
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
      gamer: [
        {
          id: "9b2e970b-307a-4754-a35e-4e16ecc8d65b",
          name: "JohnDoe",
          amountOfQuestions: 5,
          elapsedTime: 122,
          passedRatio: "60%",
          result: [3, 5],
        },
      ],
    };
  },
  methods: {
    toggleHighscoreType(n) {
      this.toggleHighscoreDetails = n;
    },
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
