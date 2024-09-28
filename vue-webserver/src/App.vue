<template>
  <div id="app">
    <div id="nav">
      <div id="main-navs">
        <router-link :to="{ name: 'main' }">Vue Recipes</router-link>
        <router-link :to="{ name: 'search' }">Search</router-link>
        <router-link :to="{name: 'about'}">About</router-link>
      </div>
      <div id="user-actions-navs" v-if="$root.store.username">
        <b-dropdown id="dropdown-personal" text="Personal" class="m-md-2">
          <b-dropdown-item>
            <router-link :to="{ name: 'favorites'}">Favorites</router-link>
          </b-dropdown-item>
          <b-dropdown-item>
            <router-link :to="{ name: 'private-recipes'}">Private</router-link>
          </b-dropdown-item>
          <b-dropdown-item>
            <router-link :to="{ name: 'family'}">Family Recipes</router-link>
          </b-dropdown-item>
        </b-dropdown>
        <b-button id="createButton" @click="showModal()" class="m-md-2">Create</b-button>
      </div>
      <!-- {{ !$root.store.username }} -->
      <div id="login-navs">
      <span id="user-routes" v-if="!$root.store.username">
        hello guest
        <router-link :to="{ name: 'register' }">Register</router-link>
        <router-link :to="{ name: 'login' }">Login</router-link>
      </span>
      <span v-else>
        {{ $root.store.username }}: <button @click="Logout">Logout</button>
      </span>
    </div>
    </div>
    <RecipeCreationModal ref="creation"></RecipeCreationModal>
    <router-view />
  </div>
</template>

<script>

import RecipeCreationModal from './components/RecipeCreationModal.vue';
export default {
  name: "App",
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
    showModal() {
      this.$refs.creation.$refs.creationModal.toggle();
    }
  },
  components: {
    RecipeCreationModal
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');

html, body {
  font-family: 'Roboto', sans-serif;
}

#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  background-color:#e8e9f0;
  padding-bottom: 10px;
  // display: flex;
  // justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
}

#nav * {
  // color: #FCFFE7;
  font-weight: bold;
  justify-content: left;
  padding-left: 5px;
  padding-right: 5px;
  margin-top: 5px;
}

#nav * * {
  min-width: max-content;
}
#main-navs {
  display: flex;
  gap: 15px;
}

#nav #createButton {
  cursor: pointer;
  translate: 0% 8%;
}

#nav a {
  font-weight: bold;
  // color: #FCFFE7;
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
