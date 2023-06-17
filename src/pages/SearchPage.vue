<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <SearchBar title="Search" class="SearchBar center" @searchButtonClick="updateRecipes"></SearchBar>

    <b-row>
      <b-col v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>

  </div>
</template>

<script>
import SearchBar from "../components/SearchBar";
import RecipePreview from "../components/RecipePreview.vue";
export default {

  components: {
    SearchBar,
    RecipePreview
  },
  data() {
    return {
      recipes: []
    }
  },
  methods: {
    updateRecipes: async function(params) {
        try {
            console.log("Search Page called update click", params);
            const response = await this.axios.get(
                this.$root.store.server_domain + "/recipes/search",
                {
                    query: {
                        query: params.values.query,
                        number: params.values.number,
                        cuisine: params.values.cuisine,
                        diet: params.values.diet,
                        intolerances: params.values.intolerances
                    }   
                }
            );

            // console.log(response);
            const recipes = response.data.recipes;
            this.recipes = [];
            this.recipes.push(...recipes);
        } catch (error) {
            console.log(error);
        }
    }
  }

}
</script>

