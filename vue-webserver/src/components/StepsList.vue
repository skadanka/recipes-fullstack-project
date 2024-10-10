<template>
  <div >
    <!-- Loop through steps and display each with a checkbox -->
    <ol class="steplist-body">
      <li v-for="step in steps" :key="step.number" :class="{ 'step-done': step.done }" class="step-item">
        <div class="step-container">
          <!-- Checkbox to mark step as done -->
          <input
            type="checkbox"
            :checked="step.done"
            @change="toggleStepDone(step)"
            class="step-checkbox"
          />
          <Step
            @stepUpdate="handleStepUpdate($event)"
            :number="step.number"
            :index="index"
            :step="step.step"
            :ingredients="step.ingredients"
            :equipments="step.equipments"
            :edit="edit"
          ></Step>
        </div>
      </li>
    </ol>

    <!-- Input form to add new steps -->
    <div class="step-input-comp" v-if="edit">
      <b-form-input
        @click.stop
        id="input-description"
        v-model="form.step"
        aria-placeholder="Enter step description..."
        :state="validateState('stepName')"
      ></b-form-input>
      <b-button type="button" @click="createStep" variant="primary">Add Step</b-button>
    </div>
  </div>
</template>

<script>
import Step from './Step.vue';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'StepsList',
  components: {
    Step
  },
  props: {
    steps: {
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
  data() {
    return {
      form: {
        step: ''
      }
    };
  },
  methods: {
    createStep() {
      var instance = { number: this.steps.length, step: this.form.step, done: false };
      this.steps.push(instance);
      this.$emit('stepsUpdate', this.steps);
      this.form.step = '';
    },
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    handleStepUpdate(updatedStep) {
      // This method will handle updates on other step elements but not the checkbox
      this.steps[updatedStep.number] = updatedStep;
      this.$emit('stepsUpdate', this.steps);
    },
    toggleStepDone(step) {
      // Toggle step completion status
      step.done = !step.done;
      this.$emit('stepsUpdate', this.steps); // Emit updated steps list
    }
  }
};
</script>

<style scoped lang="scss">
ol {
  list-style: none;
  padding: 0;
}
/* Step List Container */
.steplist-body {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: $background-color; /* Assuming global variables */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05); /* Subtle shadow */
}

/* Step Item Styling */
.step-item {
  width: 100%;
  margin-bottom: 1rem;
  background-color: $card-background;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  flex: 1;
}

/* Step Done Styling */
.step-done {
  background-color: #d4edda; /* Light green for completed steps */
}

/* Step Container */
.step-container {
  display: flex;
  align-items: center;
  justify-items: stretch;
  gap: 0.75rem;
}

/* Checkbox for marking steps as done */
.step-checkbox {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

/* Add Step Form */
.step-input-comp {
  margin-top: 20px;
  display: flex;
  gap: 0.75rem;
}

#input-description {
  flex-grow: 1;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid $divider-color;
}

b-button {
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  background-color: $primary-color;
  border-radius: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: $primary-hover; /* Lighter color on hover */
  }
}

@media screen and (max-width: 768px) {
  .steplist-body {
    padding: 0;
  }
}

</style>
