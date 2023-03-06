<template>
  <header>
    <a class="back" @click="backToAdmin">back</a> |
    <a class="admin" @click="logout">Logout</a>
  </header>
  <main>
    <h2>Edit Question</h2>
    <p>{{ questionData.question }}</p>
    <section class="edit-fields">
      <table>
        <thead>
          <tr>
            <th>Property</th>
            <th colspan="2">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Question Id</th>
            <td colspan="2" class="answer-id">{{ questionData.id }}</td>
          </tr>
          <tr>
            <th>Question Title</th>
            <td colspan="2">
              <textarea
                type="text"
                name="question-title"
                id="question-title"
                v-model="questionTitle"
              />
            </td>
          </tr>
          <tr v-for="(answer, index) of questionData.answers" :key="answer.id">
            <th>Answer {{ index + 1 }}</th>
            <td>
              <textarea
                type="text"
                name="question-title"
                id="question-title"
                v-model="answer.text"
              />
            </td>
            <td class="valid-answer">
              <input
                type="checkbox"
                name="valid-answer"
                id="valid-answer"
                v-model="answer.isValid"
              />
            </td>
          </tr>
          <tr v-for="test of 4 - questionData.answers.length" :key="test">
            <th>Answer {{ 5 - test }}</th>
            <td>
              <textarea type="text" name="question-title" id="question-title" />
            </td>
            <td class="valid-answer">
              <input type="checkbox" name="valid-answer" id="valid-answer" />
            </td>
          </tr>
        </tbody>
      </table>
    </section>
    <button class="update-btn">Update Question</button>
  </main>
</template>
<script>
import { useQuizStore } from "@/stores/quizStore.js";

export default {
  name: "EditQuestionView",
  props: {
    questionId: String,
  },
  setup() {
    const store = useQuizStore();
    return { store };
  },
  data() {
    return {
      questionData: {},
      newAnswers: [],
      dataChanged: false,
    };
  },
  computed: {
    questionTitle() {
      return this.questionData.question;
    },
  },
  methods: {
    backToAdmin() {
      //if (this.dataChanged) return false;
      this.$router.push({ name: "adminPage" });
    },
    logout() {
      this.$router.push({ name: "entryPage" });
    },
  },
  async created() {
    const response = await fetch(
      this.store.url + "questions/" + this.questionId
    );
    this.questionData = await response.json();
    this.newAnswers = this.questionData.answers;
    /*
    do {
      this.newAnswers.push("");
    } while (this.newAnswers.length !== 4);
    */
  },
  /*
  watch: {
    newAnswers(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.dataChanged = true;
      }
    },
  },
  */
};
</script>

<style scoped>
header {
  padding: 0.5rem 1rem;
  text-align: right;
}
.back {
  text-align: right;
  font-size: 0.7rem;
  cursor: pointer;
}
.back:hover {
  color: rgb(227, 181, 5);
}

main {
  display: grid;
  place-items: center;
}

.edit-fields {
  width: 80%;
}

table {
  margin-top: 2rem;
  width: 100%;
}

table,
tr {
  border: 1px solid rgb(60, 60, 60);
  border-collapse: collapse;
  background-color: rgba(0, 0, 0, 0.3);
}
th,
td {
  padding: 1rem 0.6rem;
}

thead th {
  color: rgb(227, 181, 5);
  font-weight: normal;
}

td,
tbody th {
  font-size: 0.7rem;
}

.answer-id {
  text-align: left;
}

textarea {
  resize: none;
}

input,
textarea,
select {
  min-width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  border: none;
  border-radius: 1rem;
  padding: 1rem;
  font-size: 0.7rem;
  outline: none;
}

input:focus,
textarea:focus,
select:focus {
  outline: 1px solid rgb(150, 150, 150);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.update-btn {
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

.update-btn:hover {
  scale: 1.1;
}

.update-btn:hover:disabled {
  scale: 1;
}

.update-btn:disabled {
  background-color: rgb(17, 161, 26, 0.7);
  cursor: default;
}
</style>
