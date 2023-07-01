<template>
    <div>
        <h4>Ingredients: </h4>
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
    </div>
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

<style scoped>
    #ingredients-container {
        display: flex;
        gap: 10px;
        width: 100%;
        flex-wrap: wrap;
    }
    
    .ingredient {
        width: 100px;
        height: 100px;
        border: 1px solid #080808;
        text-align: center;
        background-color: #BAD7E9;
    }
</style>