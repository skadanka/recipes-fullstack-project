<template>
    <div class="step-body">
        <b-button
            :title="`${number}. ${step}`"
            id="card"
            v-b-toggle="stepNumberString"
            type="button"
            block
            style="min-height: 40px; width: 100%;"
            >
        {{ step }}</b-button>
        <b-collapse class="card-text-collapse" :id="stepNumberString" accordion="steplist-accordion">
            <b-card-text id="card-text">
                <IngredientCompactContainer @ingredientAdded="handleIngredientAdded(ingredients)"
                    :ingredients="ingredients"
                    :edit="edit"
                ></IngredientCompactContainer>
                <br>
                <EquipmentContainer @equipmentAdded="handleEquipmentAdded(equipments)"
                    :equipments="equipments"
                    :edit="edit">
                </EquipmentContainer>
            </b-card-text>
       
        </b-collapse>
    </div>
  </template>

  
  <script>
import EquipmentContainer from './EquipmentContainer.vue'
import IngredientCompactContainer from './IngredientCompactContainer.vue'


export default {
      name: "Step",
      props: {
          number: {
              type: Number,
              required: true
          },
          step: {
              type: String,
              required: true
          },
          ingredients: {
              type: Array,
              default: () => {return [];}
          },
          equipments: {
              type: Array,
              default: () => {return [];}
          },
          index: {
            type: Number,
            required: true
          },
          edit: {
            type: Boolean,
            required: true
          }


      },
      components: {
        EquipmentContainer,
        IngredientCompactContainer
      },
      computed: {
        stepNumberString() { return `${this.index}.${this.number}`}
      },
      methods: {
        handleIngredientAdded(ingredients){
            this.ingredients = ingredients;
            this.stepUpdated();
        },
        handleEquipmentAdded(equipments){
            this.equipments = equipments;
            this.stepUpdated();
        },
        stepUpdated(){
            const new_step = {
                            number: this.number,
                            index: this.index,
                            step: this.step,
                            ingredients: this.ingredients,
                            equipments: this.equipments
                        }
            this.$emit('stepUpdate', new_step);
        }
      }

  }
  </script>
  
  <style scoped>
    .card-text-collapse *{
        font-weight: bold;
    }

    .step-body {
        padding: 5px;
    }

  </style>
  