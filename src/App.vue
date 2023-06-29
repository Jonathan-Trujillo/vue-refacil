<template>
  <v-app>
    <navegationBar v-if="mostrarNavegationBar"  @ejecutar-funcion="guardarFuncion"/>
    <main>
      <router-view/>
    </main>
  </v-app>
</template>

<script>
import navegationBar from './components/NavegationBar.vue';


export default {
  components:{
    navegationBar,
  },
  computed: {
    mostrarNavegationBar() {
      return this.$route.path !== '/';
    }
  },
  mounted() {
    this.$router.replace('/');
  },
  methods: {
    guardarFuncion() {
      alert('Hola Mundo')
      this.$emit('enviar-funcion')
    }
  },
}
</script>