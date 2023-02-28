<template>
  <div class="entry-questions_wrapper">
    <p>{{ question }}</p>
    <div class="radio-wrapper">
      <label v-for="option of selections" :key="option.id" :for="option.id">
        <input
          type="radio"
          :name="question"
          class="input-entry"
          :id="option.id"
          :checked="option.checked"
          @click="emitSelected"
        />
        <div class="questions_label">{{ option.title }}</div>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "RadioSelect",
  props: {
    id: String,
    question: String,
    selections: Object,
  },
  methods: {
    emitSelected(event) {
      const checkedId = event.target.id;
      this.$emit("emitSelected", this.id, checkedId);
    },
  },
};
</script>
<style>
.entry-questions_wrapper {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 1rem;
  padding: 1rem;
}

.radio-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media screen and (min-width: 450px) {
  .radio-wrapper {
    flex-direction: row;
    justify-content: center;
  }
}

.input-entry {
  display: none;
}

.input-entry:checked ~ .questions_label {
  box-shadow: inset 0 0 5px white, 0 0 10px white, 0 0 20px white;
}
.input-entry:hover ~ .questions_label {
  background-color: rgb(255, 255, 255, 0.3);
}
.questions_label {
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  transition: box-shadow 0.3s, background-color 0.3s;
}
</style>
