<template>
    <div>
          <ol class="instruction-list">
              <li v-for="(instruction, index) in instructions" :key="instruction.id">
                <Instruction :name="instruction.name" :steps="instruction.steps" :index="index"></Instruction>
              </li>
          </ol>
          <div>
            <b-form-group
                id="input-group-instruction"
                label-cols-sm="3"
                label="New Instruction:"
                label-for="input-instruction"
            >
                <b-form-input 
                id="input-instruction" 
                placeholder="Insert Instruction name..."
                v-model="form.newInstructionName"
                :state="validateState('name')"
                ></b-form-input>
            </b-form-group>
            <b-button type="button" @click="addInstruction">Add Instruction:</b-button>
          </div>

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
            }
       }
  }
  </script>
  
  <style scoped>
        .instruction-list {
            min-width: 600px;
            margin-bottom: 50px;
        }
  </style>
  