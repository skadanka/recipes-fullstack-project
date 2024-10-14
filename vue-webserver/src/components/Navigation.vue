<template>
    <nav class="navbar">
      <div class="nav-left">
        <!-- Main Navigation Links -->
        <router-link to="/" class="nav-item">Home</router-link>
        <router-link to="/search" class="nav-item">Search</router-link>
        <router-link to="/about" class="nav-item">About</router-link>
      </div>
  
      <div class="nav-right">
        <!-- If the user is authenticated, show user-specific actions -->
        <div v-if="isAuthenticated">
          <b-dropdown id="dropdown-user" text="Personal" class="m-md-2">
            <b-dropdown-item>
              <router-link to="/favorites">Favorites</router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link to="/private-recipes">Private Recipes</router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link to="/family">Family Recipes</router-link>
            </b-dropdown-item>
          </b-dropdown>
          <b-button id="createButton" @click="showCreateModal" class="m-md-2">Create Recipe</b-button>
          <b-button variant="danger" @click="logout">Logout</b-button>
        </div>
        <!-- If the user is not authenticated, show login/register links -->
        <div v-else>
          <router-link to="/login" class="nav-item">Login</router-link>
          <router-link to="/register" class="nav-item">Register</router-link>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: "Navigation",
    data() {
      return {
        isAuthenticated: false, // Assume we track auth status via state or props
      };
    },
    methods: {
      showCreateModal() {
        this.$emit("showModal");
      },
      logout() {
        // Call logout functionality here
        this.$root.store.logout();
        this.$router.push("/login");
      },
    },
    mounted() {
      // Update authentication status
      this.isAuthenticated = this.$root.store.username ? true : false;
    },
  };
  </script>
  
<style scoped lang="scss">
    .navbar {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    position: sticky;
    position: -webkit-sticky;
    top: 0; /* required */
    padding: 1rem;
    background-color: $primary-color;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1;
    }

    .nav-left {
    display: flex;
    gap: 1rem;
    }

    .nav-right {
    display: flex;
    align-items: center;
    gap: 1rem;
    }

    .nav-item {
    color: #fff;
    font-weight: bold;
    text-decoration: none;
    padding: 0.5rem;
    transition: background-color 0.3s ease;
    }

    .nav-item:hover {
    background-color: $secondary-color;
    border-radius: 4px;
    }

    #createButton {
    background-color: $primary-hover;
    }

</style>
  