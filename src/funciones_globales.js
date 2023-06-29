
import { reactive } from 'vue';
export const state = reactive({
  cerrar_componente_caja: false,
  abrir_componente_caja: false,
  seleccionar_abrir_componente_caja: false,

  mostrar_seccion_principal: false,
  mostrar_seccion_inicial: true,
  seleccionar_cerrar_caja: false,

  mostrar_depositar: false,
  mostrar_pagar: false,
  mostrar_cobrar: false,

  efectivo_agregado_guaranies: 0,
  efectivo_agregado_dolares: 0
});

export const funcion_abrir_caja = () => {
  state.cerrar_componente_caja = false,
  state.abrir_componente_caja = true,
  state.mostrar_seccion_principal = false,

  state.mostrar_seccion_inicial = false,
  state.seleccionar_abrir_componente_caja = false
};
export const funcion_cerrar_caja = () => {
  state.cerrar_componente_caja = true,
  state.abrir_componente_caja = false,
  state.mostrar_seccion_principal = false,

  state.mostrar_seccion_inicial = false,
  state.seleccionar_abrir_componente_caja = false
};
