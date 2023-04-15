<template>
    <v-row>
        <v-col cols="12" md="3">
            <v-card class="mb-3 pa-6 d-flex align-center btn-seccion-principal" style="height: 80px" @click="mostrar_bancos()">
                <v-icon class="mr-2">
                    mdi-close-circle
                </v-icon>
                Bancos
            </v-card>
            <v-card class="mb-3 pa-6 d-flex align-center" style="height: 80px">
                <v-icon>
                    mdi-close-circle
                </v-icon>
                Bancos
            </v-card>
            <v-card class="mb-3 pa-6 d-flex align-center" style="height: 80px">
                <v-icon>
                    mdi-close-circle
                </v-icon>
                Bancos
            </v-card>
            <v-card class="mb-3 pa-6 d-flex align-center" style="height: 80px">
                <v-icon>
                    mdi-close-circle
                </v-icon>
                Bancos
            </v-card>
            <v-card class="mb-3 pa-6 d-flex align-center" style="height: 80px">
                <v-icon>
                    mdi-close-circle
                </v-icon>
                Bancos
            </v-card>
            <v-card class="mb-3 pa-6 d-flex align-center" style="height: 80px">
                <v-icon>
                    mdi-close-circle
                </v-icon>
                Bancos
            </v-card>
        </v-col>
        <v-col cols="12" md="9">

            <v-card v-if="ninguna_area_seleccionada">
                <v-row>
                    <v-col class="pa-16 d-flex align-center justify-center">
                        <v-img style="max-width: 68% !important;" src="../assets/images/principal.png"/>
                    </v-col>
                </v-row>
            </v-card>
            <AreaBancos v-if="ver_bancos"/>
        </v-col>
    </v-row>
</template>

<script>
import AreaBancos from '../components/AreaBancos.vue';

export default {
    components:{
        AreaBancos,
    },
    data: () => ({
        ver_bancos: false,
        ninguna_area_seleccionada: true
    }),
    methods:{
        mostrar_bancos(){
            this.ninguna_area_seleccionada = false
            this.ver_bancos = true
        }
    }
}
</script>