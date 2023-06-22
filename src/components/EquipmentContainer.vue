<template>
    <b-container id="equipment-container" flud>
        <div v-for="e in equipments" :key="e.id">
            <Equipment
                :id="e.id"
                :image="e.image"
                :name="e.name"
            ></Equipment>
        </div>
    </b-container>
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
    }
</style>