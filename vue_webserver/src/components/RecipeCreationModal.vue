<template>
  <b-modal title="Recipe Creation" id="creation-modal" ref="creationModal" size="xl" button-size="lg">
    <b-container class="recipe-title-input">
      <h1>{{ Preview.title }}</h1>
      <b-input-group size="lg" prepend="Recipe Title">
        <b-form-input v-model="Preview.title" placeholder="Give Name to your recipe"></b-form-input>
      </b-input-group>          
    </b-container>
    <br>
    <!-- Warnings Section -->
    <div class="validation-warnings" v-if="warnings.length">
      <b-alert variant="danger" show>
        <ul>
          <li v-for="(warning, index) in warnings" :key="index">{{ warning }}</li>
        </ul>
      </b-alert>
    </div>

    <b-form-group class="recipe-general-details">
      <!-- Checkboxes -->
      <b-form-checkbox 
        class="intolrences-class"
        v-model="Preview.vegetarian"
        value=true
        unchecked-value=false
        size="lg"
        button
        button-variant="primary"
      >Vegetarian 🥦</b-form-checkbox>
      <b-form-checkbox 
        class="intolrences-class"
        v-model="Preview.vegan"
        value=true
        unchecked-value=false
        size="lg"
        button
        button-variant="primary"
      >Vegan 🥚</b-form-checkbox>
      <b-form-checkbox 
        class="intolrences-class"
        v-model="Preview.glutenFree"
        value=true
        unchecked-value=false
        size="lg"
        button
        button-variant="primary"
      >Gluten Free <img src="../assets/gluten-free_8887985.png" style="height: 27px;"></b-form-checkbox>

      <!-- Recipe Summary -->
      <div>
        <label for="summary-input">Recipe Summary</label>
        <b-form-textarea
          v-model="Preview.summary"
          placeholder="Insert general recipe description 📑"
          rows="3"
          max-rows="8"
          id="summary-input"
        ></b-form-textarea>
      </div>
    </b-form-group>

    <b-row class="extra">
      <b-col>
        <!-- Add Ingredients Section -->
        <div>
          <label for="timer-picker">Please Choose Cooking Process time</label>
          <b-form-input id="timer-picker" v-model="Preview.readyInMinutes" type="time" style="width: 25%"></b-form-input>
        </div>

        <div class="ingridents">
          <p>Add ingredients:</p>
          <b-input-group prepend="Name" size="sm">
            <b-form-input size="sm" v-model="ingredient.original"></b-form-input>
          </b-input-group>
          <b-input-group prepend="Amount" size="sm">
            <b-form-input size="sm" v-model="ingredient.amount" type="number"></b-form-input>
          </b-input-group>
          <b-button @click="addIngredient">Add</b-button>
          Ingredients:
          <ul>
            <li v-for="(r, index) in extendedIngredients" :key="index">
              <Ingredient :id="r.id" :original="r.original" :amount="parseInt(r.amount)"></Ingredient>
            </li>
          </ul>
        </div>
      </b-col>

      <b-col>
        <!-- Image Upload Section -->
        <b-card title="Recipe Image" :img-src="Preview.image" img-alt="Image" img-top tag="article" style="max-width: 20rem;" class="mb-2">
          <b-card-text>
            <label for="image-url">Provide recipe image <span style="color: blue;">Link:</span></label>
            <b-form-input type="url" id="image-url" placeholder="insert link" v-model="Preview.image"></b-form-input>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>

    <!-- Instructions Section -->
    <instruction-list :edit="true" @instructionsListUpdate="handleInstructionListUpdate($event)"></instruction-list>

    <!-- Save Button -->
    <b-button block @click="validateAndCreateRecipe" variant="primary">Save</b-button>
  </b-modal>
</template>

<script>
import InstructionList from './InstructionList.vue';
import Ingredient from './Ingredient.vue';

export default {
name: "RecipeCreationModal",
data() {
  return {
    warnings: [], // To store validation warnings
    Preview: {
      title: "",
      readyInMinutes: 0,
      image: "",
      vegan: false,
      vegetarian: false,
      glutenFree: false,
      summary: "",
      popularity: 0,
    },
    ingredient: {
      original: "",
      amount: 0,
      id: 1,
      image: "",
      consistency: "",
      measures: null
    },
    extendedIngredients: [],
    instructions: [],
  };
},
components: {
  InstructionList,
  Ingredient
},
methods: {
  // Method to validate inputs
  validateAndCreateRecipe() {
    this.warnings = [];

    // Validation for required fields
    if (!this.Preview.title) this.warnings.push("Title is required.");
    if (!this.Preview.summary) this.warnings.push("Summary is required.");
    if (!this.Preview.image) this.warnings.push("Image URL is required.");
    if (this.extendedIngredients.length === 0) this.warnings.push("At least one ingredient is required.");
    if (this.instructions.length === 0) this.warnings.push("At least one instruction is required.");

    // If there are no warnings, proceed with the creation
    if (this.warnings.length === 0) {
      this.createRecipeRequest();
    }
  },

  async createRecipeRequest() {
    try {
      const response = await this.axios.post(
        this.$root.store.server_domain + "/users/create",
        {
          Preview: this.Preview,
          extendedIngredients: this.extendedIngredients,
          instructions: this.instructions,
        }
      );
      console.log(response.message);
    } catch (error) {
      console.log(error);
    }
  },

  addIngredient() {
    let new_ingredient = { id: this.ingredient.id, original: this.ingredient.original, amount: this.ingredient.amount };
    this.extendedIngredients.push(new_ingredient);
    this.ingredient.id++;
    this.ingredient.original = "";
    this.ingredient.amount = "";
  },

  handleInstructionListUpdate(instructionsList) {
    this.instructions = instructionsList;
  },
},
};
</script>

  
<style scoped lang="scss">
  .btn-disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.validation-warnings {
  margin-bottom: 1rem;
}
/* Enabled Button Style */
.btn-enabled {
  background-color: $primary-color; /* Change to your primary color */
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-enabled:hover {
  background-color: $primary-hover; /* Lighter shade for hover effect */
}

  /* Modal Layout */
  #creation-modal {
    display: grid;
    grid-gap: 1.5rem;
    padding: 2rem;
    background-color: $background-color; /* Global variable for background */
    border-radius: 12px;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .recipe-title-input h1 {
    font-size: 1.75rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    color: $primary-color; /* Global primary color */
  }
  
  /* Recipe Title Input */
  .recipe-title-input b-input-group {
    margin-bottom: 1.5rem;
  }
  
  .recipe-general-details {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .intolrences-class {
    display: inline-block;
    padding: 0.5rem;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .intolrences-class:hover {
    background-color: lighten($secondary-color, 10%); /* Hover effect */
  }
  
  /* Recipe Summary */
  #summary-input {
    margin-top: 1rem;
    padding: 0.75rem;
    border-radius: 8px;
    border: 1px solid $divider-color;
    font-size: 1rem;
    transition: border-color 0.3s ease;
    
    &:focus {
      border-color: $primary-color;
      box-shadow: 0 0 0 0.2rem rgba($primary-color, 0.25);
    }
  }
  
  /* Ingredients Section */
  .ingridents {
    margin-top: 1.5rem;
  }
  
  .ingridents p {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  .b-input-group {
    margin-bottom: 0.75rem;
  }
  
  ul {
    list-style-type: none;
    padding-left: 0;
  }
  
  ul li {
    font-size: 1rem;
    padding: 0.5rem;
    background-color: $card-background;
    margin-bottom: 0.5rem;
    border-radius: 8px;
  }
  
  /* Add Ingredient Button */
  .b-button {
    margin-top: 1rem;
    padding: 0.75rem 1.5rem;
    background-color: $primary-color;
    border-radius: 8px;
    font-weight: 600;
    transition: background-color 0.3s ease;
  
    &:hover {
      background-color: $primary-hover;
    }
  }
  
  /* Image Card */
  .b-card {
    max-width: 100%;
    margin-bottom: 1.5rem;
    background-color: $card-background;
    border: none;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .b-card-title {
    font-weight: bold;
    color: $primary-color;
  }
  
  .b-card-text {
    padding: 1rem;
  }
  
  /* Time Picker */
  #timer-picker {
    margin-top: 1rem;
    padding: 0.5rem;
    border-radius: 8px;
    border: 1px solid $divider-color;
    width: 100%;
    max-width: 150px;
  
    &:focus {
      border-color: $primary-color;
      box-shadow: 0 0 0 0.2rem rgba($primary-color, 0.25);
    }
  }
  
  /* Save Button */
  .b-button-primary {
    margin-top: 2rem;
    padding: 1rem 2rem;
    background-color: $primary-color;
    border-radius: 8px;
    font-size: 1.2rem;
    font-weight: bold;
    transition: background-color 0.3s ease;
    
    &:hover {
      background-color: $primary-hover;
      transform: translateY(-3px); /* Slight lift effect */
    }
  }
  
  </style>
  