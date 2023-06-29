<template>
    <v-row class="ma-0 pt-5" dense>
        <v-col cols="12" class="pa-0">
            <v-card class="d-flex align-start" style="height: 652px !important;">
                <v-row class="ma-0 pa-8">
                    <v-col cols="12">
                        <h style="color:#2D2D8D;font-size:18px">Elegí una de las opciones para operar:</h>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-btn width="100%" elevation="0" class="d-flex align-center justify-center"
                            :disabled="ver_caja === true && ver_cerrar_caja === false" :class="eleccion === 0 ? 'seleccionado' : 'logobanco'"
                            @click="mostrar_abrir_caja()">
                            Apertura de Caja
                        </v-btn>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-btn width="100%" elevation="0" class="d-flex align-center justify-center"
                            :disabled="ver_caja === false || ver_cerrar_caja === true" :class="eleccion === 1 ? 'seleccionado' : 'logobanco'"
                            @click="abrir_depositar()">
                            Quiero Depositar
                        </v-btn>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-btn width="100%" elevation="0" class="d-flex align-center justify-center"
                            :disabled="ver_caja === false || ver_cerrar_caja === true" 
                            :class="eleccion === 2 ? 'seleccionado' : 'logobanco'" @click="abrir_pagar()">
                            Quiero Pagar
                        </v-btn>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-btn width="100%" elevation="0" class="d-flex align-center justify-center flex-column"
                            :disabled="ver_caja === false || ver_cerrar_caja === true" 
                            :class="eleccion === 3 ? 'seleccionado' : 'logobanco'" @click="abrir_cobrar()">
                            Quiero Cobrar
                        </v-btn>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-btn width="100%" elevation="0" class="d-flex align-center justify-center"
                            :disabled="ver_caja === false || ver_cerrar_caja === true" 
                            :class="eleccion === 4 ? 'seleccionado' : 'logobanco'" @click="cerrar_caja()">
                            Cierre de Caja
                        </v-btn>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-btn width="100%" elevation="0" class="d-flex align-center justify-center"
                            :disabled="ver_caja === false || ver_cerrar_caja === true" 
                            :class="eleccion === 5 ? 'seleccionado' : 'logobanco'" @click="eleccion = 5">
                            Pantalla de Error
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>


<script>
import { funcion_abrir_caja, funcion_cerrar_caja, state } from '../funciones_globales'

export default {

    data: () => ({
    }),
    computed: {
        ver_caja() {
            return state.seleccionar_abrir_componente_caja
        },
        ver_cerrar_caja(){
            return state.seleccionar_cerrar_caja
        }
    },
    methods: {
        mostrar_abrir_caja() {
            funcion_abrir_caja()
        },
        cerrar_caja() {
            funcion_cerrar_caja()
        },
        abrir_depositar(){
            state.mostrar_seccion_principal = true
            state.mostrar_seccion_inicial = false

            state.mostrar_depositar = true
            state.mostrar_pagar = false
            state.mostrar_cobrar = false
        },
        abrir_cobrar(){
            state.mostrar_seccion_principal = true
            state.mostrar_seccion_inicial = false
            
            state.mostrar_depositar = false
            state.mostrar_pagar = false
            state.mostrar_cobrar = true
        },
        abrir_pagar(){
            state.mostrar_seccion_principal = true
            state.mostrar_seccion_inicial = false
            
            state.mostrar_depositar = false
            state.mostrar_pagar = true
            state.mostrar_cobrar = false
        },
    }
}
</script>


<style>
.v-btn__overlay {
  background-color: #c2dbf0;
}
</style>