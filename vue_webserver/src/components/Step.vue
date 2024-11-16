<template>
    <div class="step-body">
        <b-button
            :title="`${number}. ${step}`"
            id="card"
            v-b-toggle="stepNumberString"
            :disabled="!ingredients.length"
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
                    :stepId="number"
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
  
<style scoped lang="scss">

/* Step Body Container */
.step-body {
  width: 100%;
  padding: 1rem;
  background-color: $card-background; /* Use a card background color */
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05); /* Soft shadow */
  transition: background-color 0.3s ease;
}

#card:disabled {
  background-color: $primary-color;
  opacity: 1;
}
/* Button for Step (Collapsible Trigger) */
#card {
  font-weight: 600;
  background-color: $primary-color;
  color: $card-background;
  border-radius: 8px;
  padding: 1rem;
  font-size: 1.1rem;
  text-align: left;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: $primary-hover;
    transform: translateY(-3px); /* Slight lift on hover */
  }
}

/* Collapsible Section for Step Details */
.card-text-collapse {
  padding: 1rem;
  background-color: $background-color;
  border-radius: 8px;
  margin-top: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); /* Slight shadow */
}

.card-text-collapse * {
  font-weight: 400; /* Regular weight for inner text */
  color: $text-color; /* Standard text color */
}

/* Ingredient and Equipment Containers */
#card-text {
  padding: 1rem;
  background-color: $card-background;
  border-radius: 8px;
}

@media  (max-width: 768px) {
  .step-body {
    padding: 0;
  }
}
</style>
