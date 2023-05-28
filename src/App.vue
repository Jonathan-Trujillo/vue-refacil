<template>
  <v-app>
    <navegationBar v-if="mostrarNavegationBar"  @ejecutar-funcion="guardarFuncion"/>
    <main>
      <router-view :enviar_funcion="ejecutarFuncion"/>
    </main>
  </v-app>
</template>

<script>
import navegationBar from './components/NavegationBar.vue';


export default {
  components:{
    navegationBar,
  },
  data: () => ({
      ejecutarFuncion: 'Llegamos Lejos'

  }),
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