<template>
    <v-row>
        <v-col cols="12">
            <v-window>
                <v-window-item>
                    <v-row class="ma-0 pt-2">

                        <v-col class="pa-5 d-flex align-center justify-center">
                            <v-img style="max-width: 55% !important;" src="../assets/images/loading.png"
                                @click="proceso_exitoso()" />
                        </v-col>
                    </v-row>
                </v-window-item>


                <v-window-item>
                    <v-row class="ma-0 pt-2">

                        <v-col cols="5" class="pa-5 d-flex align-center justify-center">
                            <v-img style="max-width: 100% !important;" src="../assets/images/check2.svg"
                                @click="proceso_exitoso()" />
                        </v-col>

                        <v-col cols="7" class="pa-5 d-flex align-center justify-center">
                            <v-row>
                                <v-col cols="12">
                                    <h style="color:#2D2D8D; font-size:22px">El retiro por <strong>{{ cantidad }}</strong>
                                        de la cuenta No. <strong>{{ no_cuenta }}</strong> ha sido realizado exitosamente en
                                        el banco <strong>{{ banco_elegido }}</strong></h>
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
                </v-window-item>
        </v-window>
    </v-col>
</v-row></template>