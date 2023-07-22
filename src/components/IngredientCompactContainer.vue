<template>
    <div class="ingredients-body">
        <b-container id="ingredients-container" fluid   v-if="ingredients && ingredients.length">
            <h4>Ingredients: </h4>
            <div v-for="ing in ingredients" :key="ing.id" class="ingredient">
                <IngredientCompact
                    :id="ing.id"
                    :name="ing.name"
                    :localizedName="ing.localizedName"
                    :image="ing.image"
                >
                </IngredientCompact>
            </div>
        </b-container>
        <div class="ing-input" v-if="edit">
        <b-form-input
            id="input-ingredient"
            placeholder="ingredient name..."
            v-model="form.ingredientName"
            :state="validateState('name')" 
        ></b-form-input>
        <b-button for="input-group-ingredient" type="button" @click="addIngredient" variant="secondary" pill>Add Ingredient:</b-button>
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
        },
        edit: {
            type: Boolean,
            required:true
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
            this.ingredients.push({id: this.ingredients.length, name: this.form.ingredientName, localizedName: "", image: "" });
            this.$emit('ingredientAdded', this.ingredients);
            this.form.ingredientName = "";
        }
      }
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