<template>
    <div>
          <ol class="instruction-list">
              <li v-for="(instruction, index) in instructions" :key="instruction.id">
                <Instruction :name="instruction.name" :steps="instruction.steps" :index="index"></Instruction>
              </li>
          </ol>
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
      }
  }
  </script>
  
  <style>
        .instruction-list {
            margin-bottom: 50px;
        }
  </style>
  