<template>
    <v-card>
        <v-row class="ma-0">
            <v-col>
                <v-col cols="12">
                    <strong style="color:#2D2D8D; font-size:24px">Error en la aplicación </strong>
                </v-col>
                <v-col cols="12" class="d-flex align-center">
                    <hr style="width:100%;border:0; border-bottom: 1px solid rgba(50,100,200,0.2)">
                </v-col>


                <v-col class="d-flex align-center justify-center flex-column" style="min-height: 550px">
                    <svg style="height:140px;width:140px" viewBox="0 0 24 24">
                        <path fill="#2D2D8D"
                            d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z">
                        </path>
                    </svg>
                    <h1 style="color:#2D2D8D;text-align: center;" class="mb-8">Ha ocurrido un error en la aplicación<p>por favor vuelve al inicio</p></h1>
                    <v-btn elevation="0" class="btn-add-divisa" @click="salir_pantalla_error()">Volver al Inicio</v-btn>
                </v-col>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import { state } from '../../funciones_globales'
// import currency from 'currency.js'


export default {
    components: {
    },
    data: () => ({

    }),
    methods: {
        salir_pantalla_error() {
            state.mostrar_seccion_principal = false
            state.mostrar_seccion_inicial = true

            state.mostrar_depositar = false
            state.mostrar_pagar = false
            state.mostrar_cobrar = false
            state.mostrar_pantalla_error = false
        },
    },
}
</script>
