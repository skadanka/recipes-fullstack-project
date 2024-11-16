<template>
    <div class="equipment">
        {{ name }}
        <img :src="image" onerror="this.onerror=null; this.src=''"/>
    </div>
  </template>
  
  <script>
  export default {
      props: {
          id: {
              type: Number,
              required: true,
          },
          image: {
              type: String,
              default: () => {return "";}
          },
          name: {
              type: String,
              required: true
          }
      }
  }
  </script>
  <style>
      .equipment {
        width: 100px;
        min-height: 40px;
        border: 1px solid #080808;
        text-align: center;
        background-color: #BAD7E9;
      }
  
</style>