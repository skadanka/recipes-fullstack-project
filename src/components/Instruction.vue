<template>
    <div>
    <b-button id="collapse-button" v-b-toggle.instruction-collapse variant="primary">{{ name }}</b-button>
    <b-collapse visable id="instruction-collapse" class="mt-2">
        <div>
            <stepsList :steps="steps"></stepsList>
        </div>
    </b-collapse>
    </div>
  </template>
  
<script>

import stepsList from './StepsList.vue';
export default {
    name: "Instruction",
    props:{
        name: {
            type: String,
            required: true
        },
        steps: {
            type: Array,
            required: true
        },
    },
    components: {
        stepsList
    }
}
</script>
    
<style>
    #collapse-button {
        width: 1000px;
    }
</style>
  