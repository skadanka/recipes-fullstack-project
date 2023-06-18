<template>
  <b-container>
    <div id="search-bar">
        <button to="/search" tag="button" @click="this.handleSearchClick">Search</button>
        <b-input v-model="query" name="query"></b-input>
    </div>
    <br>
    <b-container id="filters">
        <filter-list 
            v-bind:selected="cuisine"
            title="Cusine Type" 
            :options="['Amrican', 'Asian', 'African']" 
            @changeSelected="updateSelectedCuisine">
        </filter-list>
        
        <filter-list 
            v-bind:selected="diet"
            title="Diet" 
            :options="['GlutenFree', 'Vegan', 'Vegetarian']"
            @changeSelected="updateSelectedDiet">

        ></filter-list>
        <filter-list 
        v-bind:selected="intolerances"
        title="intolerances" 
        :options="['Dairy', 'Egg', 'Gluten']"
        @changeSelected="updateSelectedintolerances">

        ></filter-list>
    </b-container>
  </b-container>
</template>

<script>
import FilterList from "./FilterList.vue";

export default {
    name: "SearchBar",
    components: {
        FilterList
    },

    data() {
        return {
            query: "",
            number: 10,
            cuisine: [],
            diet: [],
            intolerances: [],
            recipes: []
        }
    },
    methods: {
        updateSelectedCuisine(variable) {
            this.cuisine = variable;
        },
        updateSelectedDiet(variable){
            this.diet = variable;
        },
        updateSelectedintolerances(variable){
            this.intolerances = variable;
        },
        handleSearchClick: function () {
            console.log("Search Bar click");
            this.$emit('searchButtonClick', {
                values: {
                        query: this.query,
                        number: this.number,
                        cuisine: this.cuisine,
                        diet: this.diet,
                        intolerances: this.intolerances
                    }  
            });
        }
    }


}
</script>

<style>
#filters {
    display: flex;
}
#search-bar {
    display: flex;
}
</style>