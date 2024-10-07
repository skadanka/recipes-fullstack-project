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

<style lang="scss" scoped>

/* Main Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  gap: 2rem;
  background-color: $background-color;
}

/* Title Styling */
.title {
  font-size: 2.5rem;
  font-weight: 600;
  color: $primary-color;
  text-align: center;
  margin-bottom: 2rem;
}

/* Search Results Section */
.search-results {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid $divider-color;
}

/* Button Styling */
button {
  background-color: $primary-color;
  color: $card-background;
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  margin-top: 1rem;
  text-align: center;

  &:hover {
    background-color: $primary-hover;
    transform: translateY(-3px); /* Subtle lift effect */
  }
}

/* Recent Search Button */
.recent-search-btn {
  display: block;
  background-color: $secondary-color;
  color: $card-background;
  margin: 0 auto;
  padding: 10px 15px;
  border-radius: 8px;
  font-weight: 600;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: $primary-hover;
    transform: translateY(-3px);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
    gap: 1.5rem;
  }

  .title {
    font-size: 2rem;
  }

  button {
    font-size: 1rem;
    padding: 8px 16px;
  }

  .search-results {
    gap: 1rem;
  }
}

</style>
