<template>
  <header>
    <h2>Admin Panel</h2>
  </header>
  <main>
    <table>
      <tr>
        <th>Topic</th>
        <th colspan="4">Question</th>
      </tr>
      <tr v-for="(q, index) of allQuestions.data" :key="index">
        <td>{{ q.groupName }}</td>
        <td>{{ q.question }}</td>
        <td>
          <font-awesome-icon icon="fa-solid fa-pen" size="xs" class="icon" />
        </td>
        <td>
          <font-awesome-icon
            icon="fa-solid fa-trash-can"
            size="xs"
            class="icon"
          />
        </td>
      </tr>
    </table>
    <div>
      <p><span>&lt;</span><span> &gt;</span></p>
    </div>
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
      allQuestions: {},
    };
  },

  async created() {
    const response = await fetch(
      "https://22-november.api.cbe.uber.space/quiz/collection?limit=10"
    );
    this.allQuestions = await response.json();
    console.log(this.allQuestions);
  },
};
</script>

<style scoped>
header {
  margin-bottom: 3rem;
}

main {
  display: grid;
  place-items: center;
}

table,
tr {
  border: 1px solid lightblue;
  border-collapse: collapse;
  background-color: rgba(255, 255, 255, 0.07);
}

th,
td {
  padding: 1rem;
}

th {
  color: rgb(227, 181, 5);
}

td {
  font-size: 0.7rem;
}

.icon {
  cursor: pointer;
}
</style>
