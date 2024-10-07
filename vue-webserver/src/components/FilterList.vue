<template>
  <b-container>
    <h4 class="filter-title">{{  title  }}</h4>
    <b-form-select 
    :id="`dropdown-${title}`" :text="title" class="m-md-2" size="8"
    v-model="selected"
    :options="options"
    @change="updateSelected"
    >
    </b-form-select>
  </b-container>


</template>

<script>
export default {
    name: "FilterList",
    props: {
        title: {
            type: String,
            required: true
        },
        options: {
            type: Array,
            required: true
        },
    },
    data() {
        return {
            selected: null
        }
    },

    methods: {
        updateSelected: function(){
            this.$emit('changeSelected', this.selected)
        }
    },
}
</script>

<style scoped lang="scss">

/* Filter Container */
.filter-container {
  margin-bottom: 2rem;
}

/* Filter Title */
.filter-title {
  color: $secondary-color; /* Coral color for titles */
  font-weight: 600;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

/* Dropdown Styling */
b-form-select {
  border-radius: 8px;
  border: 1px solid $divider-color;
  padding: 0.75rem;
  background-color: $card-background;
  font-size: 1rem;
  color: $text-color;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease;

  &:focus {
    border-color: $primary-color;
    box-shadow: 0 0 0 0.2rem rgba(33, 150, 243, 0.25); /* Highlight on focus */
  }

  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1); /* Slight shadow on hover */
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  b-form-select {
    font-size: 0.875rem; /* Slightly smaller text on smaller screens */
  }
}

</style>
