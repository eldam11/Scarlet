<template>
  <div>
    <CharactersView msg="PERSONAJES"/>
    <CharactersView msg="PERSONAJES"/>
    <CharactersView msg="PERSONAJES"/>
    <CharactersView msg="PERSONAJES"/>
  </div>
</template>
  


<script>
import CharactersView from "./components/CharactersView.vue";

export default {
  name: "App",
  components: {
    CharactersView,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
