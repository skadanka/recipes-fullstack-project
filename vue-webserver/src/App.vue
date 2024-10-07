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
@import './variables.scss'; // Import the color palette

/* Font import */
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');

/* General App Style */
html, body {
  font-family: "Lato", sans-serif;
  font-size: 16px;
  background-color: $background-color;
  color: $text-color;
  min-height: 100vh;
  margin: 0;
}

#app {
  font-family: "Lato", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: $background-color;
  min-height: 100vh;
}

/* Navbar Styling */
#nav {
  background-color: $card-background;
  color: $text-color;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid $divider-color;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
}

#main-navs {
  display: flex;
  gap: 20px;
  align-items: center;
}

#main-navs a {
  font-weight: 600;
  color: $primary-color;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: $primary-hover;
    color: $card-background;
  }
}

#user-actions-navs {
  display: flex;
  align-items: center;
  gap: 20px;
}

#user-actions-navs #createButton {
  background-color: $primary-color;
  color: $card-background;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: $primary-hover;
    transform: translateY(-3px);
  }
}

#user-actions-navs b-dropdown {
  background-color: transparent;
  color: $text-color;
}

#user-routes {
  display: inline-block;
}

#user-routes a {
  font-weight: 600;
  color: $primary-color;
  padding: 5px 10px;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: $primary-hover;
  }
}

#user-routes button {
  background-color: transparent;
  border: none;
  font-weight: 600;
  color: $secondary-color;
  cursor: pointer;
  padding: 5px 10px;
  transition: color 0.3s ease;

  &:hover {
    color: $primary-hover;
  }
}

/* Dropdown Menu Styling */
#dropdown-personal {
  color: $primary-color;

  .dropdown-item {
    padding: 10px;
    color: $text-color;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: $divider-color;
    }

    a {
      color: $primary-color;
      text-decoration: none;

      &:hover {
        color: $primary-hover;
      }
    }
  }
}

#nav a.router-link-exact-active {
  color: $primary-color;
}

/* Responsive Design for Smaller Screens */
@media (max-width: 768px) {
  #main-navs, #user-actions-navs {
    flex-direction: column;
    gap: 10px;
  }

  #nav {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
