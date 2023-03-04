<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
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

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: rgb(255, 255, 255, 0.3);
}

nav a.router-link-exact-active {
  color: rgb(17, 161, 26, 0.6);
}
</style>
