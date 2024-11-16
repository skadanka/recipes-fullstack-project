<template>
    <div id="ingredient" class="ingredient-container">
      <div class="ingredient-amount">{{ amount.toFixed(2).replace(/\.00$/, '') }}</div>
      <div class="ingredient-name">{{ original }}</div>
      <div class="ingredient-consistency" v-if="consistency">({{ consistency }})</div>
    </div>
</template>
  
<script>
  export default {
      props: {
          id: {
              type: Number,
              required: true
          },
          original: {
              type: String,
              required: true
          },
          amount: {
              type: Number,
              default: () => { return 0; }
          },
          image: {
              type: String,
              default: () => { return ""; }
          },
          consistency: {
              type: String,
              default: () => { return ""; }
          },
          measures: {
              type: Object,
              default: () => { return null; }
          },
          aisle: {
              type: String,
              default: () => { return "Supermarket"; }
          }
      }
  }
</script>
  
<style scoped lang="scss">
  
  /* Ingredient Container */
  .ingredient-container {
    display: flex;
    gap: 0.5rem;
    padding: 1rem;
    background-color: $card-background; /* Assuming card background from global vars */
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05); /* Soft shadow */
    transition: transform 0.3s ease;
  }
  
  /* Amount Styling */
  .ingredient-amount {
    font-size: 1.25rem;
    font-weight: 700;
    color: $primary-color; /* Bold primary color for emphasis */
  }
  
  /* Name Styling */
  .ingredient-name {
    font-size: 1.1rem;
    font-weight: 500;
    color: $text-color; /* Main text color */
  }
  
  /* Consistency Styling */
  .ingredient-consistency {
    font-size: 0.9rem;
    color: $secondary-text-color; /* Lighter color for consistency */
    font-style: italic;
  }
  </style>
  