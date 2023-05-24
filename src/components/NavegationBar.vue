<template>
    <v-row class="ma-0">

        <v-col class="navegation-bar d-flex align-center justify-start">
            <v-img src="../assets/images/logo.png" style="height: 46px;"/>
            <v-col cols="9" class="d-flex justify-end link-nav">
                <router-link class="link-nav" to="/ultimo_ticket">Ultimo Ticket</router-link>
                <router-link class="link-nav" to="/operaciones">Operaciones</router-link>
                <router-link class="link-nav" to="/operaciones">Cierre de Caja</router-link>
                <v-icon @click="logout()">mdi-logout-variant</v-icon>
            </v-col>
        </v-col>

    </v-row>
</template>

<script>
export default {
    methods:{
        logout(){
            this.$router.replace('/');
        }
    }
}
</script>