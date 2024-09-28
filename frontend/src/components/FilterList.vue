<template>
  <b-container>
    <h4 class="filter-title">{{  title  }}</h4>
    <b-form-select 
    :id="`dropdown-${title}`" :text="title" class="m-md-2" size="8"
    v-model="selected"
    :options="options"
    @change="updateSelected"
    >
    </b-form-select>
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
            selected: null
        }
    },

    methods: {
        updateSelected: function(){
            this.$emit('changeSelected', this.selected)
        }
    },
}
</script>

<style scoped>
    .filter-title {
        color: #EB455F;
    }
</style>