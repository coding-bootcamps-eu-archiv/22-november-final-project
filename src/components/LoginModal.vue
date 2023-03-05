<template>
  <div class="modal">
    <div class="login">
      <p class="close" @click="$emit('closeModal')">x</p>
      <h3>Login</h3>
      <form class="login__login-form">
        <input
          type="text"
          id="user-name"
          placeholder="Username"
          v-model="username"
        />
        <p class="error-message" v-if="username === '' && isError">
          {{ errorMessage }}
        </p>
        <input
          type="password"
          id="password"
          placeholder="Password"
          v-model="password"
        />
        <p
          class="error-message"
          v-if="errorMessage === 'Sorry, wrong password'"
        >
          {{ errorMessage }}
        </p>
        <button @click.prevent="openAdmin">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginModal",
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
      isError: false,
    };
  },
  methods: {
    showErrorMessage(error) {
      if (error === "emptyUsername") {
        this.isError = true;
        this.errorMessage = "Please enter a username";
      }
      if (error === "wrongPassword") {
        this.isError = true;
        this.errorMessage = "Sorry, wrong password";
      }
    },
    openAdmin() {
      if (this.username === "") {
        this.isError = true;
        this.showErrorMessage("emptyUsername");
        return false;
      }
      if (this.password === "cbe-November-2022") {
        this.isError = false;
        this.$router.push({
          name: "adminPage",
          params: {
            user: this.username,
          },
        });
      } else this.showErrorMessage("wrongPassword");
    },
  },
};
</script>

<style scoped>
.modal {
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  display: grid;
  place-items: center;
  padding-inline: 1.5rem;
}

h3 {
  color: rgb(227, 181, 5);
}

input {
  all: unset;
  display: inline-block;
  border-radius: 0.5rem;
  border: none;
  background-color: white;
  padding: 0.5rem;
  color: black;
  text-align: left;
  width: 100%;
}

button {
  all: unset;
  margin-top: 2rem !important;
  padding: 1rem;
  background-color: rgb(227, 181, 5);
  border-radius: 2rem;
  cursor: pointer;
  transition: scale 0.2s ease-out;
}

button:hover {
  scale: 1.1;
}
.login {
  position: relative;
  width: 100%;
  aspect-ratio: 2/1;
  padding: 2rem;

  background-color: rgba(0, 139, 139, 0.98);
  border-radius: 1rem;
}

.close {
  margin: 0;
  display: inline-block;
  position: absolute;
  right: 20px;
  top: 20px;
  color: white;
  cursor: pointer;
}

.close:hover {
  color: rgb(227, 181, 5);
}

.login__login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login__login-form * ~ * {
  margin-top: 1rem;
}

@media screen and (min-width: 635px) {
  .login {
    max-width: 80%;
  }

  .login__login-form label {
    text-align: left;
  }
}

@media screen and (min-width: 900px) {
  .login {
    max-width: 60%;
  }
}
</style>
