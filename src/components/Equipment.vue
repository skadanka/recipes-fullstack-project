<template>
    <div id="equipment">
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
              required: true
          },
          name: {
              type: String,
              required: true
          }
      }
  }
  </script>
  <style>
      #equipment {
          width: 100px;
          height: 100px;
          border: 1px solid black;
      }
  
</style>