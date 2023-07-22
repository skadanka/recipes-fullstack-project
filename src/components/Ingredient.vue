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
            required: true
        },
        image: {
            type: String,
            required: true
        },
        consistency: {
            type: String,
            required: true
        },
        measures: {
            type: Object,
            required: true
        },
        aisle: {
            type: String,
            required: true
        }
    }
}
</script>

<style>
    
</style>