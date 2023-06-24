<template>
    <div class="ingredient-compact">
      <strong>{{ name }}</strong>
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
              required: true
          },
          image: {
              type: String,
              required: true
          }
      }
  }
  </script>
  
  <style>
  </style>
  