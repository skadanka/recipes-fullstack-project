<template>
    <b-modal id="creation-modal" ref="creationModal" size="xl" button-size="lg">
      <b-container class="recipe-title-input">
        <h1>{{ Preview.title }}</h1>
        <b-input-group size="lg" prepend="Recipe Title">
          <b-form-input v-model="Preview.title"></b-form-input>
        </b-input-group>          
      </b-container>
      <b-form-group class="recipe-general-details" >
          <b-form-checkbox 
            class="intolrences-class"
            v-model="Preview.vegetarian" 
            value=true
            unchecked-value=false
            size="lg"
            button
            button-variant="primary"
            >
            Vegetarian 🥦
        </b-form-checkbox>
        <b-form-checkbox 
          class="intolrences-class"
            v-model="Preview.vegan" 
            value=true
            unchecked-value=false
            size="lg"
            button
            button-variant="primary">
            Vegan 🥚
        </b-form-checkbox>
        <b-form-checkbox 
            class="intolrences-class"
            v-model="Preview.glutenFree"
            value=true
            unchecked-value=false
            size="lg"
            button
            button-variant="primary">
            Gluten Free <img src="../assets/gluten-free_8887985.png" style="height: 27px;">
        </b-form-checkbox>
        <div style="padding-bottom: none">
            <label for="summary-input">Recipe Summary</label>
            <b-form-textarea 
            v-model="Preview.summary"
            placeholder="Insert general recipe description 📑 "
            rows="3"
            max-rows="8"
            id="summary-input"
            ></b-form-textarea>
        </div>

      </b-form-group>
      <b-row class="extra">
        <b-col>
          <div>
            <label for="timer-picker">Please Choose Cooking Process time</label>
            <b-form-input id="timer-picker" v-model="Preview.readyInMinutes" type="time" style="width: 25%"></b-form-input>
          </div>
          <div class="ingridents">
            <p>Add ingridents:</p>
            <b-input-group prepend="Name" size="sm">
              <b-form-input size="sm" v-model="ingredient.name"></b-form-input>
            </b-input-group>
            <b-input-group prepend="Amount" size="sm">
              <b-form-input size="sm" v-model="ingredient.amount"></b-form-input>
            </b-input-group>
            <b-button @click="addIngrident">Add</b-button>
            Ingredients:
          <ul>
            <li
              v-for="(r, index) in extendedIngredients"
              :key="index"
            >
              <Ingredient 
              :id = r.id
              :original="r.original"
              :aisle="r.aisle"
              :amount="r.amount"
              :image="r.image"
              :consistency="r.consistency"
              :measures="r.measures"
              ></Ingredient>
            </li>
          </ul>
        </div>
      </b-col>
      <b-col>
        <b-card
        title="Card Title"
        :img-src="Preview.image"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2">
          <b-card-text>
            <label for="image-url">Provide recipe image <span style="color:blue;">Link:</span></label>
            <b-form-input 
            type="url" 
            id="image-url" 
            placeholder="insert link"
            v-model="Preview.image"
            ></b-form-input>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
    
      <instruction-list :edit="true" @instructionsListUpdate="handleInstructionListUpdate($event)"></instruction-list>
      <b-button block @click="createRecipeRequest" variant="primary">Save</b-button>
    </b-modal>
      
  </template>
  
  <script>
import InstructionList from './InstructionList.vue';
import Ingredient from './Ingredient.vue';
  export default {
      name: "RecipeCreationModal",
      data() {
          return {
                  selected_intolrences: [],
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
                    name: "",
                    amount: "",
                    id: 1,
                    image: "",
                    consistency: "",
                    measures: ""
                  },
                  instructions: [],
                  userData: {
                    watched: true,
                    favorite: true
                  }
                }
              },
        props: {
          extendedIngredients: {
            type: Array,
            default: () => { return []}
          }
        },
      computed: {
          imgSrc() {
              return this.Preview.image
          }
      },
      components: {
            InstructionList,
            Ingredient
          
      },
      methods: {
        handleInstructionListUpdate(instructionsList){
          this.instructions = instructionsList;
        },
        async createRecipeRequest() {
          try{
            const response = await this.axios.post(
              this.$root.store.server_domain + "/users/create",
              {
                Preview: this.Preview,
                extendedIngreidents: this.extendedIngreidents,
                instructions: this.instructions
              }
              )
              console.log(response.message);
        } catch( error) {

        }
      },
        addIngrident() {
          this.extendedIngredients.push(this.ingredient);
          this.ingredient.id++;
          this.ingredient.name = "";
          this.ingredient.amount = "";
        }
    }
  }
  </script>
  
  <style scoped>
      #creation-modal {
        place-items: center;
      }
      #creation-modal * {
        padding-bottom: 10px;
      }
      .recipe-general-details * {
        padding-left: 5px;
      }

  </style>
  