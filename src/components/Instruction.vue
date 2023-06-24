<template>
    <div>
    <b-button id="collapse-button" v-b-toggle="indexString" variant="primary">{{ nameHandler }}</b-button>
    <b-collapse visable class="instruction-collapse mt-2" :id="indexString">
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
        index: {
            type: Number,
            required: true
        }
    },
    components: {
        stepsList
    },
    computed: {
        nameHandler() { return this.name? this.name: "Click Open"},
        indexString() { return String(this.index);}
    }
}
</script>
    
<style>
    #collapse-button {
        width: 1000px;
        background-color: #EB455F;
        border: 1px solid black;
    }
</style>
  