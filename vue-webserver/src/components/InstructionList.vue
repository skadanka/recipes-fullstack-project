<template>
    <div>
      <b-card class="card">
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
      </b-card>
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
  
<style scoped>

  .card {
    border: 0px;
    list-style: none;
    margin-left: 0;
    padding: 0;
}

li {
    list-style: none;
    width: 100%;
}
  .instruction-list {
        list-style-type: none;
        margin-bottom: 50px;
        margin: 0 0;
        display: flex;
        flex-direction: column;
        gap: 15px;
        -webkit-padding-start: 0;
        width: 100%;
        min-width: 100%;
        max-width: 100%;
        float: left;

    }

    /* The form input and button in edit mode */
    .instruction-input {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 20px;
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
}

@media (min-width: 769px) and (max-width: 1024px) {
  .instruction-list {
    max-width: 80%;
    margin: 0 auto;
  }

  .instruction-input {
    max-width: 80%;
    margin: 0 auto;
  }
}

@media (min-width: 1025px) {
  .instruction-list {
    max-width: 600px;
    margin: 0 auto;
  }

  .instruction-input {
    max-width: 600px;
    margin: 0 auto;
  }
}

  
  </style>
  