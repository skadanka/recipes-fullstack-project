<template>
  <b-container>
    <div id="search-bar">
        <button to="/search" tag="button" @click="this.handleSearchClick">Search</button>
        <b-input v-model="query" name="query"></b-input>

    </div>
    <p id="filters-trigger" href="#" @click="visible = !visible">Filters</p>
    <br>
    <transition name="filters-transition">
    <b-container id="filters" v-show="visible" >
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
            @updateSelected="updateSelectedCuisine">

        ></filter-list>
        <filter-list 
        v-bind:selected="intolerances"
        title="intolerances" 
        :options="['Dairy', 'Egg', 'Gluten']"
        @updateSelected="updateSelectedCuisine">

        ></filter-list>
    </b-container>
    </transition>
  </b-container>
</template>

<script>
import FilterList from "./FilterList.vue";
export default {
    name: "SearchBar",
    components: {
        FilterList,
    },

    data() {
        return {
            query: "",
            number: 10,
            cuisine: [],
            diet: [],
            intolerances: [],
            recipes: [],
            visible: false,
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
            this.$root.store.search_params = {
                        query: this.query,
                        number: this.number,
                        cuisine: this.cuisine,
                        diet: this.diet,
                        intolerances: this.intolerances
                    };
                    console.log(this.$root.store.search_params)
            this.$emit('searchButtonClick', {
            });
        },
        handleActiveFilters() {
            if(this.active == true){
                
            }
        }
    }


}
</script>

<style>
#filters {
    display: flex;
    background-color: #BAD7E9;
    border: 1px solid #EB455F;

    transition: all 0.5s;
}
#search-bar {
    display: flex;
}

#search-bar button {
    background-color: #2B3467;
    color: #FCFFE7;
}

#filters-trigger {
    display: inline-block;
    cursor: pointer;
    color: #2B3467;
    font-weight: bold;
    font-size: larger;
    width: 100%;
    text-align: right;
}
#filter-trigger::after {
    display: inline-block;
    content: "hello";
    color: black;
}

.filters-transition-enter-active {
  animation: filters-transition-in 0.5s linear; 
}
.filters-transition-leave-active {
  animation: filters-transition-in 0.5s reverse linear;
}
@keyframes filters-transition-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>