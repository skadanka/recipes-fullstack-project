<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <SearchBar title="Search" class="SearchBar center" 
    @searchButtonClick="updateRecipes" 
    @sortRecipesPopulairtyClick="sortRecipesPopulairty"
    @sortRecipesReadyInMinutesClick="sortRecipesReadyInMinutes"
    ></SearchBar>
    <button @click="getRecentSearchResults" v-if="recentSearch">{{recentSearch}}</button>
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
      searchKey: 0,
      recentSearch: null
    }
  },
  created() {

  },
  methods: {
    getRecentSearchResults() {
      if(sessionStorage.search){
          this.recipes = [];
          this.recipes.push(...JSON.parse(sessionStorage.getItem("search")));
          return;
        }
    },
    updateRecipes: async function() {
      
        try {
          var response;
          this.getrecentSearch();
          console.log(this.recentSearch);
          if(!this.$root.store.username){
                response = await this.axios.get(
                    this.$root.store.server_domain + "/recipes/search",
                    {
                        params: this.recentSearch
                    }
                );
              }
          else {
             response = await this.axios.get(
                    this.$root.store.server_domain + "/users/recipes/search",
                    {
                      params: this.recentSearch  
                    }
                );
          }

            const recipes = response.data.recipes;
            this.recipes = [];
            this.recipes.push(...recipes);
            sessionStorage.setItem("search", JSON.stringify(this.recipes));
            this.searchKey += 1
        } catch (error) {
            console.log(error);
        }
    },
    sortRecipesReadyInMinutes() {
        this.recipes.sort((a, b) => {
          return a.Preview.readyInMinutes - b.Preview.readyInMinutes;
        })
      },
    sortRecipesPopulairty() {
      this.recipes.sort((a, b) => {
        return b.Preview.populairty - a.Preview.populairty;
      })
    },
    getrecentSearch(){
      this.recentSearch = JSON.parse(sessionStorage.searchParams);
    }
  },

  

}
</script>

<style> 
.search-results {
  height: auto;
}
</style>