<template>
  <v-app class="body-box">
    <v-container class="py-0 px-8" style="margin-top: 90px;max-width: 100% !important;">
      <v-row class="ma-0 pt-5 align-start">
        <InicioView :valor_guaranies="dato_valor_guaranies" :valor_dolares="dato_valor_dolares" :tab_valor="valor_tab"/>
        <AperturaCaja v-if="!mostrar_cajas" @abrir_caja="iniciar_abrir_caja" @efectivo="mostrar_efectivo"/>
        <CierreCaja v-if="mostrar_cerrar_caja" @cerrar_caja="iniciar_abrir_caja" @efectivo="mostrar_efectivo_cierre"/>
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
import CierreCaja from '../components/CierreCaja.vue';
import SeccionPrincipal from '../components/SeccionPrincipal.vue';

export default {
  components: {
    // navegationBar,
    InicioView,
    AperturaCaja,
    CierreCaja,
    SeccionPrincipal,
  },
  data: () => ({
    mostrar_cajas: false,
    mostrar_cerrar_caja: false,
    dato_valor_guaranies: null,
    dato_valor_dolares: null,
    valor_tab: null,
  }),
  methods:{
    iniciar_abrir_caja(){
      this.mostrar_cajas = true
    },
    iniciar_cerrar_caja(){
      this.mostrar_cerrar_caja = true
    },
    mostrar_efectivo(valor_guaranies, valor_dolares, dato_tab){
      this.dato_valor_guaranies = valor_guaranies
      this.dato_valor_dolares = valor_dolares
      this.valor_tab = dato_tab
    }
  }

}
</script>

<style>
</style>