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
                v-model="questionData.question"
              />
            </td>
          </tr>
          <tr v-for="answer of questionData.answers" :key="answer.id">
            <th>Answer {{ answer.id }}</th>
            <td>
              <textarea
                type="text"
                name="question-title"
                id="question-title"
                v-model="answer.text"
                placeholder="please enter an answer here"
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
          <tr v-if="questionData.answers.length < 4">
            <th class="add-answer">
              <button
                class="add-answer__add-btn"
                @click="addAnswer(questionData.answers.length + 1)"
              >
                +
              </button>
            </th>
            <td colspan="2"></td>
          </tr>
        </tbody>
      </table>
    </section>
    <button class="update-btn" @click="updateQuestion">Update Question</button>
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
      questionData: {
        answers: {
          id: 1,
          text: "",
          isValid: false,
        },
      },
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
      this.$router.push({ name: "adminPage" });
    },
    logout() {
      this.$router.push({ name: "entryPage" });
    },
    addAnswer(answerId) {
      this.questionData.answers.push({
        id: answerId,
        text: "",
        isValid: false,
      });
    },
    async updateQuestion() {
      const transferData = {
        groupId: this.questionData.groupId,
        isActive: this.questionData.isActive,
        question: this.questionData.question,
        answers: this.questionData.answers,
      };
      await fetch(this.store.url + "questions/" + this.questionData.id, {
        method: "DELETE",
      });
      await fetch(this.store.url + "questions", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(transferData),
      });
      this.$router.push({ name: "adminPage" });
    },
  },
  async created() {
    const response = await fetch(
      this.store.url + "questions/" + this.questionId
    );
    this.questionData = await response.json();
  },
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

.add-answer {
  padding: 0;
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

.add-new {
  background-color: rgb(17, 161, 26);
}

.add-new:hover {
  background-color: rgb(11, 95, 16);
}
.add-answer__add-btn {
  background-color: rgb(17, 161, 26);
  border: none;
  border-radius: 2rem;
  padding: 1rem 2rem;
  transition: scale 0.2s ease-out;
  cursor: pointer;
  width: fit-content;
  justify-self: center;
  scale: 0.6;
}

.update-btn {
  background-color: rgb(17, 161, 26);
  border: none;
  border-radius: 2rem;
  margin: 2rem;
  padding: 1rem 2rem;
  transition: scale 0.2s ease-out;
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
