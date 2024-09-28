<template>
  <div class="container">
    <h1 class="title">About</h1>

    <div :v-if="recipes.length" class="search-results">
      <RecipePreviewSearchList title="Projects:" class="center" :recipes="recipes" :key="searchKey"/>
    </div>
   
  </div>
</template>

<script>
import RecipePreviewSearchList from "../components/RecipePreviewSearchList.vue";
import recipes from "../assets/about/recipes";


export default {  

  components: {
    RecipePreviewSearchList
  },
  data() {
    return {
      recipes: [],
      searchKey: 0,
      recentSearch: null
    }
  },
  mounted() {
    this.recipes.push(...recipes);
  },
  methods: {
    async getAboutRecipes() {

    }
  }

}
</script>

<style> 
.search-results {
  height: auto;
}
</style>