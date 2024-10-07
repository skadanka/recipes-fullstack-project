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

<style lang="scss" scoped>

/* Search Bar Container */
#search-bar {
  display: flex;
  gap: 1rem;
  align-items: center;
  background-color: $card-background;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* Search Button */
#search-bar button {
  background-color: $primary-color;
  color: $card-background;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: $primary-hover;
    transform: translateY(-3px);
  }
}

/* Search Input */
#search-bar b-form-input {
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid $divider-color;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: $primary-color;
    box-shadow: 0 0 0 0.2rem rgba(33, 150, 243, 0.25);
  }
}

/* Filters Trigger */
#filters-trigger {
  display: inline-block;
  cursor: pointer;
  color: $primary-color;
  font-weight: 600;
  font-size: 1.2rem;
  margin-top: 1rem;
  text-align: right;
  transition: color 0.3s ease;

  &:hover {
    color: $primary-hover;
  }
}

/* Filters Container */
#filters {
  display: flex;
  gap: 1rem;
  background-color: $background-color;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

/* Radio Button Styling */
.radio-container {
  display: flex;
  gap: 1rem;
}

.radio-container label {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  background-color: $divider-color;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.radio-container input:checked + label {
  background-color: $primary-color;
  color: $card-background;
}

.radio-container input {
  display: none;
}

/* Responsive Design */
@media (max-width: 768px) {
  #search-bar {
    flex-direction: column;
    gap: 0.5rem;
  }

  #filters {
    flex-direction: column;
    gap: 1rem;
  }

  #search-bar button, #search-bar b-form-input {
    width: 100%;
  }

  #filters-trigger {
    text-align: center;
    margin-top: 1.5rem;
  }
}

</style>
