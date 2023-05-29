<template>
  <v-app class="body-box">
    <v-container class="py-0 px-8" style="margin-top: 90px;max-width: 100% !important;">
      <v-row class="ma-0 pt-5 align-start">
        <InicioView :valor_guaranies="dato_valor_guaranies" :valor_dolares="dato_valor_dolares" :cerrar_caja_valor_guaranies="cerrar_caja_dato_valor_guaranies" :cerrar_caja_valor_dolares="cerrar_caja_dato_valor_dolares"/>
        <AperturaCaja v-if="!mostrar_cajas" @abrir_caja="iniciar_abrir_caja" @efectivo="mostrar_efectivo"/>
        <CierreCaja v-if="mostrar_cerrar_caja" @cerrar_caja="iniciar_cerrar_caja" @efectivo_cierre_caja="mostrar_efectivo_cierre"/>
        <v-col cols="12" class="pa-0">
          <SeccionPrincipal v-if="ver_seccion_principal" />
        </v-col>
      </v-row>
    </v-container>
    <v-col cols="12" class="pa-0 mt-10 d-flex justify-center align-start" style="position: absolute;bottom: 30px;">
      <h style="color:#2D2D8D; font-size:17px">© Todos los derechos reservados</h>
    </v-col>
  </v-app>
</template>
<script>
import InicioView from '../components/InicioView.vue';
import AperturaCaja from '../components/AperturaCaja.vue';
import CierreCaja from '../components/CierreCaja.vue';
import SeccionPrincipal from '../components/SeccionPrincipal.vue';

import { reactive, createApp } from 'vue';
const state = reactive({
  cerrar_componente_caja: false,
  mostrar_seccion_principal: false
});

export const funcionGlobal = () => {
  state.cerrar_componente_caja = true,
  state.abrir_componente_caja = true,
  state.mostrar_seccion_principal = false
};

const app = createApp({});
app.config.globalProperties.funcionGlobal = funcionGlobal;
app.mount('#app');

export default {
  components: {
    InicioView,
    AperturaCaja,
    CierreCaja,
    SeccionPrincipal,
  },
  data: () => ({
    dato_valor_guaranies: null,
    dato_valor_dolares: null,
    cerrar_caja_dato_valor_guaranies: null,
    cerrar_caja_dato_valor_dolares: null,
  }),
  computed:{
    mostrar_cerrar_caja(){
      return state.cerrar_componente_caja
    },
    mostrar_cajas(){
      return state.abrir_componente_caja
    },
    ver_seccion_principal(){
      return state.mostrar_seccion_principal
    }
  },
  methods: {
    iniciar_abrir_caja() {
      state.abrir_componente_caja = true
      state.mostrar_seccion_principal = true
    },
    iniciar_cerrar_caja() {
      state.abrir_componente_caja = false
      state.cerrar_componente_caja = false
    },
    mostrar_efectivo(valor_guaranies, valor_dolares, dato_tab) {
      this.dato_valor_guaranies = valor_guaranies;
      this.dato_valor_dolares = valor_dolares;
      this.valor_tab = dato_tab;
    },
    mostrar_efectivo_cierre(cerrar_caja_valor_guaranies, cerrar_caja_valor_dolares) {
      this.cerrar_caja_dato_valor_guaranies = cerrar_caja_valor_guaranies;
      this.cerrar_caja_dato_valor_dolares = cerrar_caja_valor_dolares;
    }
  }
}
</script>
