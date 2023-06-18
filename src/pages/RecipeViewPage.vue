<template>
  <div class="container">
    <div v-if="recipe">
      <h1>{{ recipe.title }}</h1>
      <div class="recipe-header mt-3 mb-4">
          <div>
            <div><strong>Ready in </strong> <span class="span-decor">{{ recipe.readyInMinutes }} minutes 🧭 </span></div>
            <div><strong>Likes: </strong>{{ recipe.popularity }} <span class="span-decor">likes </span> ❤</div>
            <div><strong>Summary:</strong><br> {{ recipe.summary }}</div>
            <div class="intolrences-container">
              <div class="intolrences-item" v-if="recipe.glutenFree">🍞</div>
              <div class="intolrences-item" v-if="recipe.vegan">🥚</div>
              <div class="intolrences-item" v-if="recipe.vegetarian">🥦</div>
            </div>

          </div>
          <div class="img-wrap">
            <img :src="recipe.image" class="center" />
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
              <Ingridient 
              :id = r.id
              :Original="r.Original"
              :aisle="r.aisle"
              :amount="r.amount"
              :image="r.image"
              :consistency="r.consistency"
              :measures="r.measures"
              ></Ingridient>
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
import Ingridient from './Ingridient.vue';
export default {
  data() {
    return {
      recipe: null
    };
  },
  components: {
    InstructionList,
    Ingridient
  },
  async created() {
    try {
      let response;
      // response = this.$route.params.response;

      try {
        response = await this.axios.get(
          // "https://test-for-3-2.herokuapp.com/recipes/info",
          this.$root.store.server_domain + "/recipes/information",
          {
            params: { recipeId: this.$route.params.recipeId }
          }
        );

        // console.log("response.status", response.status);
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }

      let {
        Preview,
        analyzedInstructions,
        extendedIngredients,
        instructions,
        userData,
      } = response.data.recipeInfo;

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


      let _instructions = response.data.recipeInfo.instructions
        .map((fstep) => {
          fstep.steps[0].step = fstep.name + fstep.steps[0].step;
          return fstep.steps;
        })
        .reduce((a, b) => [...a, ...b], []);

      let _recipe = {
        instructions,
        _instructions,
        analyzedInstructions,
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
      console.log(this.recipe)
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>
body {
  text-align: left;
}
.recipe-header {
  display: flex;
  flex-direction: row-reverse;

  font-size: larger;
}


.recipe-header .img-wrap {
  width: 100%;
  height: 100%;

  grid-column: 1;
  grid-row: 1 / 4;

  overflow: hidden;
  border-radius: 20px;
}

.recipe-header .img-wrap img{
  width: 100%;
  transform: translateY(-20%);
  border-radius: inherit;
  padding-right: 10px;
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
</style>
