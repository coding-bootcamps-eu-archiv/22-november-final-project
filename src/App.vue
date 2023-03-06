<template>
  <button
    class="burger"
    @click="toggleLinks = !toggleLinks"
    :class="{ 'burger-active': toggleLinks }"
  ></button>
  <Transition>
    <nav v-show="toggleLinks" class="burger-links">
      <router-link :to="{ name: 'entryPage' }" @click="toggleLinks = false"
        >New game</router-link
      >
      <router-link
        v-show="store.givenAnswers.elapsedTime !== 0"
        :to="{ name: 'resultPage' }"
        @click="toggleLinks = false"
      >
        your Result</router-link
      >
      <router-link :to="{ name: 'highscorePage' }" @click="toggleLinks = false"
        >Highscore</router-link
      >
    </nav>
  </Transition>
  <Transition>
    <div class="burger-active_open" v-show="toggleLinks"></div>
  </Transition>
  <router-view @click="toggleLinks = false" />
</template>

<script>
import { useQuizStore } from "@/stores/quizStore.js";
export default {
  name: "App",
  setup() {
    const store = useQuizStore();
    return { store };
  },
  data() {
    return {
      toggleLinks: false,
    };
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 1.2rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: white;
}
body {
  max-height: 100vh;
  background: rgb(4, 29, 41);

  background-image: radial-gradient(
      circle,
      rgba(4, 29, 41, 1) 4%,
      rgba(58, 130, 133, 0.6) 60%,
      #19042b 90%
    ),
    radial-gradient(white, rgba(255, 255, 255, 0.014) 2px, transparent 40px),
    radial-gradient(white, rgba(255, 255, 255, 0.059) 1px, transparent 30px),
    radial-gradient(white, rgba(255, 255, 255, 0.045) 2px, transparent 40px),
    radial-gradient(
      rgba(255, 255, 255, 0.683),
      rgba(255, 255, 255, 0.063) 2px,
      transparent 30px
    );
  background-size: 100vw 100vh, 550px 550px, 350px 350px, 250px 250px,
    150px 150px;
  background-position: 0 0, 40px 60px, 130px 270px, 70px 100px, 0px 100px;
  background-attachment: fixed;
}
#app {
  text-align: center;
}

button {
  cursor: pointer;
}

nav a {
  font-weight: bold;
  color: rgb(255, 255, 255);
  text-decoration: none;
  font-size: 2rem;
  transition: scale 0.3s ease-out, color 0.3s ease-in;
}

nav a:hover {
  scale: 1.1;
  color: rgb(187, 243, 191);
}

nav a.router-link-exact-active {
  text-shadow: 2px 5px 15px rgb(17, 161, 26), 2px 5px 5px rgb(17, 161, 26),
    2px 5px 10px rgb(17, 161, 26);
}

.burger {
  border: none;
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
  background-color: rgb(0, 0, 0, 0.3);
  border-radius: 0.5rem;
  position: absolute;
  top: 3%;
  left: 3%;
  z-index: 3;
}
.burger::before {
  font-size: 1.8rem;
  content: "\2630";
  color: rgba(255, 255, 255, 0.5);
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
}
.burger-active {
  background-color: rgb(255, 255, 255, 0.1);
}
.burger-active::before {
  content: "x";
}
@keyframes slide-in-left {
  0% {
    transform: translateX(-1000px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes slide-out-left {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-1000px);
    opacity: 0;
  }
}
.burger-active_open {
  width: 30rem;
  height: 120vh;
  background-color: rgb(0, 0, 0, 0.3);
  rotate: 10deg;
  backdrop-filter: blur(0.5rem);
  position: fixed;
  bottom: -3rem;
  left: -15rem;
  transform-origin: 100% 100%;
  z-index: 1;
}
.v-enter-active {
  animation: slide-in-left 0.5s ease-out both;
}
.v-leave-active {
  animation: slide-out-left 0.5s ease-in both;
}
.burger-links {
  height: 50vh;
  width: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  position: absolute;
  z-index: 2;
}
</style>
