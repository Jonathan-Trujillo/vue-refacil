<template>
    <v-row class="ma-0">

        <v-col class="navegation-bar d-flex align-center justify-start">
            <v-img src="../assets/images/logo.png" style="height: 46px;"/>
            <v-col cols="9" class="d-flex justify-end nav">
                <v-btn elevation="0" class="btn-calculadora" @click="mostrar_calculadora = true">
                    <v-icon class="mr-2">mdi-calculator</v-icon> Calculadora
                </v-btn>
                <a class="link-nav" to="/ultimo_ticket">Ultimo Ticket</a>
                <a class="link-nav" to="/operaciones">Operaciones</a>
                <v-icon @click="logout()">mdi-logout-variant</v-icon>
            </v-col>
        </v-col>

        
        <v-dialog v-model="mostrar_calculadora" style="z-index:9999">
            <v-col>
                <CalculadoraCaja @cerrar_calculadora="mostrar_calculadora = false"/>
            </v-col>
        </v-dialog>

    </v-row>
</template>

<script>
import CalculadoraCaja from '../components/CalculadoraCaja.vue'


export default {
    components:{
        CalculadoraCaja
    },    
    data: () => ({
        mostrar_calculadora: false
    }),
    methods:{
        logout(){
            this.$router.replace('/');
        },
    }
}
</script>