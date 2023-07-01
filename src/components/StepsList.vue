<template>
    <div>
      <ol>
          <ul v-for="step in steps" :key="step.number">
              <Step
                  :number = step.number
                  :step = step.step
                  :ingredients="step.ingredients"
                  :equipments="step.equipment"
              ></Step>
          </ul>
      </ol>
      <button type="button" @click="createStep">Click Me!</button>

    </div>
  </template>
  
  <script>
import Step from './Step.vue'
import Vue from 'vue'
  
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
      },
      methods: {
        createStep() {
            // var StepClass = Vue.extend(Step);
            // var instance = new StepClass({
            var instance = { number : this.steps.length + 1, step: "Hello adding components", ingredients: null, equipments: null }
            // });
            // instance.$mount();
            this.steps.push(instance);

        }
      }
      
  }
  </script>
  
  <style>
  
  </style>
  