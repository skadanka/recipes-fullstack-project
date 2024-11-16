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
        <div class="equip-input" v-if="edit">
            <b-form-input
                id="input-equipment"
                placeholder="equipment name..."
                v-model="form.equipmentName"
                :state="validateState('name')" 
            ></b-form-input>         
        <b-button type="button" @click="addEquipment" variant="secondary" pill>Add Equipment:</b-button>
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
        },
        edit: {
            type: Boolean,
            required:true
        }
    },
    data() {
        return {
            form: {
                equipmentName: "",
            },
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
            this.equipments.push({id: this.equipments.length, name: this.form.equipmentName, localizedName: "", image: "" })
            this.$emit('equipmentAdded', this.equipments);
            this.form.equipmentName = "";
        }
    }
}
</script>

<style>
    #equipment-container{
        display: flex;
        gap: 10px;
        width: 100%;
        flex-wrap: wrap;
    }

    #equipment-container .equipment-item{
        
    }

    .equip-input {
        margin-top: 20px;
    }
</style>