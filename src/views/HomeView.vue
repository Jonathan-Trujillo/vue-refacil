<template>
  <v-app class="body-box">
    <v-container class="pa-0" style="margin-top: 90px;">
      <v-row class="ma-0 pt-5 align-start">
        <InicioView :valor_efectivo="dato_valor_efectivo" />
        <AperturaCaja v-if="!mostrar_cajas" @abrir_caja="iniciar_abrir_caja" />
        <v-col cols="12" class="pa-0">
          <SeccionPrincipal v-if="mostrar_cajas" />
        </v-col>
      </v-row>
    </v-container>
    <v-col cols="12" class="pa-0 mt-10 d-flex justify-center align-start" style="position: absolute;bottom: 30px;">
      <h style="color:#2D2D8D; font-size:17px">© Todos los derechos reservados</h>
    </v-col>
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
    mostrar_cajas: false,
    dato_valor_efectivo: null,
  }),
  methods:{
    iniciar_abrir_caja(valor){
      this.mostrar_cajas = true
      this.dato_valor_efectivo = valor
    }
  }

}
</script>
