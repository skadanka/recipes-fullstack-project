<template>
    <div>
        <!-- Instructions List -->
        <ol class="instruction-list">
          <li v-for="(instruction, index) in instructions" :key="instruction.id">
            <Instruction 
              :name="instruction.name" 
              :steps="instruction.steps" 
              :index="index" 
              :edit="edit" 
              @instructionUpdate="handleInstructionUpdate"
            />
          </li>
        </ol>
  
        <!-- Add New Instruction Section -->
        <div v-if="edit" class="instruction-input">
          <b-form-input
            id="input-instruction"
            placeholder="Insert Instruction name..."
            v-model="form.newInstructionName"
            :state="validateState('newInstructionName')"
            @input="$v.form.newInstructionName.$touch()"
          ></b-form-input>
  
          <b-button 
            type="button" 
            :disabled="!$v.form.newInstructionName.$pending && $v.form.newInstructionName.$invalid"
            @click="addInstruction"
          >
            Add Instruction
          </b-button>
        </div>
    </div>
  </template>
  
  <script>
  import Instruction from './Instruction.vue';
  import { required, minLength } from "vuelidate/lib/validators";
  
  export default {
    name: "InstructionList",
    components: {
      Instruction,
    },
    props: {
      instructions: {
        type: Array,
        default: () => [],
      },
      edit: {
        type: Boolean,
        default: () => false,
      },
    },
    data() {
      return {
        form: {
          newInstructionName: "",
        },
      };
    },
    validations: {
      form: {
        newInstructionName: {
          required,
          minLength: minLength(3),
        },
      },
    },
    methods: {
      validateState(field) {
        const { $dirty, $error } = this.$v.form[field];
        return $dirty ? !$error : null;
      },
      
      addInstruction() {
        // Add the instruction only if it's valid
        if (!this.$v.form.$invalid) {
          this.instructions.push({ 
            name: this.form.newInstructionName, 
            steps: [] 
          });
          this.$emit('instructionUpdate', this.instructions);
          this.form.newInstructionName = "";
          this.$v.form.$reset(); // Reset validation state after adding
        }
      },
  
      handleInstructionUpdate(updatedInstruction) {
        // Update the instruction in the list
        this.instructions[updatedInstruction.index] = updatedInstruction;
        this.$emit('instructionsListUpdate', this.instructions);
      },
    },
  };
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

.instruction-body {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
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


/* Instruction List */
.instruction-list {
  max-width: none !important;
  display: block;
}

.instruction-list li {
  padding: 0.75rem;
  background-color: $card-background;
  border-radius: 8px;
  margin-bottom: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}


/* Ensure responsiveness for mobile and smaller screens */
@media (max-width: 768px) {
  .instruction-list {
    padding: 10px;
    gap: 10px;
    margin-bottom: 30px;
  }

  .instruction-input {
    margin-top: 15px;
    gap: 8px;
  }

  .card-body {
    padding: 0;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .instruction-list {
    max-width: 80%;
    margin: 0 auto;
    padding: 0;
  }

  .instruction-input {
    max-width: 80%;
  }
  .card-body {
      padding: 0;
  }
}


@media (min-width: 1025px) {
  .instruction-list {
    max-width: 600px;
    padding: 0;
  }

  .instruction-input {
    max-width: 600px;
    margin: 0 auto;
  }
  .card-body {
      padding: 0;
  }
}

  
  </style>
  