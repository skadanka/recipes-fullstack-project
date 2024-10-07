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
        nameHandler() { return this.name ? this.name : "Click To Open"; },
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

/* Instruction Body */
.instruction-body {
    padding: 1rem;
    border: none;
    width: 100%;
}

/* Collapsible Button */
#collapse-button {
    width: 100%;
    background-color: $primary-color; /* Modern primary color */
    color: $card-background;
    border-radius: 8px;
    font-weight: 600;
    text-align: center;
    padding: 12px 0;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        background-color: $primary-hover; /* Lighter shade on hover */
        transform: translateY(-2px); /* Slight lift on hover */
    }
}

/* Instruction Collapse */
.instruction-collapse {
    margin-top: 1rem;
    background-color: $card-background; /* Use card background color */
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); /* Soft shadow */
}

/* Instruction Card */
.instruction-card {
    border: none;
    background-color: $card-background;
    box-shadow: none;
    padding: 1rem;
}

/* Transitions */
.instruction-collapse-enter-active,
.instruction-collapse-leave-active {
    transition: all 0.3s ease;
}

.instruction-collapse-enter,
.instruction-collapse-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}

</style>
