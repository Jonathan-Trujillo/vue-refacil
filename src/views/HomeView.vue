<template>
  <v-app class="body-box">
    <v-row class="ma-0 px-10 pt-5">
      <InicioView/>
      <AperturaCaja v-if="!mostrar_cajas" @abrir_caja="mostrar_cajas = true"/>
      <SeccionPrincipal v-if="mostrar_cajas"/>
      <v-col cols="12" class="pa-0 d-flex justify-center align-start">
        <h style="color:#2D2D8D; font-size:20px">© Todos los derechos reservados</h>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
// import navegationBar from '../components/NavegationBar.vue';
import InicioView from '../components/InicioView.vue';
import AperturaCaja from '../components/AperturaCaja.vue';
import SeccionPrincipal from '../components/SeccionPrincipal.vue';

export default {
  components: {
    // navegationBar,
    InicioView,
    AperturaCaja,
    SeccionPrincipal,
  },
  data: () => ({
    mostrar_cajas: false
  })

}
</script>
