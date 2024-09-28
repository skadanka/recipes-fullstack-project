<template>
  <div class="container">
    <RecipeCreationModal v-if="false"></RecipeCreationModal>

    <h1 class="title">Private</h1>
    <!-- <SearchBar   title="Search" class="SearchBar center"></SearchBar>  
      Add later after understanding how to share component or pass params to the same componenet to handle search page rerouting-->
      <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to vue this</router-link>
      <!-- {{ !$root.store.username }} -->
    <div class="recipes">
      <RecipePreviewList title="Recipes" :recipes="privateRecipes" :key="randomKey"/>
    </div>

    <!-- <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div>-->
  </div>
  
</template>


<script>
import RecipePreviewList from "../components/RecipePreviewList";

export default {
  components: {
    RecipePreviewList,
  },
  props: {

  }, 
  data() {
    return {
      randomKey: 0,
      privateRecipes: []
    }
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {

      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/users/created-recipes",
          // "https://test-for-3-2.herokuapp.com/recipes/random"
        );

        // console.log(response);
        const recipes = response.data.recipes;
        console.log(response.data);
        this.privateRecipes = [];
        this.privateRecipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>

.recipes {
  display: flex;
  flex-direction: column;
  gap: 100px;
}
.RandomRecipes {
  margin: 10px 0 10px;
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
