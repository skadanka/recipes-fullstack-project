<template>
    <router-link
      :to="{ name: 'recipe', params: { recipeId: String(recipe.id), recipe: recipe.Preview } }"
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
          <div class="intolrences-item" v-if="recipe.Preview.glutenFree" ><img src="../assets/gluten-free_4891616.png" style="width: 24px;height:24px;"></div>
          <div class="intolrences-item" v-if="recipe.Preview.vegan">🥚</div>
          <div class="intolrences-item" v-if="recipe.Preview.vegetarian">🥦</div>
        </div>
        <ul class="recipe-overview">
          <li>⏲️ {{ recipe.Preview.readyInMinutes }} minutes</li>
          <li>❤️ {{ recipe.Preview.popularity }} likes</li>
        </ul>
        <div v-html="recipe.Preview.summary.substring(0, 120)" class="recipe-description" id="summary"></div>
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
  
<style scoped lang="scss">

/* Search Result Card (Container) */
.recipe-preview-search {
  display: block;
  width: 100%;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: $card-background;
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: translateY(-5px); /* Slight lift on hover */
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1); /* Add shadow on hover */
  }
}

/* Recipe Body Layout */
.recipe-body {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

/* Image Container */
.image-container {
  flex: 0 0 30%;
  overflow: hidden;
  border-radius: 10px;
  background-color: $background-color;
}

.recipe-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.9; /* Subtle hover effect */
  }
}

/* Recipe Details */
.recipe-footer {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.2rem;
}

/* Recipe Title */
.recipe-footer h1 {
  font-size: 1.75rem;
  font-weight: 600;
  color: $text-color;
  margin-bottom: 1rem;
}

/* Recipe Intolerances */
.intolrences-container {
  display: flex;
  gap: 0.8rem;
  font-size: 1.2rem;
}

.intolrences-item {
  display: inline-block;
  background-color: $secondary-color;
  border-radius: 50%;
  padding: 5px;
  width: 35px;
  height: 35px;
  text-align: center;
  line-height: 1.2;
  color: $card-background;
}

/* Recipe Overview (Time and Likes) */
.recipe-overview {
  list-style: none;
  display: flex;
  gap: 1rem;
  font-size: 1rem;
  color: $secondary-text-color;
  margin: 0;
  padding: 0px;
}

/* Recipe Description */
.recipe-description {
  color: $text-color;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-top: 1rem;
  max-height: 4rem; /* Limit height */
  overflow: hidden;
  text-overflow: ellipsis;
}

.recipe-description::after {
  content: '... Read More';
  color: $primary-color;
  font-weight: 600;
  cursor: pointer;
}

/* Responsive Design */
@media (max-width: 768px) {
  .recipe-body {
    flex-direction: column;
    align-items: flex-start;
  }

  .image-container {
    width: 100%;
    height: 200px;
  }

  .recipe-footer h1 {
    font-size: 1.5rem;
  }

  .recipe-description {
    font-size: 0.9rem;
  }
}

</style>
