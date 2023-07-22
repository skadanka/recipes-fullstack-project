<template>
    <div class="instruction-body">
    <b-button block id="collapse-button" v-b-toggle="indexString" variant="primary">{{ nameHandler }}</b-button>
    <b-collapse visable class="instruction-collapse mt-2" :id="indexString" accordion="instructions-accordion"> 
        <b-card>
            <stepsList :steps="steps" :index="index" :edit="edit" @stepsUpdate="handleStepsUpdate($event)"></stepsList>
        </b-card>
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
            default: () => { return [];}
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
        stepsList
    },
    computed: {
        nameHandler() { return this.name? this.name: "Click To Open"},
        indexString() { return String(this.index);}
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
    
<style scoped>
    #collapse-button {
        width: 100%;
        background-color: #EB455F;
        border: 1px solid black;
    }
    .instruction-body {
            padding: 5px;
        }
</style>
  