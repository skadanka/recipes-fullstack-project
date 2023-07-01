<template>
    <div>
        <h4>Equipments: </h4>
        <b-container id="equipment-container" fluid>
            <div class="equipment-item" v-for="e in equipments" :key="e.id">
                <Equipment
                    :id="e.id"
                    :image="e.image"
                    :name="e.name"
                ></Equipment>
            </div>
        </b-container>
    </div>
</template>

<script>
import Equipment from './Equipment.vue'

export default {
    props: {
        equipments: {
            type: Array,
            required: true
        }
    },
    components: {
        Equipment
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