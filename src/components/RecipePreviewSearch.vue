<template>
    <router-link
      :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
      class="recipe-preview-search"
    >
    <div class="recipe-body bg-dark text-white">
      <div class="image-container">
        <img  :src="recipe.Preview.image" class="recipe-image"/>
      </div>
      <div class="recipe-footer">
        <div class="intolrences-container">
          <div class="intolrences-item" v-if="recipe.Preview.glutenFree">🍞</div>
          <div class="intolrences-item" v-if="recipe.Preview.vegan">🥚</div>
          <div class="intolrences-item" v-if="recipe.Preview.vegetarian">🥦</div>
        </div>
        <ul class="recipe-overview">
          <li>{{ recipe.Preview.readyInMinutes }} minutes</li>
          <li>{{ recipe.Preview.popularity }} likes</li>
        </ul>
      </div>
      <div class="recipe-description">
        <h1  style="">{{ recipe.Preview.title }}</h1>
        <div v-html="recipe.Preview.summary" id="summary"></div>
      </div>
      </div>
    </router-link>
  </template>
  
  <script>
  
  export default {
  
    data() {
      return {
        image_load: false
      };
    },
    props: {
      recipe: {
        type: Object,
        required: true
      }
  
    },
    computed: {
        
    }
  };
  </script>
  
  <style scoped>
  .recipe-preview-search {
    height: 30vh;
    width: 100%;
  }

  .recipe-body {
    border-radius: 10px;
    overflow: hidden;

    margin-top: 10px;
    width: 100%;
    height: 100%;
  }

  .recipe-body > * {

  }

  .recipe-body .recipe-footer .intolrences-container {
    display: flex;
    font-size: 30px;
  }

  .recipe-body .image-contianer {
  }

  .recipe-description {
    list-style: none;
    text-overflow: ellipsis;
  }

  </style>
  
