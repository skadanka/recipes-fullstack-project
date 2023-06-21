<template>
    <div>
      <ol>
          <ul v-for="step in steps" :key="step.number">
              <Step
                  :description = step.description
                  :number = step.number
                  :step = step.step
                  :ingredients="step.ingredients"
                  :equipment="step.equipment"
                  :length="step.length"
              ></Step>
          </ul>
      </ol>
    </div>
  </template>
  
  <script>
import Step from './Step.vue'
  
  export default {
      name: 'stepsList',
      props: {
          steps:{
              type: Array,
              required: true
          }
      },
      components: {
          Step
      }
  }
  </script>
  
  <style>
  
  </style>
  