<template>
  <b-container>
    {{  title  }}
    <div v-for="option in options" :key="option.id">
        <input type="checkbox" 
            :id="option"
            :name="option"
            :value="option"
            v-model="selected"
            @change="updateSelected">
        <label :for="option">{{ option }}</label>
    </div>
  </b-container>


</template>

<script>
export default {
    name: "FilterList",
    props: {
        title: {
            type: String,
            required: true
        },
        options: {
            type: Array,
            required: true
        },
    },
    data() {
        return {
            selected: []
        }
    },

    methods: {
        updateSelected: function(){
            this.$emit('changeSelected', this.selected)
        }
    },
}
</script>

<style>

</style>