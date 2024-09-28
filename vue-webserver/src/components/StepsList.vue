<template>
    <div class="steplist-body">
      <ol  v-for="step in steps" :key="step.number">
          <Step
              @stepUpdate="handleStepUpdate($event)"
              :number = "step.number"
              :index="index"
              :step = step.step
              :ingredients="step.ingredients"
              :equipments="step.equipments"
              :edit="edit"
          ></Step>
      </ol>
      <div class="step-input-comp" v-if="edit">
        <b-form-input @click.stop
            id="input-description"
            v-model="form.step"
            aria-placeholder="Enter step description..."
            :state="validateState('stepName')">
        </b-form-input>
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
          },
          index: {
            type: Number,
            required: true
          },
          edit: {
            type: Boolean,
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
      computed: {
        stepNumberString(stepNumber) { return `${this.index}${stepNumber}`}

      },
      methods: {
        createStep() {
            var instance = { number : this.steps.length, step: this.form.step}
            this.steps.push(instance);
            this.$emit('stepsUpdate', this.steps);
            this.form.step = "";
        },
        validateState(param) {
                const { $dirty, $error } = this.$v.form[param];
                return $dirty ? !$error : null;
        },
        handleStepUpdate(updatedStep) {
          this.steps[updatedStep.number] = updatedStep;
          this.$emit('stepsUpdate', this.steps);
        }
      }
      
  }
  </script>
  
  <style>
     .steplist-body{
        width: 100%;
        align-items: left;
     }
     .step-input-comp{
        margin-top: 20px;
     }
  </style>
  