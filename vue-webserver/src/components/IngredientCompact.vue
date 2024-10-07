<template>
  <div class="ingredient-compact">
    <span>{{ name }}</span>
    <img :src="image" onerror="this.style.display='none'"/>

  </div>
</template>

<script>
export default {
  name: "IngredientCompact",
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    localizedName: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
  },
  methods: {
    handleImageError(event) {
      event.target.src = ""; // Fallback to empty if image is not found
    },
  },
};
</script>

<style scoped>
.ingredient-compact {
  display: flex;
  align-items: center;
  text-align: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.ingredient-compact img {
  width: 40px;
  height: 40px;
  margin-left: 10px;
  object-fit: cover;
}
</style>
