<template>
  <div class="container">
    <!-- Recipe Preview Link -->
    <router-link 
      :to="{ name: 'recipe', params: { recipeId: recipe.id, recipe: recipe } }" 
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

<style lang="scss" scoped>


/* Recipe Preview Container */
.recipe-preview {
  width: 100%;
  border-radius: 12px; /* Softer, modern rounded corners */
  overflow: hidden;
  border: 1px solid $border-color; /* Subtle border for a clean look */
  margin: 15px 0;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05); /* Softer shadow for modern feel */
  background-color: $card-background; /* White card background */
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-decoration: none;
  /* Hover Effect */
  &:hover {
    transform: translateY(-5px); /* Slight lift on hover */
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1); /* Slightly deeper shadow on hover */
  }
}

/* Recipe Image */
.recipe-image {
  height: 250px;
  width: 100%;
  object-fit: cover;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}

/* Recipe Body */
.recipe-body {
  display: flex;
  flex-direction: column;
  padding: 20px;
  color: $text-color; /* Dark text for readability */
}

/* Recipe Title */
.recipe-title {
  font-size: 1.2em; /* Larger font for modern look */
  font-weight: 600;
  color: $primary-color; /* Modern Blue for title */
  margin-bottom: 10px;
}

/* Intolerances Section */
.intolrences-container {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.intolrences-item {
  font-size: 1rem;
  background-color: $secondary-color; /* Coral for icon background */
  padding: 8px;
  border-radius: 50%; /* Modern rounded icons */
  display: inline-block;
  color: $card-background; /* White text inside */
}

/* Recipe Overview (Time and Popularity) */
.recipe-overview {
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding: 15px 0;
  margin-top: 10px;
  border-top: 1px solid $divider-color;
  color: $secondary-text-color; /* Light gray text for less emphasis */
  font-size: 1.1rem;
}

/* User Info Icons (Favorite & Watched) */
.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
}

#like-button {
  color: $secondary-color; /* Coral for liked/favorite button */
  font-size: 1.8rem;
  cursor: pointer;
  transition: color 0.3s ease;
}

button {
  background-color: transparent;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: $text-color; /* Neutral color for unliked state */
  transition: color 0.3s ease;

  &:hover {
    color: $primary-hover; /* Hover effect on like button */
  }
}

/* Recipe Header with Background */
.recipe-header {
  background-color: $highlight-color; /* Yellow for attention-grabbing header */
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid $divider-color; /* Clean border */
  color: $card-background; /* White for contrast against the bright background */
}

/* General styling for images */
img {
  max-width: 100%;
  height: auto;
  object-fit: cover;
}

</style>
