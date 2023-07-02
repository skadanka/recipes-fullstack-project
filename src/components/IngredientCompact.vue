<template>
    <div class="ingredient-compact">
      {{ name }}
      <img :src="image" onerror="this.onerror=null; this.src=''"/>
    </div>
  </template>
  
  <script>
  
  export default {
      name:"IngredientCompact",
      props: {
          id: {
              type: Number,
              required: true
          },
          name: {
              type: String,
              required: true
          },
          localizedName: {
              type: String,
              default: () => {return "";}

          },
          image: {
              type: String,
              default: () => {return "";}
          }
      }
  }
  </script>
  
  <style>
  </style>
  