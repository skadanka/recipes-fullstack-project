<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <SearchBar  @searchButtonClick="$router.push('search')" ></SearchBar>
    <Login v-if="!$root.store.username"></Login>
    <!-- <SearchBar   title="Search" class="SearchBar center"></SearchBar>  
      Add later after understanding how to share component or pass params to the same componenet to handle search page rerouting-->
    <RecipePreviewList title="Explore" class="RandomRecipes center" :recipes="randomRecipes" :key="randomKey"/>
    <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to vue this</router-link>
    {{ !$root.store.username }}
    <RecipePreviewList v-if="this.$root.store.username"
      title="Last Viewed Recipes"
      :recipes="randomRecipes"
      :key="randomKey + 100"
      :class="{
        RandomRecipes: true,
        blur: !$root.store.username,
        center: true,
      }"
      disabled
    ></RecipePreviewList>
    <!-- <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div>-->
  </div>
</template>


<script>
import RecipePreviewList from "../components/RecipePreviewList";
import SearchBar from "../components/SearchBar";
import Login from "../components/Login.vue";
export default {
  components: {
    RecipePreviewList,
    Login,
    SearchBar 
  },
  props: {

  }, 
  data() {
    return {
      randomKey: 0,
      randomRecipes: []
    }
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/recipes/random",
          // "https://test-for-3-2.herokuapp.com/recipes/random"
        );

        // console.log(response);
        const recipes = response.data.recipes;
        this.randomRecipes = [];
        this.randomRecipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
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
