<template>
  <login-modal v-if="isModalVisible" @closeModal="closeModal" />
  <header class="entry-header">
    <p class="admin" @click="showModal">Admin</p>
  </header>
  <main>
    <h1>Time for a Quiz</h1>
    <p>please select</p>
    <form>
      <div class="entry-questions">
        <radio-select
          id="selectedNumberOfQuestions"
          question="How many Questions?"
          :selections="numberOfQuestions"
          @emitSelected="handleSelected"
        />
        <radio-select
          id="selectedTopic"
          question="Which topic?"
          :selections="topicOfQuestions"
          @emitSelected="handleSelected"
        />
      </div>
      <button class="play-btn" @click.prevent="startGame">Play</button>
    </form>
  </main>
</template>

<script>
import RadioSelect from "@/components/RadioSelect.vue";
import LoginModal from "@/components/LoginModal.vue";
import { useQuizStore } from "@/stores/quizStore.js";

export default {
  name: "EntryView",
  components: {
    RadioSelect,
    LoginModal,
  },
  setup() {
    const store = useQuizStore();
    return { store };
  },
  data() {
    return {
      selectedNumberOfQuestions: 5,
      numberOfQuestions: [
        { title: 5, id: 5, checked: true },
        { title: 10, id: 10, checked: false },
        { title: 15, id: 15, checked: false },
        { title: 20, id: 20, checked: false },
      ],
      selectedTopic: "c76668d0-ce3a-48a7-acd5-0f54ad6818e1",
      topicOfQuestions: [
        {
          title: "HTML and CSS",
          id: "c76668d0-ce3a-48a7-acd5-0f54ad6818e1",
          checked: true,
        },
        {
          title: "Javascript",
          id: "9d5ae045-ef9a-4068-bc6c-1b102bda5f55",
          checked: false,
        },
        { title: "All", id: "all", checked: false },
      ],
      isModalVisible: false,
    };
  },
  computed: {
    url() {
      let url = "";
      if (this.selectedTopic === "all") {
        url = this.store.url + "quiz/collection?";
      } else {
        url =
          this.store.url + "quiz/collection?group=" + this.selectedTopic + "&";
      }
      return url + "limit=" + this.selectedNumberOfQuestions + "&random=1";
    },
  },
  methods: {
    handleSelected(id, selection) {
      this[id] = selection;
    },
    startGame() {
      this.store.givenAnswers = {
        data: [],
        elapsedTime: 0,
      };
      this.store.highscoreID = "";
      this.store.passedUrl = this.url;
      this.$router.push({
        name: "gamePage",
      });
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>

<style>
h1 {
  margin-top: 1rem;
}

p {
  color: rgb(227, 181, 5);
}
.admin {
  text-align: right;
  font-size: 0.7rem;
  cursor: pointer;
}

.admin:hover {
  color: rgb(227, 181, 5);
}

.entry-header {
  padding: 0.5rem 1rem;
}

.entry-questions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

@media screen and (min-width: 900px) {
  .entry-questions {
    flex-direction: row;
    justify-content: space-around;
  }
}

@keyframes callToButton {
  0% {
    outline: none;
  }
  50% {
    outline: 1rem solid rgb(17, 161, 26, 0.3);
  }
  80% {
    outline: none;
  }
}
.play-btn {
  background-color: rgb(17, 161, 26);
  border: none;
  border-radius: 2rem;
  padding: 1rem 3rem;
  transition: scale 0.2s ease-out;
  animation: callToButton 5s infinite;
  margin: 1rem;
}

@media screen and (min-width: 450px) {
  .play-btn {
    margin-top: 2rem;
  }
}
@media screen and (min-width: 900px) {
  .play-btn {
    margin-top: 7rem;
  }
}

.play-btn:hover {
  scale: 1.1;
}
</style>
