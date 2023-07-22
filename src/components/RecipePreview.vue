<template>
  <div class="container">
  <span class="user-info">
    <div v-if="recipe.userdata && recipe.userData.favorite" id="like-button" >&#10084;</div>
    <button v-else-if="recipe.userData  && $root.store.username" @click="handleLikeButton">&#9825;</button>
    <div v-if="recipe.userData && recipe.userData.watched" id="watched-indicator" >👀</div>
  </span>
  <router-link
  :to="{ name: 'recipe', params: { recipeId: recipe.id, recipe: customRecipe} }"
  class="recipe-preview"
  >
    <div class="recipe-header">
      <ul class="recipe-overview">
        <li>{{ recipe.readyInMinutes }} minutes🧭</li>
        <li>{{ recipe.popularity }} ⭐</li>
      </ul>
    </div>
    <div class="recipe-body">
      <img v-if="image_load" :src="recipe.image" class="recipe-image"/>
      <img v-else class="recipe-image" src="../assets/missingFood.png"/>
      <div class="recipe-footer">
        <div class="recipe-title">
          {{  recipe.title }}
        </div>
        <div class="intolrences-container">
          <div class="intolrences-item" v-if="recipe.glutenFree"><img src="../assets/gluten-free_8887985.png" id="glutenIcon"/></div>
          <div class="intolrences-item" v-if="recipe.vegan">🥚</div>
          <div class="intolrences-item" v-if="recipe.vegetarian">🥦</div>
        </div>
        <div v-html="recipe.summary" class="summary"></div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>

export default {

  mounted() {

  },
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
    userData: {
      type: Object,
      default: () => 
        Object({
          watched: false,
          favorite: false
        })
    }
  },
  computed: {
    customRecipe()  { return this.recipe.custom ? this.recipe : null}
  },

  methods: {
    handleLikeButton: async function() {
      try{
        console.log(this.recipe.id);
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

.container {
 height: 100%;
 width: 120%;
}

.recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
  border: 1px solid grey;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 350ms;
}
.user-info {
  display: flex;
  font-size:larger;
  gap: 10px;
  width: 87%;
  translate: 5% 38%;
  justify-content: space-between;
}

.user-info *{

  border-radius: 70% 70% 10% 10%   ;
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

.user-info #watched-indicator{
  transform: scaleX(-1);
}

.recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
}

.recipe-preview .recipe-body {
  display: block;
  background-size: cover;
  height: 100%;
  width: auto;
  object-fit: cover;

}


.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  height: 100%;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: contain;
  z-index: -1;

  object-fit: cover;
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 75%;
  transform: translateY(-40%);

  -webkit-transition: background-image 1s, transform .5s; /* For Safari 3.0 to 6.0 */
  transition: background-image 1s, transform .5s; /* For modern browsers */ 

  background-image: 

  linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.6) 10%,
      rgba(0, 0, 0, 0.7) 20%,
      rgb(0, 0, 0, 0.8) 40%,
      rgb(0, 0, 0, 1) 60%,
      rgb(0, 0, 0,1) 80%,
      rgb(0, 0, 0, 1) 100%
    );
}

.recipe-preview:hover .recipe-footer {
  display: block;
  transform: translateY(-100%);
}

.recipe-preview:hover {
  transform: scale(1.2);
}

.recipe-title {
  padding: 10px 10px;
  width: 100%;
  text-align: left;
  overflow: hidden;
  -o-text-overflow: ellipsis; 
  text-overflow: ellipsis;
  font-size: 1.5rem;
}

.recipe-preview .recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 1;
  -ms-flex: 1 1;
  flex: 1 1;
  table-layout: fixed;
  margin-bottom: 0px;
  list-style: none;
  background-color: transparent;

}

.recipe-header {
  background-color: rgba(19, 0, 0, 0.8);
}

.recipe-preview  ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 50%;
  display: table-cell;
  text-align: center;
}
.recipe-preview  .recipe-body .intolrences-container{
  display: flex;
  gap: 5px;
  position: absolute;
  translate: 5px -100%;
  top: 0;
  width: 100%;
}

.recipe-preview  .recipe-body .intolrences-container .intolrences-item {
  border-radius: 10px;
  height: 20%;
  width: 20%;
  text-align: center;
  font-size: x-large;
  box-shadow: inset 0px 5px 10px rgba(255,255,255,0.7), 10px 0px 0px rgba(0.15,0,0,0);
}

#glutenIcon {
  width: 40px;
  height: 40px;
  object-fit: contain;
}
.summary {
  color: white;
  text-align: left;
  transform: translate(5%, 17%);
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space:pre-wrap;
  height: 100%;
}

</style>
