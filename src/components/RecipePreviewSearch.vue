<template>
    <router-link
      :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
      class="recipe-preview-search"
    >
    <div class="recipe-body bg-white text-black">
      <div class="image-container">
        <img  :src="recipe.Preview.image" class="recipe-image"/>
      </div>
      <div class="recipe-footer">
        <h1  style="">{{ recipe.Preview.title }}</h1>
        <div class="intolrences-container">
          <div class="intolrences-item" v-if="recipe.Preview.glutenFree" ><img src="../assets/gluten-free_4891616.png" style="object-fit:contain;"></div>
          <div class="intolrences-item" v-if="recipe.Preview.vegan">🥚</div>
          <div class="intolrences-item" v-if="recipe.Preview.vegetarian">🥦</div>
        </div>
        <ul class="recipe-overview">
          <li>{{ recipe.Preview.readyInMinutes }} minutes</li>
          <li>{{ recipe.Preview.popularity }} likes</li>
        </ul>
        <div v-html="recipe.Preview.summary.substring(0, 150)" class="recipe-description" id="summary"></div>
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
    methods: {
     

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

  .image-container {
    width: 40%;
    height: 40%;
    overflow: hidden;
    border-radius: inherit;
  }

  .recipe-overview {
    list-style: none;
    transform: translateX(-5%);
  }
  .recipe-body {
    border-radius: 10px;
    overflow: hidden;

    margin-top: 10px;
    width: 100%;
    height: 100%;

    display: flex;
    flex: 1 1 auto;
    gap: 1rem;
    max-height: 300px;
    min-height: 300px;
    min-width: 800px;

    border: 1px solid black;
    border-radius: 10px;
  }

  .recipe-body > * {

  }

  .recipe-body .recipe-footer .intolrences-container {
    display: flex;
    font-size: 30px;
  }

  .recipe-body .recipe-footer .intolrences-container .intolrences-item img{
      width: 40px;
      height: 40px;

  }

  .recipe-body .image-contianer {
  }

  .recipe-description {
    list-style: none;
    text-overflow: ellipsis;
    margin-top: 10px;
    color: black;
    overflow: hidden;
  }

  .recipe-description:after {
    content: '... Read More';
    color:blue;
  }
  </style>
  
