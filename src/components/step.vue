<template>
    <div>
        <b-card
            :title="`${number}. ${step}`"
            id="card"
            v-b-toggle.card-text-collapse
            type="button"
        >
        <b-collapse id="card-text-collapse">
            <b-card-text id="card-text">
                <span>Time to finish step: {{ length.number }} {{ length.unit }} ⏲</span>
                <b-list-group>
                    <b-list-group-item name="list-group-ingredients">
                        <b-list-group-item v-for="ing in ingredients" :key="ing.id">
                            <Ingredient
                                :id="ing.id"
                                :name="ing.name"
                                :localizedName="ing.localizedName"
                                :image="ing.image"
                            ></Ingredient>
                        </b-list-group-item>
                    </b-list-group-item>
                </b-list-group>
                <b-list-group>
                    <b-list-group-item v-for="e in equipment" :key="e.id" name="list-group-equipment">
                        <Equipment
                            :id="e.id"
                            :image="e.image"
                            :name="e.name"
                        ></Equipment>
                    </b-list-group-item>
                </b-list-group>
            </b-card-text>
        </b-collapse>
        </b-card>
    </div>
  </template>
  
  <script>
import Equipment from './Equipment.vue'
import Ingredient from './Ingredient.vue'


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
          equipment: {
              type: Array,
              required: true
          },
          length: {
              type: Object,
              required: true
          }
  
      },
      components: {
        Equipment,
        Ingredient
      }
  }
  </script>
  
  <style>
  
  </style>
  