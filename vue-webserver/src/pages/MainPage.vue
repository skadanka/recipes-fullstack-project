<template>
  <div class="container">
    <RecipeCreationModal v-if="false"></RecipeCreationModal>

    <h1 class="title">Main Page</h1>
  
    <!-- <SearchBar  @searchButtonClick="$router.push('search')" ></SearchBar>
    <Login v-if="!$root.store.username"></Login> -->
    <!-- <SearchBar   title="Search" class="SearchBar center"></SearchBar>  
      Add later after understanding how to share component or pass params to the same componenet to handle search page rerouting-->
      <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to vue this</router-link>
    <div>
      <b-button class="button-main" @click="updateRandomRecipes" variant="primary" size="large" >Get New Recipes</b-button>
    </div>
      <!-- {{ !$root.store.username }} -->
    <div class="recipes">
      <div>
          <RecipePreviewList 
          title="Explore" 
          class="RandomRecipes center" 
          :recipes="randomRecipes" 
          :key="randomKey"></RecipePreviewList>
        </div>
      </div>
      <div >
        <div class="recipes">
          <RecipePreviewList 
            title="Last Viewed Recipes"
            :recipes="recentRecipes"
            :key="randomKey + 100"
            :class="{
              RandomRecipes: true,
              blur: !$root.store.username,
              center: true,
            }"
            disabled
          ></RecipePreviewList>
        </div>
      </div>

    <!-- <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div>-->
  </div>
  
</template>


<script>
import Login from '../components/Login.vue';
import RecipePreviewList from "../components/RecipePreviewList";
import SearchBar from "../components/SearchBar";
import RecipeCreationModal from '../components/RecipeCreationModal.vue';

export default {
  components: {
    RecipePreviewList,
    // Login,
    // SearchBar,
    RecipeCreationModal 
  },
  props: {

  }, 
  data() {
    return {
      randomKey: 0,
      randomRecipes: [],
      recentRecipes: []
    }
  },
  mounted() {
    this.updateRandomRecipesOnMount();
    this.updateRecentRecipes();
  },
 methods: {
  async updateRandomRecipes() {
    try {
      let response;
      if (this.$root.store.username) {
        // Logged-in user: fetch user-specific random recipes
        response = await this.axios.get(
          this.$root.store.server_domain + "/users/random-recipes"
        );
      } else {
        // Guest: fetch general random recipes
        response = await this.axios.get(
          this.$root.store.server_domain + "/recipes/random"
        );
      }

      // Handle response and update random recipes
      const recipes = response.data.recipes;
      this.randomRecipes = [];
      this.randomRecipes.push(...recipes);

      // Save recipes to session storage
      sessionStorage.setItem("recipes", JSON.stringify(this.randomRecipes));

    } catch (error) {
      console.log(error);
    }
  },

  async updateRandomRecipesOnMount() {
    if (sessionStorage.recipes) {
      this.randomRecipes = [];
      this.randomRecipes.push(...JSON.parse(sessionStorage.getItem("recipes")));
      return;
    }
    this.updateRandomRecipes();  // Fetch new recipes if none are in sessionStorage
  },

  async updateRecentRecipes() {
    if (this.$root.store.username) {
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/users/recent-recipes"
        );
        const recipes = response.data.recipes;
        this.recentRecipes = [];
        this.recentRecipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    }
  }

  }
};
</script>

<style lang="scss" scoped>

/* Main Container */
.container {
  display: grid;
  grid-gap: 1.5rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background-color: $background-color; /* Soft neutral background */
}

/* Title Style */
.title {
  font-size: 2.5rem;
  font-weight: 700;
  color: $primary-color;
  margin-bottom: 1.5rem;
  text-align: center;
}

/* Recipe Button */
.button-main {
  display: inline-block;
  background-color: $primary-color;
  color: $card-background; /* White text for contrast */
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 8px;
  transition: background-color 0.3s ease, transform 0.3s ease;
  cursor: pointer;
  text-align: center;
  margin: 0 auto;
  
  &:hover {
    background-color: $primary-hover; /* Slightly lighter on hover */
    transform: translateY(-3px); /* Subtle hover effect */
  }
}

/* Recipes Section */
.recipes {
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  margin-top: 2rem;
}

/* Blur Effect for Disabled Recipes */
.blur {
  filter: blur(3px);
}

::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}

/* Link for Login Required */
router-link {
  display: block;
  text-align: center;
  font-weight: 600;
  color: $secondary-color; /* Coral for link */
  text-decoration: none;
  padding: 10px;
  margin: 20px auto;
  background-color: $card-background;
  border: 1px solid $primary-color;
  border-radius: 8px;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: $primary-color;
    color: $card-background; /* Invert colors on hover */
  }
}

/* Responsive Design for Smaller Screens */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
    grid-gap: 1rem;
  }

  .title {
    font-size: 2rem;
  }

  .button-main {
    font-size: 1rem;
    padding: 8px 16px;
  }

  .recipes {
    row-gap: 1.5rem;
  }
}

</style>
