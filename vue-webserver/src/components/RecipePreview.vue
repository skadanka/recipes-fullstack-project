<template>
  <div class="container">
    <!-- Recipe Preview Link -->
    <router-link 
      :to="{ name: 'recipe1', params: { recipeId: Number(recipe.id), recipe: recipe } }" 
      class="recipe-preview"
    >
      <!-- Recipe Header with User Info -->
      <div class="recipe-header">
        <span class="user-info" v-if="$root.store.username">
          <!-- Favorite Button -->
          <div v-if="recipe.userData && recipe.userData.favorite" id="like-button">&#10084;</div>
          <button v-else @click="handleLikeButton">&#9825;</button>
          <!-- Watched Indicator -->
          <div v-if="recipe.userData && recipe.userData.watched" id="watched-indicator">👀</div>
        </span>
      </div>

      <!-- Recipe Image -->
      <img v-if="image_load" :src="recipe.image" class="recipe-image"/>
      <img v-else class="recipe-image" src="../assets/missingFood.png"/>

      <!-- Recipe Body -->
      <div class="recipe-body">
        <!-- Recipe Footer -->
        <div class="recipe-footer">
          <!-- Recipe Title -->
          <div class="recipe-title">{{ recipe.title }}</div>

          <!-- Intolerances Icons -->
          <div class="intolrences-container">
            <div class="intolrences-item" v-if="recipe.vegan">🥚</div>
            <div class="intolrences-item" v-if="recipe.vegetarian">🥦</div>
            <div class="intolrences-item" v-if="!recipe.glutenFree">🍞</div>
            
          </div>

          <!-- Recipe Overview (Time and Popularity) -->
          <ul class="recipe-overview">
            <li>🧭 {{ recipe.readyInMinutes }} minutes </li>
            <li>⭐ {{ recipe.popularity }} </li>
          </ul>
        </div>
      </div>
    </router-link>
  </div>
</template>
<script>

export default {


  data() {
    return {
      image_load: true
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    },
    
  },
  computed: {
    customRecipe()  { return this.recipe.custom ? this.recipe : null}
  },
  created() {
    this.customRecipe;
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
    },
    watched() {
        this.userData.watched = true;
      }
  }
};
</script>

<style scoped>

  .recipe-preview {
   width: 100%;
   border-radius: 25px;
   overflow: hidden;
   border: 1px solid lavender;
   margin: 10px;
   box-shadow: 5px 5px 15px 5px rgba(230, 230, 250, 1);
   text-decoration: none;
   height: 80%;
  }

  .recipe-image {
   position: relative;
   height: 400px;
}

img {
   max-width: 100%;
   border-bottom-right-radius: 30px;
   transform: rotate(10deg) translate(-15px, -55px);
   position: absolute;
   height: 200px;
   object-fit: cover;
   object-position: center;
}

.recipe-body {
    display: flex;
    flex-direction: column;
    padding: 0px 30px 20px 30px;
}

.recipe-title {
  font-size: 1em;
  font-weight: 700;
  display: inline-block;
}

.recipe-overview {
    display: flex;
   justify-content: space-between;
   padding: 0px 30px 20px 30px;
   list-style: none;
}

.user-info {
  position: absolute;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.intolrences-container  .intolrences-item {
  display: table-cell;
}

.intolrences-container {
  display: flex;
  justify-content: flex-start;
}


</style>
