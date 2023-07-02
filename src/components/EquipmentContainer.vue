<template>
    <div>
        <b-container id="equipment-container" fluid  v-if="equipments && equipments.length">
            <h4>Equipments: </h4>
            <div class="equipment-item" v-for="e in equipments" :key="e.id">
                <Equipment
                    :id="e.id"
                    :image="e.image"
                    :name="e.name"
                ></Equipment>
            </div>
        </b-container>
        <div @click.stop>
            <b-form-group
                id="input-group-equipment"
                label-cols-sm="3"
                label="Add equipment:"
                label-for="input-equipment"
            >
            <b-form-input
                id="input-equipment"
                placeholder="equipment name..."
                v-model="form.equipmentName"
                :state="validateState('name')" 
            ></b-form-input>
            <b-button type="button" @click="addEquipment">Add Equipment:</b-button>

            </b-form-group>
        </div>
    </div>
</template>

<script>
import Equipment from './Equipment.vue'
import { required } from "vuelidate/lib/validators"

export default {
    props: {
        equipments: {
            type: Array,
            default: () => {return [];}
        }
    },
    data() {
        return {
            form: {
                equipmentName: "",
            }
        }
      },
    components: {
        Equipment
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
        addEquipment() {
            this.equipments.push({id: this.equipments.length+1, name: this.form.equipmentName, localizedName: "", image: "" })
        }
    }
}
</script>

<style>
    #equipment-container{
        display: flex;
        gap: 10px;
    }

    #equipment-container .equipment-item{
        text-align: center;
        background-color: #BAD7E9;
        border: 1px solid black;
    }
</style>