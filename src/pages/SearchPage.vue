<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <SearchBar title="Search" class="SearchBar center" @searchButtonClick="updateRecipes"></SearchBar>

    <div :v-if="recipes.length">
      <RecipePreviewSearchList title="Search Results" class="center" :recipes="recipes" :key="searchKey"/>
    </div>

  </div>
</template>

<script>
import SearchBar from "../components/SearchBar";
import RecipePreviewSearchList from "../components/RecipePreviewSearchList.vue";
export default {

  components: {
    SearchBar,
    RecipePreviewSearchList
  },
  data() {
    return {
      recipes: [],
      searchKey: 0
    }
  },
  created() {
    if (this.$root.store.search_params){
      this.updateRecipes();
    }
  },
  methods: {
    updateRecipes: async function() {
        try {
            const response = await this.axios.get(
                this.$root.store.server_domain + "/recipes/search",
                {
                    query: this.$root.store.search_params  
                }
            );

            console.log(response.data);
            const recipes = response.data.recipes;
            this.recipes = [];
            this.recipes.push(...recipes);
            this.searchKey += 1
        } catch (error) {
            console.log(error);
        }
    }
  }

}
</script>

