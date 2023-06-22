<template>
    <div>
        <b-card
            :title="`${number}. ${step}`"
            id="card"
            v-b-toggle="stepNumberString"
            type="button"
        >
        <b-collapse class="card-text-collapse" :id="stepNumberString">
            <b-card-text id="card-text">
                <IngredientCompactContainer
                    :ingredients="ingredients"
                ></IngredientCompactContainer>
                <EquipmentContainer
                    :equipments="equipments">
                </EquipmentContainer>
            </b-card-text>
        </b-collapse>
        </b-card>
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
              required: true
          },
          equipments: {
              type: Array,
              required: true
          },


      },
      components: {
        EquipmentContainer,
        IngredientCompactContainer
      },
      computed: {
        stepNumberString() { return String(this.number)}
      }
  }
  </script>
  
  <style>


  </style>
  