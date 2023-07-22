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
  .ingredient-compact {
        width: 100px;
        min-height: 40px;
        border: 1px solid #080808;
        text-align: center;
        background-color: #BAD7E9;
    }
  </style>
  