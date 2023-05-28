<template>
    <v-row class="ma-0">

        <v-col class="navegation-bar d-flex align-center justify-start">
            <v-img src="../assets/images/logo.png" style="height: 46px;"/>
            <v-col cols="9" class="d-flex justify-end nav">
                <a class="link-nav" to="/ultimo_ticket">Ultimo Ticket</a>
                <a class="link-nav" to="/operaciones">Operaciones</a>
                <a class="link-nav" @click="cerrar_caja()" >Cierre de Caja</a>
                <v-icon @click="logout()">mdi-logout-variant</v-icon>
            </v-col>
        </v-col>

    </v-row>
</template>

<script>
// import { miFuncionGlobal } from '@/globalFunctions.js';
import {funcionGlobal} from '../views/HomeView.vue'


export default {
    methods:{
        logout(){
            this.$router.replace('/');
        },
        
        cerrar_caja(){
            funcionGlobal();
            // this.$emit('ejecutar-funcion');
            // this.$myGlobalfunction
            // this.$emit('efectivo', this.ver_datos_totales_guaranies, this.ver_datos_totales_dolares, this.tab)
        },
    }
}
</script>