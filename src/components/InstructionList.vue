<template>
    <div>
          <ol class="instruction-list">
              <li v-for="(instruction, index) in instructions" :key="instruction.id">
                <Instruction :name="instruction.name" :steps="instruction.steps" :index="index"></Instruction>
              </li>
          </ol>
          <button type="button" @click="addInstruction">Click Me!</button>

    </div>
  </template>
  
  <script>
  import Instruction from './Instruction.vue';
  export default {
      name: "InstructionList",
      props: {
  
          instructions: {
              type: Array,
              required: true
          }
      },
      components: {
          Instruction
      },
       methods: {
            addInstruction() {
                this.instructions.push({name: "new Instructions"})
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
  