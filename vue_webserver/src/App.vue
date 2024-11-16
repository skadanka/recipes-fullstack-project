<template>
  <div id="app">
    <!-- Use the new Navigation component -->
    <Navigation @showModal="showModal" />

    <!-- The rest of your main page content -->
    <RecipeCreationModal ref="creationModal"></RecipeCreationModal>
    <router-view></router-view>
  </div>
</template>

<script>
// Import the new navigation component
import Navigation from './components/Navigation.vue';
import RecipeCreationModal from './components/RecipeCreationModal.vue';

export default {
  name: "App",
  components: {
    Navigation,
    RecipeCreationModal
  },
  methods: {
    showModal() {
      this.$refs.creationModal.$refs.creationModal.toggle();
    },
  },
};
</script>

<style>
/* Your global styles */
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  overflow: none;
}
</style>
