<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'main' }">Vue Recipes</router-link>
      <router-link :to="{ name: 'search' }">Search</router-link>
      {{ !$root.store.username }}
      <span id="user-routes" v-if="!$root.store.username">
        Guest:
        <router-link :to="{ name: 'register' }">Register</router-link>
        <router-link :to="{ name: 'login' }">Login</router-link>
      </span>
      <span v-else>
        {{ $root.store.username }}: <button @click="Logout">Logout</button>
      </span>
    </div>

    <router-view />
  </div>
</template>

<script>


export default {
  name: "App",
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  background-color:#2B3467;
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
}

#nav a {
  font-weight: bold;
  color: #FCFFE7;

}

#nav #user-routes {
  display: inline-block;
  
}

#nav #user-routes * {
  padding-left: 10px;
}

#nav a.router-link-exact-active {
  color: #EB455F;
}
</style>
