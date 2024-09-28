<template>
  <b-container>
    <div id="search-bar">
        <button to="/search" tag="button" @click="this.handleSearchClick">Search</button>
        <b-form-input v-model="query" name="query" type="search"></b-form-input>

    </div>
    <p id="filters-trigger" href="#" @click="visible = !visible">Filters</p>

    <b-container  v-show="visible">
        <div class="radio-container" id="radio-results-amount">
            <div>
                <input name="amount" type="radio" id="five" value="5" v-model="number"/>
                <label for="five">5</label>
            </div>
            <div>
                <input name="amount" type="radio" id="ten" value="10" v-model="number" checked/>
                <label for="ten">10</label>
            </div>
            <div>
                <input name="amount" type="radio" id="fiften" value="15" v-model="number"/>
                <label for="fiften">15</label>
            </div>
        </div>
        <div class="radio-container" id="radio-sort">
            <!-- <div>
                <input name="sort-type" type="radio" id="none" value="1"/>
                <label for="none">None</label>
            </div> -->
            <div>
                <input name="sort-type" type="radio" id="Popularity" value="2" @click="this.handlePopulairtySort"/>
                <label for="Popularity">Popularity</label>
            </div>
            <div>
                <input name="sort-type" type="radio" id="Time" value="3" @click="this.handleReadyInMinutes"/>
                <label for="Time">Time</label>
            </div>
        </div>
        <br>
        <b-container id="filters">
            <filter-list 
                v-bind:selected="cuisine"
                title="Cusine Type" 
                :options="LoadCuisinesFile" 
                @changeSelected="updateSelectedCuisine">
            </filter-list>
            
            <filter-list 
                v-bind:selected="diet"
                title="Diet" 
                :options="LoadDietsFile"
                @changeSelected="updateSelectedDiet">

            ></filter-list>
            <filter-list 
            v-bind:selected="intolerances"
            title="intolerances" 
            :options="LoadIntolerancesFile"
            @changeSelected="updateSelectedintolerances">

            ></filter-list>
        </b-container>
    </b-container>
  </b-container>
</template>

<script>
import FilterList from "./FilterList.vue";

import cuisnesfile from "../assets/filters/cuisines";
import intolerancesfile from "../assets/filters/Intolerances";
import dietfile from "../assets/filters/diets";

export default {
    name: "SearchBar",
    components: {
        FilterList,
    },

    data() {
        return {
            query: "",
            number: 10,
            cuisine: null,
            diet: null,
            intolerances: null,
            recipes: [],
            visible: true,
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

        handleSearchClick: async function () {
            sessionStorage.setItem("searchParams", JSON.stringify({
                        query: this.query,
                        number: this.number,
                        cuisine: this.cuisine,
                        diet: this.diet,
                        intolerances: this.intolerances
                    }));
            document.querySelector('input[name="sort-type"]').checked = false;

            this.$emit('searchButtonClick', {
            });
        },
        handleActiveFilters() {
            if(this.active == true){
                
            }
        },
         
        handlePopulairtySort() {
            this.$emit('sortRecipesPopulairtyClick', {})
        },
        handleReadyInMinutes() {
            this.$emit('sortRecipesReadyInMinutesClick', {})
        }

    },
    mounted() {

    },
    computed: {
        LoadCuisinesFile() {
            return cuisnesfile;
        },
         LoadIntolerancesFile() {
            return intolerancesfile;
        },
         LoadDietsFile() {
            return dietfile;
        },
    }


}
</script>

<style scoped>
#filters {
    display: flex;
    background-color: #BAD7E9;
    border: 1px solid #EB455F;

    transition: all 0.5s;
}
#search-bar {
    display: flex;
}

.radio-container {
    display: flex;
    gap: 5px;
    margin-top: 10px;
}

.radio-container  label {
    margin-left: 5px;
    font-size: larger;
    display: inline-block;
    border: 2px solid #EB455F;
    padding: 0 40px;
    border-radius: 5px;
}

.radio-container input:checked+label {
    color: white;
    background-color: #EB455F;
}

.radio-container input {
    display: none
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