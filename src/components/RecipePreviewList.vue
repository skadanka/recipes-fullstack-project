<template>
  <b-container>
      <h3>
        {{ title }}:
        <slot></slot>
      </h3>
    <b-row  v-for="i in Math.ceil(recipes.length / 3)" :key="i">
      <b-col v-for="recipe in recipes.slice((i-1) * 3, i *3)" :key="recipe.id">
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
  },
  

};
</script>

<style lang="scss" scoped>
.container {
  min-height: 500px;
  max-height: 500px;
  margin-top: 15px;
}
</style>
