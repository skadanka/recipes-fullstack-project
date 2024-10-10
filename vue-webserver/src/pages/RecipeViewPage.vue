<template>
  <div class="container">
    <div v-if="recipe">
      <h1>{{ mutableRecipe.title }}</h1>
      <div class="recipe-header mt-3 mb-4">
        <div class="img-wrap">
          <img :src="mutableRecipe.image" class="center" onerror="this.onerror=null; this.src='../assets/missingFood.png'" alt="" />
          
        </div>
        <div><strong>Ready in </strong> <span class="span-decor">{{ mutableRecipe.readyInMinutes }} minutes 🧭 </span></div>
        <div><strong>Likes: </strong> {{ mutableRecipe.popularity }} <span class="span-decor">likes </span> ❤</div>
        <div class="intolrences-container">
          <div class="intolrences-item" v-if="!mutableRecipe.glutenFree">🍞</div>
          <div class="intolrences-item" v-if="mutableRecipe.vegan">🥚</div>
          <div class="intolrences-item" v-if="mutableRecipe.vegetarian">🥦</div>
        </div>
            <div v-html="mutableRecipe.summary" id="summary"></div>
    </div>
    <div class="recipe-body">
      <div class="wrapper">
          Ingredients:
          <ul>
            <li
              v-for="(r, index) in mutableRecipe.extendedIngredients"
              :key="index + '_' + r.id"
            >
              <Ingredient 
              :id = r.id
              :original="r.original"
              :aisle="r.aisle"
              :amount="r.amount"
              :image="r.image"
              :consistency="r.consistency"
              :measures="r.measures"
              ></Ingredient>
            </li>
          </ul>
        </div>
        <div class="wrapped">
          Instructions:
          <instruction-list :instructions="mutableRecipe.instructions"></instruction-list>
        </div>
      </div>
      <!-- <pre>
      {{ $route.params }}
      {{ recipe }}
    </pre
      > -->
    </div>
  </div>
</template>

<script>

import InstructionList from '../components/InstructionList.vue';
import Ingredient from '../components/Ingredient.vue';
export default {
  props: {
    recipe: {
      type: Object,
      default: () => { return null;}
    },
    recipeId: {
      type: String,
      required: true
    }
  },
  components: {
    InstructionList,
    Ingredient
  },
  beforeMount() {
    if(this.recipe){
      this.getRecipeInformation();
    }
  },

  methods: {
    async getRecipeInformation(){
        let response;
        try {
          if(this.$root.store.username){
            response = await this.axios.get(
              // "https://test-for-3-2.herokuapp.com/recipes/info",
              this.$root.store.server_domain + `/users/recipes/${this.$route.params.recipeId}/information`,
              {
                params: { recipeId: this.$route.params.recipeId }
              }
            );
          }else {
            response = await this.axios.get(
              // "https://test-for-3-2.herokuapp.com/recipes/info",
              this.$root.store.server_domain + `/recipes/${this.$route.params.recipeId}/information`,
              {
                params: { recipeId: this.$route.params.recipeId }
              }
            );
          }
          // console.log("response.status", response.status);
          if (response && response.status !== 200) 
            this.$router.replace("/NotFound");


        let {
          Preview,
          extendedIngredients,
          instructions,
          userData,
        } = response.data.recipes[0];

        let 
        {
          title,
          readyInMinutes,
          image,
          popularity,
          vegan,
          vegetarian,
          glutenFree,
          summary
        } = Preview;

        // let _instructions = response.data.recipeInfo.Instructions
        //   .map((fstep) => {
        //     fstep.steps[0].step = fstep.name + fstep.steps[0].step;
        //     return fstep.steps;
        //   })
        //   .reduce((a, b) => [...a, ...b], []);
        
        let _recipe = {
          instructions,
          // _instructions,
          extendedIngredients,
          popularity,
          readyInMinutes,
          image,
          title,
          vegan,
          vegetarian,
          glutenFree,
          summary,
          userData
        };
        this.mutableRecipe = _recipe;
      } catch (error) {
        console.log("error.response.status", error.response.status);
          this.$router.replace("/NotFound");
          return;
      }
    }
  },
  data: function() {
    return {
      mutableRecipe: this.recipe
    }
  }
}
</script>

<style scoped lang="scss">

/* General Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Recipe Header */
.recipe-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

.recipe-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: $primary-color; /* Assuming primary color is defined */
  margin-bottom: 1rem;
}

.recipe-header .details {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
}

.recipe-header .span-decor {
  color: darkblue;
  font-weight: 600;
}

/* Intolerances Icons */
.intolrences-container {
  display: flex;
  gap: 1rem;
  font-size: 1.5rem;
}

.intolrences-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: $secondary-color; /* Assuming a secondary color */
  color: $card-background;
}

/* Recipe Image */
.img-wrap {
  width: 100%;
  max-width: 800px;
  margin: 2rem auto;
  overflow: hidden;
  border-radius: 20px;
}

.img-wrap img {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 20px;
}

/* Recipe Summary */
#summary {
  font-size: 1.1rem;
  line-height: 1.6;
  color: $text-color;
  margin: 2rem 0;
}

/* Recipe Body */
.recipe-body {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.recipe-body .wrapper {
  padding: 1.5rem;
  background-color: $card-background;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.recipe-body h2 {
  font-size: 1.8rem;
  font-weight: 600;
  color: $primary-color;
  margin-bottom: 1rem;
}

/* Ingredients List */
.recipe-body .wrapper ul {
  list-style: none;
  padding-left: 0;
  font-size: 1.1rem;
  color: $text-color;
}

.recipe-body .wrapper ul li {
  margin-bottom: 0.75rem;
}


/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  .recipe-header h1 {
    font-size: 2rem;
  }

  .recipe-body {
    gap: 2rem;
  }
}

</style>
