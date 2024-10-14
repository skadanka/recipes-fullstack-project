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
          <button v-else @click.prevent="handleLikeButton">&#9825;</button>
          <!-- Watched Indicator -->
          <div v-if="recipe.userData && recipe.userData.watched" id="watched-indicator">👀</div>
        </span>
      </div>

      <!-- Recipe Body -->
      <div>
        <!-- Recipe Image -->
        <img v-if="image_load" :src="recipe.image" class="recipe-image" />
        <img v-else class="recipe-image" src="../assets/missingFood.png" />
      </div>
      <div class="recipe-body">
        <!-- Recipe Title -->
        <div class="recipe-title">{{ recipe.title }}</div>

        <!-- Intolerances Icons -->
        <div class="intolerances-container">
          <div class="intolerances-item" v-if="recipe.vegan">🥚</div>
          <div class="intolerances-item" v-if="recipe.vegetarian">🥦</div>
          <div class="intolerances-item" v-if="!recipe.glutenFree">🍞</div>
        </div>

        <!-- Recipe Overview (Time and Popularity) -->
        <ul class="recipe-overview">
          <li>🧭 {{ recipe.readyInMinutes }} minutes</li>
          <li>⭐ {{ recipe.popularity }}</li>
        </ul>
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
    }
  },
  computed: {
    customRecipe() {
      return this.recipe.custom ? this.recipe : null;
    }
  },
  created() {
    this.customRecipe;
  },
  methods: {
    handleLikeButton: async function(e) {
      e.preventDefault();
      
      try {
        const response = await this.axios.post(
          this.$root.store.server_domain + "/users/favorites",
          {
            recipeId: this.recipe.id
          }
        );
        
        // Toggle favorite status
        if (this.recipe.userData) {
          this.recipe.userData.favorite = !this.recipe.userData.favorite;
        } else {
          this.$set(this.recipe, 'userData', { favorite: true });
        }
      } catch (error) {
        console.log(error);
      }
    },
    watched() {
      if (this.recipe.userData) {
        this.recipe.userData.watched = true;
      } else {
        this.$set(this.recipe, 'userData', { watched: true });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}

/* Recipe Preview Container */
.recipe-preview {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid $border-color;
  margin: 15px 0;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
  background-color: $card-background;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

/* Recipe Image */
.recipe-image {
  height: 250px;
  width: 100%;
  object-fit: cover;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  font-size: 1rem;
}

/* Recipe Body */
.recipe-body {
  display: flex;
  flex-direction: column;
  padding: 20px;
  color: $text-color;
}

/* Recipe Title */
.recipe-title {
  font-size: 1.2em;
  font-weight: 600;
  color: $primary-color;
  margin-bottom: 10px;
  height: 85px;
}

/* Intolerances Section */
.intolerances-container {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.intolerances-item {
  font-size: 1.5rem;
  border-radius: 50%;
  display: inline-block;
  color: $card-background;
}

/* Recipe Overview */
.recipe-overview {
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding: 5px 0;
  margin-top: 10px;
  border-top: 1px solid $divider-color;
  color: $secondary-text-color;
  font-size: 1.1rem;
}

/* User Info Icons */
.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
}

#like-button {
  color: $secondary-color;
  font-size: 1.8rem;
  cursor: pointer;
  transition: color 0.3s ease;
}

button {
  background-color: transparent;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: $text-color;
  transition: color 0.3s ease;

  &:hover {
    color: $primary-hover;
  }
}

/* Recipe Header */
.recipe-header {
  padding: 0 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid $divider-color;
  color: $card-background;
}

/* General styling for images */
img {
  max-width: 100%;
  height: auto;
  object-fit: cover;
}
</style>
