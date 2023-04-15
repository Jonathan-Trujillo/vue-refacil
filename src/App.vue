<template>
  <v-app>
    <navegationBar v-if="mostrarNavegationBar"/>
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
  data: () => ({

  }),
  mounted() {
    this.$router.replace('/');
  },
}
</script>