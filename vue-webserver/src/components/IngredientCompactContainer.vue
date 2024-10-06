<template>
    <div class="ingredients-body">
      <!-- Ingredients Container -->
      <b-container id="ingredients-container" fluid v-if="ingredients && ingredients.length">
        <h4>Ingredients:</h4>
        <div v-for="(ing, index) in ingredients" :key="index" class="ingredient">
          <IngredientCompact
            :id="ing.id"
            :name="ing.name"
            :localizedName="ing.localizedName"
            :image="ing.image"
          />
        </div>
      </b-container>
  
      <!-- Input for Adding Ingredients -->
      <div class="ing-input" v-if="edit">
        <b-form-input
          id="input-ingredient"
          placeholder="Ingredient name..."
          v-model="form.ingredientName"
          @input="$v.form.ingredientName.$touch()"  
    
          :state="validateState('ingredientName')" 
        />
        <b-button 
          type="button" 
          @click="addIngredient" 
          variant="secondary" 
          pill
          :disabled="!$v.form.ingredientName.$pending && $v.form.ingredientName.$invalid" 
        >
          Add Ingredient
        </b-button>
      </div>
    </div>
  </template>
  
  <script>
  import IngredientCompact from './IngredientCompact.vue';
  import { required, minLength } from "vuelidate/lib/validators";
  
  export default {
    props: {
      ingredients: {
        type: Array,
        default: () => [],
      },
      edit: {
        type: Boolean,
        required: true,
      },
      stepId: {
        type: Number,
        required: true,
        default: () => 0
      }
    },
    components: {
      IngredientCompact,
    },
    data() {
      return {
        form: {
          ingredientName: "",
        },
      };
    },
    validations: {
      form: {
        ingredientName: {
          required,
          minLength: minLength(2), // Ensure the name has at least 2 characters
        },
      },
    },
    methods: {
      validateState(field) {
        const { $dirty, $error } = this.$v.form[field];
        return $dirty ? !$error : null;
      },
      addIngredient() {
        // Only add ingredient if form is valid
        this.$v.form.$touch(); // Touch the form to trigger validation
        if (!this.$v.form.$invalid) {
          this.ingredients.push({
            id: this.ingredients.length + 1, // Increment ID correctly
            name: this.form.ingredientName,
            localizedName: "",
            image: "",
          });
          this.$emit('ingredientAdded', this.ingredients); // Emit the event with updated ingredients
          this.form.ingredientName = "";
          this.$v.form.$reset(); // Reset validation state after adding
        }
      },

    },
}
  </script>
  
  <style scoped>
  .ingredients-body {
    border-bottom: 1px solid black;
    padding: 8px;
  }
  
  #ingredients-container {
    display: flex;
    gap: 10px;
    width: 100%;
    flex-wrap: wrap;
    padding: 15px;
  }
  
  .ing-input {
    margin-top: 15px;
  }
  </style>
  