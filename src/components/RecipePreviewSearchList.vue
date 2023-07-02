<template>
    <b-container class="search-container" fluid>
      <h3>
        {{ title }}:
        <slot></slot>
      </h3>
        <div v-for="r in recipes" :key="r.id">
          <RecipePreviewSearch class="recipePreviewSearch" :recipe="r" />
        </div>
    </b-container>
  </template>
  
  <script>
  import RecipePreviewSearch from "./RecipePreviewSearch.vue";
  export default {
    name: "RecipePreviewSearchList",
    components: {
        RecipePreviewSearch
    },
    props: {
      title: {
        type: String,
        required: true
      },
      recipes: {
        type: Array,
         required: true
      }
    },
    data() {
      return {
        // recipes: []
      };
    },
    mounted() {
    //   this.updateRecipes();
    },
    methods: {
  
    }
  };
  </script>
  
  <style lang="scss" scoped>


  .search-container {
    display: flex;
    flex-direction: column;
    
  }

  </style>