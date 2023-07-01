<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <SearchBar title="Search" class="SearchBar center" @searchButtonClick="updateRecipes"></SearchBar>
    <button @click="updateRecipes">Update</button>
    <div :v-if="recipes.length" class="search-results">
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
        if(sessionStorage.search){
          this.recipes = [];
          this.recipes.push(...JSON.parse(sessionStorage.getItem("search")));
          console.log("here");
          return;
        }
        try {
          var response;
          if(!this.$root.store.username){
                response = await this.axios.get(
                    this.$root.store.server_domain + "/recipes/search",
                    {
                        params: this.$root.store.search_params  
                    }
                );
              }
          else {
             response = await this.axios.get(
                    this.$root.store.server_domain + "/users/recipes/search",
                    {
                      params: this.$root.store.search_params  
                    }
                );
          }

            console.log(response.data);
            const recipes = response.data.recipes;
            this.recipes = [];
            this.recipes.push(...recipes);
            sessionStorage.setItem("search", JSON.stringify(this.recipes));
            this.searchKey += 1
        } catch (error) {
            console.log(error);
        }
    }
  }

}
</script>

<style> 
.search-results {
  height: auto;
  border: 1px solid red;
}
</style>