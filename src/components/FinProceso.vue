<template>
    <v-row class="ma-0 pt-2">

        <v-col cols="5" class=" d-flex align-center justify-center">
            <v-img style="max-width: 87% !important;" src="../assets/images/check2.svg" @click="proceso_exitoso()" />
        </v-col>

        <v-col cols="7" class="pa-5 d-flex align-center justify-center">
            <v-row>
                <v-col cols="12">
                    <spa style="color:#2D2D8D; font-size:22px">El pago por <strong>{{ cantidad }}</strong>
                        del préstamo No. <strong>{{ no_cuenta }}</strong> ha sido realizado exitosamente en
                        el banco <strong>{{ banco_elegido }}</strong></spa>
                </v-col>
                <v-col cols="12">
                    <p style="color:#2D2D8D">¿Comó queres el comprobante?</p>
                    <v-col class="px-0 d-flex justify-space-between" style="gap:10px">
                        <v-btn class="btn-add-divisa" variant="outlined"> <v-icon></v-icon> Impreso</v-btn>
                        <v-btn class="btn-add-divisa" variant="outlined"> <v-icon></v-icon> Correo
                            electrónico</v-btn>

                    </v-col>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
export default{ 
    data: () => ({
        
    }),
    props:{
        no_cuenta: null,
        banco_elegido: null
    }
}
</script>