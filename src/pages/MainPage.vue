<template>
  <div class="container">
    <RecipeCreationModal v-if="false"></RecipeCreationModal>

    <h1 class="title">Main Page</h1>
    <SearchBar  @searchButtonClick="$router.push('search')" ></SearchBar>
    <Login v-if="!$root.store.username"></Login>
    <!-- <SearchBar   title="Search" class="SearchBar center"></SearchBar>  
      Add later after understanding how to share component or pass params to the same componenet to handle search page rerouting-->
      <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to vue this</router-link>
      <!-- {{ !$root.store.username }} -->
    <div class="recipes">
      <div>
        <RecipePreviewList 
        title="Explore" 
        class="RandomRecipes center" 
        :recipes="randomRecipes" 
        :key="randomKey"/>
      </div>
      <div>
      <RecipePreviewList v-if="this.$root.store.username"
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
    Login,
    SearchBar,
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
    this.updateRandomRecipes();
    this.updateRecentRecipes();
  },
  methods: {
    async updateRandomRecipes() {
      if (sessionStorage.recipes) {
        this.randomRecipes = [];
        this.randomRecipes.push(...JSON.parse(sessionStorage.getItem("recipes")));
        return;
      }
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/recipes/random",
          // "https://test-for-3-2.herokuapp.com/recipes/random"
        );

        // console.log(response);
        const recipes = response.data.recipes;
        this.randomRecipes = [];
        this.randomRecipes.push(...recipes);
        sessionStorage.setItem("recipes", JSON.stringify(this.randomRecipes));
      } catch (error) {
        console.log(error);
      }
    },
    async updateRecentRecipes() {
      if(this.$root.store.username){
        try {
          const response = await this.axios.get(
            this.$root.store.server_domain + "/users/recent-recipes",
            // "https://test-for-3-2.herokuapp.com/recipes/random"
          );

          // console.log(response);
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

.recipes {
  display: flex;
  flex-direction: column;
}

.recipes * {
  height: 45rem;
}

.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
