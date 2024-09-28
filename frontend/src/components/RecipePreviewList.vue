<template>
  <b-container>
      <h3>
        {{ title }}:
        <slot></slot>
      </h3>
    <b-row  class='recipes-rows' v-for="i in Math.ceil(recipes.length / inRow)" :key="i">
      <b-col v-for="recipe in recipes.slice((i-1) * inRow, i *inRow)" :key="recipe.id">
        <recipe-preview :recipe="recipe"></recipe-preview>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    },
    recipes: {
        type: Array,
         required: true
      },
    inRow: {
      type: Number,
      default: () => {return 3;}
    }
  },
  

};
</script>

<style lang="scss" scoped>
.container {
  min-height: 500px;
  max-height: 500px;
  margin-top: 15px;
}

.recipes-rows {
  padding-top: 15px;
}
</style>
