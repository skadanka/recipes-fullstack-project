<template>
  <div id="ingredient">
        {{ original }}
        {{ amount }}
        {{ consistency }}
  </div>
</template>

<script>
export default {
    props: {
        id: {
            type: Number,
            required: true
        },
        original: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            default: () => {return 0;}
        },
        image: {
            type: String,
            default: () => { return "";}
        },
        consistency: {
            type: String,
            default: () => {return "";}
        },
        measures: {
            type: Object,
            default: () => {return null;}
        },
        aisle: {
            type: String,
            default: () => {return "Supermarket";}
        }
    }
}
</script>

<style>
    
</style>