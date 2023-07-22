<template>
  <div class="container">
    <div v-if="recipe">
      <h1>{{ recipe.title }}</h1>
      <div class="recipe-header mt-3 mb-4">
            <div><strong>Ready in </strong> <span class="span-decor">{{ recipe.readyInMinutes }} minutes 🧭 </span></div>
            <div><strong>Likes: </strong> {{ recipe.popularity }} <span class="span-decor">likes </span> ❤</div>
            <div class="intolrences-container">
              <div class="intolrences-item" v-if="recipe.glutenFree">🍞</div>
              <div class="intolrences-item" v-if="recipe.vegan">🥚</div>
              <div class="intolrences-item" v-if="recipe.vegetarian">🥦</div>
            </div>
            <div class="img-wrap">
              <img :src="recipe.image" class="center" onerror="this.onerror=null; this.src='../assets/missingFood.png'" alt="" />

            </div>
            <div v-html="recipe.summary" id="summary">
            </div>
    </div>
    <div class="recipe-body">
      <div class="wrapper">
          Ingredients:
          <ul>
            <li
              v-for="(r, index) in recipe.extendedIngredients"
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
          <instruction-list :instructions="recipe.instructions"></instruction-list>
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
    }
  },
  components: {
    InstructionList,
    Ingredient
  },
  async created() {
    if(!this.recipe){
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
        this.recipe = _recipe;
      } catch (error) {
        console.log("error.response.status", error.response.status);
          this.$router.replace("/NotFound");
          return;
      }
    }
  },
}
</script>

<style scoped>
body {
  text-align: left;
}

.recipe-header .img-wrap {
  width: 100%;
  height: 100%;

  overflow: hidden;
  border-radius: 20px;
  justify-content: left;
}

.recipe-header .img-wrap img{
  width: 100%;
  border-radius: inherit;
  padding-right: 10px;
  max-height: 800;
  max-width: 600px;
}

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.span-decor {
  color: darkblue;
}

.container div .recipe-header .intolrences-container{
  display: flex;
}

.container div .recipe-header .intolrences-container .intolrences-item {
  border-radius: 10px;
  height: 50px;
  width: 50px;
  text-align: center;
  justify-content: center;
  font-size: x-large;
  box-shadow: inset 2px 5px 10px rgba(58, 53, 53, 0.7), 10px 0px 0px rgba(19, 17, 17, 0);
}

</style>
