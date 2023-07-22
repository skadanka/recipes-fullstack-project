<template>
    <div >
        <b-card>
          <ol class="instruction-list">
              <li v-for="(instruction, index) in instructions" :key="instruction.id">
                <Instruction :name="instruction.name" :steps="instruction.steps" :index="index" :edit="edit" @instructionUpdate="handleInstructionUpdate($event)"></Instruction>
              </li>
          </ol>
          <div v-if="edit">
            <b-form-input 
            id="input-instruction" 
            placeholder="Insert Instruction name..."
            v-model="form.newInstructionName"
            :state="validateState('name')"
            ></b-form-input>
            <b-button type="button" @click="addInstruction">Add Instruction:</b-button>
         </div>
        </b-card>

    </div>
  </template>
  
  <script>
  import Instruction from './Instruction.vue';
  import { required } from "vuelidate/lib/validators"

  export default {
      name: "InstructionList",
      props: {
  
          instructions: {
              type: Array,
              default: () => {return [];}
          },
          edit: {
            type: Boolean,
            default: () => {return false;}
          }
      },
      components: {
          Instruction
      },
      data() {
        return {
            form: {
                newInstructionName: "",
            }
        }
      },
      validations: {
        form: {
            name: {
                required,
                length: (n) => { n.length > 0}
            }
        }
      },
       methods: {

            validateState(param) {
                const { $dirty, $error } = this.$v.form[param];
                return $dirty ? !$error : null;
            },
            
            addInstruction() {
                this.instructions.push({name: this.form.newInstructionName})
                this.$emit('instructionUpdate', this.instructions)
                this.form.newInstructionName = "";

            },
            handleInstructionUpdate(instruction) {
                this.instructions[instruction.index] = instruction;
                this.$emit('instructionsListUpdate', this.instructions)
            }
       }
  }
  </script>
  
  <style scoped>
        .instruction-list {
            min-width: 600px;
            width: 800px;
            margin-bottom: 50px;
            padding: 15px;
        }

  </style>
  