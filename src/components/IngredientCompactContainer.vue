<template>
    <b-container id="ingredients-container" fluid>
        <div v-for="ing in ingredients" :key="ing.name" class="ingredient">
            <IngredientCompact
                :id="ing.id"
                :name="ing.name"
                :localizedName="ing.localizedName"
                :image="ing.image"
            >
            </IngredientCompact>
        </div>
    </b-container>
</template>

<script>
import IngredientCompact from './IngredientCompact.vue'


export default {
    props: {
        ingredients: {
            type: Array,
            required: true
        }
    },
    components: {
        IngredientCompact
    }

}
</script>

<style>
    #ingredients-container {
        display: flex;
    }
    
    .ingredient {
        width: 100px;
        height: 100px;
        border: 1px solid black;
    }
</style>