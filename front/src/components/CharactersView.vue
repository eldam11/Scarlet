<template>
  <div id="componente-Personaje">
    <h1>{{msg}}</h1>
    <h2>{{ subtitulo }}</h2>
  </div>
</template>


<script>
export default {
  name: "CharactersView",
  props: {
    msg: String,
  },
  data(){
    return{
      subtitulo: 'Ver personaje'
    }
  }

};
</script>
