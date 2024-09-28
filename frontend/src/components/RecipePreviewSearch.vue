<template>
    <router-link
      :to="{ name: 'recipe', params: { recipeId: parseInt(recipe.Preview.recipeId), recipe: recipe.custom ? recipe : null} }"
      class="recipe-preview-search"
    >
    <div class="recipe-body bg-white text-black">
      <div class="image-container" style="height: 100%;">
        <img  :src="recipe.Preview.image" class="recipe-image"/>
      </div>
      <div class="recipe-footer">
        <h1  style="">{{ recipe.Preview.title }}</h1>
        <!-- <span class="user-info" v-if="$root.store.username">
          <div v-if="userData && recipe.userData.favorite" id="like-button" >&#10084;</div>
          <button v-else @click="handleLikeButton">&#9825;</button>
          <div v-if="recipe.userData && recipe.userData.watched" id="watched-indicator">👀</div>
        </span> -->
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
     
      handleLikeButton: async function() {
      try{
        const response = await this.axios.post(
          this.$root.store.server_domain + "/users/favorites",
          {
            recipeId: this.recipe.id
            
          }
          );
          
          this.userData.favorite =  true;
        

      } catch (error) {
            console.log(error);
        }
    }
    },
    computed: {
      customRecipe()  { return this.recipe.custom ? this.recipe : null}
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
    height: 100%;
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

  .user-info {
  display: flex;
  font-size:larger;
  gap: 10px;
  width: 87%;
}

.user-info *{

  border-radius: 20px;
  text-align: center;
  width: 40px;
  
  min-width: fit-content;
  background: linear-gradient(to bottom,
      rgba(0, 0, 0, 0.6) 10%,
      rgba(0, 0, 0, 0.7) 20%,
      rgb(0, 0, 0, 0.8) 40%,
      rgb(0, 0, 0, 1) 60%,
      rgb(0, 0, 0,1) 80%,
      rgb(0, 0, 0, 1) 100%);
  color: crimson;
  font-size: inherit;

}
  </style>
  
