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

      <div class="navicon-wrapper">
        <a
          href="https://github.com/coding-bootcamps-eu/22-november-final-project"
          target="_blank"
        >
          <svg
            height="32"
            aria-hidden="true"
            viewBox="0 0 16 16"
            version="1.1"
            width="32"
            data-view-component="true"
            class="github-icon"
          >
            <path
              fill-rule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
            ></path>
          </svg>
        </a>

        <a href="https://www.coding-bootcamps.eu/" target="_blank"
          ><img
            class="bootcamp-icon"
            src="https://image.jimcdn.com/app/cms/image/transf/dimension=410x10000:format=png/path/s0bc1816f4b388266/image/i98b3ed93670617f3/version/1623772723/logo-pinker-kreis-mit-wei%C3%9Fem-zelt-in-der-mitte.png"
        /></a>
      </div>
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
  position: fixed;
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
  height: 100vh;
  width: 20rem;
  display: flex;
  flex-direction: column;
  padding-top: 8rem;
  gap: 2rem;
  position: fixed;
  top: 0;
  z-index: 2;
}

.bootcamp-icon,
.github-icon {
  width: 2rem;
  height: 2rem;
  opacity: 30%;
  transition: opacity 0.3s ease-out;
}
.bootcamp-icon:hover,
.github-icon:hover {
  opacity: 100%;
}

.github-icon {
  fill: white;
}

.navicon-wrapper {
  margin-top: auto;
  padding-bottom: 1rem;
  display: flex;
  justify-content: center;
  width: 80%;
  gap: 2rem;
}
</style>
