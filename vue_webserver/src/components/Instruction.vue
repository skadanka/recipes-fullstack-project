<template>
    <div class="instruction-body">
        <!-- Collapsible Button -->
        <b-button block id="collapse-button" v-b-toggle="indexString" variant="primary">{{ nameHandler }}</b-button>

        <!-- Collapsible Section -->
        <b-collapse visible class="instruction-collapse mt-2" :id="indexString" accordion="instructions-accordion"> 
            <b-card class="instruction-card">
                <stepsList :steps="steps" :index="index" :edit="edit" @stepsUpdate="handleStepsUpdate($event)"></stepsList>
            </b-card>
        </b-collapse>
    </div>
</template>

<script>
import StepsList from './StepsList.vue';
export default {
    name: "Instruction",
    props:{
        name: {
            type: String,
            required: true
        },
        steps: {
            type: Array,
            default: () => { return []; }
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
        StepsList
    },
    computed: {
        nameHandler() { return this.name ? this.name : "Prepare a Meal!"; },
        indexString() { return String(this.index); }
    },
    methods: {
        handleStepsUpdate(stepsList) {
            this.steps = stepsList;
            this.$emit('instructionUpdate', {
                name: this.name,
                steps: this.steps,
                index: this.index,
            })
        }
    }
}
</script>

<style scoped lang="scss">

/* Instruction Input Container */
.instruction-input {
  display: flex;
  align-items: center;
  gap: 1rem; /* Adds spacing between the input and the button */
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: $background-color; /* Use your defined background color */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05); /* Subtle shadow */
}

/* Instruction List Styling */
.instruction-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem; /* Add spacing between the list items */
}

.instruction-list li {
  padding: 1rem;
  background-color: $card-background;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); /* Soft shadow */
}

/* Instruction Input Field */
#input-instruction {
  flex-grow: 1; /* Ensures the input field takes up available space */
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid $divider-color; /* Light gray for the border */
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: $primary-color;
    box-shadow: 0 0 0 0.2rem rgba($primary-color, 0.25);
  }
}

/* Add Instruction Button */
.b-button {
  padding: 0.75rem 1.5rem;
  background-color: $primary-color;
  border-radius: 8px;
  font-weight: bold;
  color: white;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: $primary-hover;
    transform: translateY(-2px); /* Slight lift on hover */
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
}

/* Ensure responsiveness for mobile and smaller screens */
@media (max-width: 768px) {
  .instruction-list {
    padding: 10px;
    gap: 10px;
  }

  .instruction-input {
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    margin-top: 1rem;
  }

  #input-instruction {
    width: 100%;
  }

  .b-button {
    width: 100%;
    text-align: center;
  }
}

/* Adjustments for tablets */
@media (min-width: 769px) and (max-width: 1024px) {
  .instruction-list {
    max-width: 90%;
    margin: 0 auto;
  }

  .instruction-input {
    max-width: 90%;
    margin: 0 auto;
  }
}

/* Adjustments for larger screens */
@media (min-width: 1025px) {
  .instruction-list {
    max-width: 800px;
    margin: 0 auto;
  }

  .instruction-input {
    max-width: 800px;
    margin: 0 auto;
  }
}

</style>
