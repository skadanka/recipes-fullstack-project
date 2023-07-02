<template>
    <div>
        <b-container id="ingredients-container" fluid   v-if="ingredients && ingredients.length">
            <h4>Ingredients: </h4>
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
        <div @click.stop>
            <b-form-group
                id="input-group-ingredient"
                label-cols-sm="3"
                label="Add Ingredient:"
                label-for="input-ingredient"
            >
            <b-form-input
                id="input-ingredient"
                placeholder="ingredient name..."
                v-model="form.ingredientName"
                :state="validateState('name')" 
            ></b-form-input>
            <b-button type="button" @click="addIngredient">Add Ingredient:</b-button>
            </b-form-group>
        </div>
    </div>
</template>

<script>
import IngredientCompact from './IngredientCompact.vue'
import { required } from "vuelidate/lib/validators"


export default {
    props: {
        ingredients: {
            type: Array,
            default: () => {return [];}
        }
    },
    components: {
        IngredientCompact
    },
      data() {
        return {
            form: {
                ingredientName: "",
            }
        }
      },
      validations: {
        form: {
            name: {
                required,
                length: (n) => { n.length > 0}
            }
        }
      },
      methods: {
        validateState(param) {
            const { $dirty, $error } = this.$v.form[param];
            return $dirty ? !$error : null;
        },
        addIngredient() {
            this.ingredients.push({id: this.ingredients.length, name: this.form.ingredientName, localizedName: "", image: "" })
        }
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