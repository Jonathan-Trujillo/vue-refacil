<template>
    <v-row class="ma-0">
        
        <v-dialog v-model="mostrar_calculadora" >
            <v-col>
                <CalculadoraCaja @cerrar_calculadora="mostrar_calculadora = false"/>
            </v-col>
        </v-dialog>
        
        <v-dialog v-model="mostrar_ultimo_ticket" width="80%" >
                <v-card class="pa-8" style="border-radius: 8px;">
                    <v-row class="pt-3 d-flex align-center">

                        <v-col cols="12" md="7" class="pa-0 d-flex align-center">
                            <v-card-title style="color:#2D2D8D">{{ opcion_seleccionada }}</v-card-title>
                        </v-col>
                        
                        <v-col cols="12" md="5" class="d-flex justify-end">
                            <h style="color:#2D2D8D"><strong>Número de Comprobante: </strong>{{ numero_comprobante }}</h>
                        </v-col>
                        <v-col cols="12" class="d-flex align-center" >
                            <hr style="width:100%;border:0; border-bottom: 1px solid rgba(50,100,200,0.2)">
                        </v-col>
                        <fin_proceso class="px-16"/>
                        </v-row>
                </v-card>
        </v-dialog>

        <v-col class="navegation-bar d-flex align-center justify-start">
            <v-img src="../assets/images/logo.png" class="cursor-pointer" style="height: 46px;" @click="home()"/>
            <v-col cols="9" class="d-flex align-center justify-end nav">
                <v-btn elevation="0" class="btn-calculadora" @click="ver_calculadora()">
                    <v-icon class="mr-2">mdi-calculator</v-icon> Calculadora
                </v-btn>
                <a class="link-nav" @click="ver_ticket()">Ultimo Ticket</a>
                <a class="link-nav" to="/operaciones">Operaciones</a>
                <v-icon @click="logout()">mdi-logout-variant</v-icon>
            </v-col>
        </v-col>


    </v-row>
</template>

<script>
import CalculadoraCaja from '../components/CalculadoraCaja.vue'
import { state } from '../funciones_globales'
import fin_proceso from '../components/FinProceso.vue'


export default {
    components:{
        CalculadoraCaja,
        fin_proceso
    },    
    data: () => ({
        mostrar_calculadora: false,
        mostrar_ultimo_ticket: false,

        numero_cuenta: 0,
        banco_elegido: '',
        monto_ingresado: '',
        tipo_moneda: '',
        opcion_seleccionada: null,
        numero_comprobante: 0,
    }),
    computed:{
    },
    methods:{
        logout(){
            this.$router.replace('/');
        },
        home(){
            state.mostrar_seccion_inicial = true
            state.abrir_componente_caja = false
            state.cerrar_componente_caja = false
            state.seleccionar_cerrar_caja = false
            state.mostrar_seccion_principal = false
        },
        ver_calculadora(){
            this.mostrar_calculadora = true
        },
        ver_ticket(){
            this.mostrar_ultimo_ticket = true
            this.opcion_seleccionada = 'Deposito en Efectivo'
            
            // this.numero_cuenta = 197411
            // this.banco_elegido = 'Banco Familiar'
            // this.monto_ingresado = '₲500.000'
            // this.tipo_moneda = 'Guaraníes'
            this.numero_comprobante = 5462356623565
        },
    }
}
</script>