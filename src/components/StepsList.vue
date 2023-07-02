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
      <div>
        <b-form-group
            id="input-group-step"
            label-cols-sm="3"
            label="Step Description:"
            label-for="input-description"
        >
        <b-form-input @click.stop
            id="input-description"
            v-model="form.step"
            aria-placeholder="Enter step description..."
            :state="validateState('stepName')">
        </b-form-input>
        </b-form-group>
        <b-button type="button" @click="createStep">Add Step</b-button>
      </div>

    </div>
  </template>
  
  <script>
import Step from './Step.vue'
import Vue from 'vue'
import { required } from "vuelidate/lib/validators"
  
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
      validations: {
        form: {
            stepName: {
                required,
                length: (n) => { n.length > 0}
            }
        }
      },
      data() {
        return {
            form: {
                step: ""
            }
        }
      },
      methods: {
        createStep() {
            // var StepClass = Vue.extend(Step);
            // var instance = new StepClass({
            var instance = { number : this.steps.length + 1, step: this.form.step}
            // });
            // instance.$mount();
            this.steps.push(instance);

        },
        
        validateState(param) {
                const { $dirty, $error } = this.$v.form[param];
                return $dirty ? !$error : null;
        },
      }
      
  }
  </script>
  
  <style>

  </style>
  