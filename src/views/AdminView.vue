<template>
  <header>
    <a class="admin" @click="logout">Logout</a>
  </header>
  <main>
    <h2>Admin Panel</h2>
    <table>
      <thead>
        <tr>
          <th>Topic</th>
          <th colspan="4">Question</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <select
              name="add-new__group-name"
              id="add-new__group-name"
              v-model="selectedGroup"
            >
              <option disabled value="">Please Select</option>
              <option
                v-for="(group, index) of groups"
                :key="index"
                :value="group.id"
              >
                {{ group.title }}
              </option>
            </select>
          </td>
          <td>
            <input
              type="text"
              name="add-new__question"
              id="add-new__question"
              placeholder="type your question"
              v-model="newQuestion"
            />
          </td>
          <td colspan="2">
            <button
              class="add-new"
              @click="addNewQuestion"
              :disabled="disabledAddButton"
            >
              Add New Question
            </button>
          </td>
        </tr>
        <tr v-for="question of loadQuestionsActive" :key="question.id">
          <td>{{ getGroupName(question.groupId) }}</td>
          <td>{{ question.question }}</td>
          <td>
            <button class="edit" @click="editQuestion(question.id)">
              <font-awesome-icon
                icon="fa-solid fa-pen"
                size="xs"
                class="icon"
              />
            </button>
          </td>
          <td>
            <button class="delete" @click="deleteQuestion(question.id)">
              <font-awesome-icon
                icon="fa-solid fa-trash-can"
                size="xs"
                class="icon"
              />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
  <div>
    <button
      class="questionNav"
      @click="displaySetOfQuestions(-15)"
      v-show="smallCounter !== 0"
    >
      &lt;
    </button>
    <button
      class="questionNav"
      @click="displaySetOfQuestions(15)"
      v-show="bigCounter < allQuestions.length"
    >
      &gt;
    </button>
  </div>
</template>
<script>
import { useQuizStore } from "@/stores/quizStore.js";

export default {
  name: "AdminView",
  setup() {
    const store = useQuizStore();
    return { store };
  },
  data() {
    return {
      allQuestions: [],
      groups: [],
      selectedGroup: "",
      newQuestion: "",
      //newSetOfQuestions: {},
      smallCounter: 0,
      bigCounter: 15,
    };
  },
  async created() {
    const data = await fetch(this.store.url + "questions");
    this.allQuestions = await data.json();

    const groupData = await fetch(this.store.url + "groups");
    this.groups = await groupData.json();
  },
  computed: {
    newQuestionObject() {
      return {
        groupId: this.selectedGroup,
        isActive: true,
        question: this.newQuestion,
        answers: [
          {
            id: 1,
            text: "",
            isValid: false,
          },
        ],
      };
    },
    disabledAddButton() {
      return this.selectedGroup === "" || this.newQuestion === ""
        ? true
        : false;
    },
    loadQuestionsActive() {
      return this.allQuestions.slice(this.smallCounter, this.bigCounter);
    },
  },
  methods: {
    logout() {
      this.$router.push({ name: "entryPage" });
    },
    getGroupName(groupId) {
      const group = this.groups.find((el) => el.id === groupId);
      return group?.title ?? "";
    },
    async addNewQuestion() {
      const response = await fetch(this.store.url + "questions", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(this.newQuestionObject),
      });
      const questionData = await response.json();
      this.allQuestions.push(questionData);
      this.selectedGroup = "";
      this.newQuestion = "";
      this.$router.push({
        name: "editQuestionPage",
        params: {
          questionId: questionData.id,
        },
      });
    },
    async deleteQuestion(questionId) {
      await fetch(this.store.url + "questions/" + questionId, {
        method: "DELETE",
      });
      const index = this.allQuestions.findIndex((el) => el.id === questionId);
      this.allQuestions.splice(index, 1);
    },
    editQuestion(questionId) {
      this.$router.push({
        name: "editQuestionPage",
        params: {
          questionId: questionId,
        },
      });
    },
    displaySetOfQuestions(n) {
      this.smallCounter += n;
      this.bigCounter += n;
    },
  },
};
</script>

<style scoped>
header {
  text-align: right;
  padding: 0.5rem 1rem;
}

main {
  display: grid;
  place-items: center;
}
table {
  margin-top: 2rem;
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

th {
  color: rgb(227, 181, 5);
  font-weight: normal;
}

td {
  font-size: 0.7rem;
}

button {
  all: unset;
  padding: 0.5rem 0.7rem;
  border-radius: 2rem;
  transition: background 0.5s;
  cursor: pointer;
}

button[disabled] {
  cursor: default;
  background-color: rgba(0, 0, 0, 0.3);
}

button[disabled]:hover {
  background-color: rgba(0, 0, 0, 0.3);
}

input,
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
select:focus {
  outline: 1px solid rgb(150, 150, 150);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}
.admin {
  text-align: right;
  font-size: 0.7rem;
  cursor: pointer;
}

.admin:hover {
  color: rgb(227, 181, 5);
}
.edit {
  background-color: rgb(227, 181, 5);
}

.edit:hover {
  background-color: rgb(151, 121, 0);
}

.delete {
  background-color: rgb(227, 5, 83);
}

.delete:hover {
  background-color: rgb(93, 3, 35);
}

.add-new {
  background-color: rgb(17, 161, 26);
}

.add-new:hover {
  background-color: rgb(11, 95, 16);
}
.questionNav {
  background-color: rgb(17, 161, 26);
  border: none;
  border-radius: 2rem;
  padding: 0.5rem 1rem;
  margin: 2rem;
  cursor: pointer;
  width: fit-content;
}
</style>
