<template>
  <main>
    <h2 class="result-percentage">{{ progress }}</h2>
    <div class="result-bar">
      <div
        class="result-bar_current"
        :style="{
          '--progress-value': progress,
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
export default {
  name: "ResultView",
  data() {
    return {
      progress: "90%",
    };
  },
};
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
