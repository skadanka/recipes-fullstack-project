<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <!-- Loop for rows -->
    <b-row class="recipes-rows" v-for="i in rowCount" :key="i">
      <!-- Loop for columns within each row -->
      <b-col class="recipe" v-for="recipe in getRecipesForRow(i)" :key="recipe.id">
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
    RecipePreview,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    recipes: {
      type: Array,
      required: true,
    },
    inRow: {
      type: Number,
      default: () => 3,
    },
  },
  computed: {
    rowCount() {
      // Calculate the number of rows based on the number of recipes and items per row
      return Math.ceil(this.recipes.length / this.inRow);
    },
  },
  methods: {
    getRecipesForRow(rowIndex) {
      // Slice the recipes array for the current row based on the rowIndex
      const start = (rowIndex - 1) * this.inRow;
      const end = rowIndex * this.inRow;
      return this.recipes.slice(start, end);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
}

.recipes-rows {
  display: flex;
  align-items: stretch;
}

.recipe {
  max-width: 380px;
  padding: 10px;
}

@media (max-width: 768px) {
  .recipe {
    flex: 1 1 100%;
    max-width: 100%;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .recipe {
    flex: 1 1 50%;
    max-width: 50%;
  }
}

</style>
