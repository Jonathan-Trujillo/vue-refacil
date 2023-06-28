<template>
    <v-row class="ma-0">
        <v-col>
            <v-col cols="12" class="py-0" v-if="tab_pagar != 'proceso_exitoso' && tab_pagar != 'finalizar_proceso'">
                <span style="color:#2D2D8D;font-size:18px">Ingresá la siguiente información:</span>
            </v-col>

            <v-window v-model="tab_pagar" class="divisas">

                <v-window-item value="proceso_pagar">
                    <v-form ref="form">
                        <v-row class="ma-0 pt-2">
                            <v-col cols="12" style="color:#2D2D8D;">
                                <!-- ***********   Datos de "PAGAR PRESTAMO"   *********** -->
                                <v-col cols="12" md="6" class="pa-0 d-flex align-center" v-if="eleccion === 2">
                                    <strong class="mr-4">Número de documento: </strong>
                                    <money3 v-model="no_boleta" :rules="validar_formulario" maxlength="4" :precision="0" :thousands="''" class="v-field__input v-field border-line"/>
                                </v-col>

                                <v-col cols="12" md="6" class="mt-6 pa-0 d-flex align-center" v-if="eleccion === 2">
                                    <strong class="mr-4">Número de préstamo: </strong>
                                    <money3 v-model="no_cuenta" :rules="validar_formulario" maxlength="4" :precision="0" :thousands="''" class="v-field__input v-field border-line"/>
                                </v-col>
                                
                                <!-- ***********   Datos de "PAGAR TARJETA DE CREDITO"   *********** -->

                                <v-col cols="12" md="8" class="pa-0 d-flex align-center" v-if="eleccion === 3">
                                    <v-col cols="12" md="6" class="pa-0 d-flex align-center">
                                        <strong class="mr-4">Primeros 4 Números de TC: </strong>
                                        <money3 maxlength="4" :precision="0" :thousands="''" class="v-field__input v-field border-line"/>
                                    </v-col>
                                    <v-col cols="12" md="6" class="ml-4 pa-0 d-flex align-center">
                                        <strong class="mr-4">Últimos 4 Números de TC: </strong>
                                        <money3 maxlength="4" :precision="0" :thousands="''" class="v-field__input v-field border-line"/>
                                    </v-col>

                                </v-col>

                                <v-col cols="12" md="8" class="mt-6 pa-0 d-flex align-center" v-if="eleccion === 3">
                                    <strong class="mr-4">Número de Cédula del Titular de la Tarjeta: </strong>
                                    <money3 maxlength="20" :precision="0" :thousands="''" class="v-field__input v-field border-line"/>
                                </v-col>
                                
                                <!-- ***********   DATOS GENERALES   *********** -->

                                <v-col cols="12" class="mt-4 pa-0 d-flex align-center">
                                    <strong style="color:#2D2D8D">Moneda:</strong>
                                    <v-radio-group v-model="tipo_moneda" inline dense>
                                        <v-radio label="Guaraníes" value="guaranies"></v-radio>
                                        <v-radio label="Dólares" value="dolares"></v-radio>
                                    </v-radio-group>
                                </v-col>
                                
                                <v-col cols="12" class="mt-4 pa-0 d-flex align-center">
                                    <v-col cols="12" md="5" class="pa-0 d-flex align-center">
                                        <strong class="mr-4">Ingrese Monto: </strong>
                                        <money3 v-model="eleccion_monto" :prefix="tipo_moneda === 'guaranies' ? '₲' : '$'"
                                            maxlength="20" v-bind="config" class="v-field__input v-field border-line"/>
                                    </v-col>

                                </v-col>

                            </v-col>
                        </v-row>
                    </v-form>
                </v-window-item>

                <!-- <v-window-item>
                    <v-row class="ma-0 pt-2" style="color:#2D2D8D;">
                        <v-col cols="12" md="6" class="pa-0 d-flex flex-column justify-center align-center"
                            style="background: #E1F2FF;border-radius: 8px ;">
                            <p><span style="font-size: 36px">Cuota: <strong>04/10</strong></span></p>

                            <p>
                                <span class="mr-2">Monto de cuota: </span>
                                <strong>350 USD/Mensual</strong>
                            </p>

                            <p>
                                <span class="mr-2">Móneda: </span>
                                <strong>Dólares (USD)</strong>
                            </p>

                        </v-col>
                        <v-col cols="12" md="6">

                            <v-col cols="12">
                                <v-col cols="12" class="pa-0 d-flex align-center">
                                    <span class="mr-2">Nombre y Apellido: </span>
                                    <strong>Alejandro Rodriguez Gomez</strong>
                                </v-col>

                                <v-col cols="12" class="pa-0 d-flex align-center">
                                    <span class="mr-2">Número de Documento: </span>
                                    <strong>42.540.092</strong>
                                </v-col>
                                <v-col cols="12">
                                    <hr style="opacity:0.2">
                                </v-col>

                                <v-col cols="12" class="pa-0 d-flex align-center">
                                    <span class="mr-2">Monto Total Préstamos: </span>
                                    <strong>10.500 USD</strong>
                                </v-col>

                                <v-col cols="12" class="pa-0 d-flex align-center">
                                    <span class="mr-2">Saldo Deuda: </span>
                                    <strong>7500 USD</strong>
                                </v-col>
                            </v-col>

                            <v-col cols="12" md="10" class="d-flex align-center">
                                <spam class="mr-4 pb-4">Pagar Cuota: </spam>
                                <v-text-field v-model="no_boleta" :rules="validar_formulario" variant="outlined" dense />
                            </v-col>
                        </v-col>
                    </v-row>
                </v-window-item> -->

                <v-window-item value="proceso_exitoso">
                    <v-row class="ma-0 pt-2">

                        <v-col class="d-flex align-center justify-center cursor-pointer" style="min-height: 480px">
                            <v-img style="max-width: 55% !important;" src="../../assets/images/loading.png"
                                @click="proceso_exitoso()" />
                        </v-col>
                    </v-row>
                </v-window-item>

                <v-window-item value="finalizar_proceso">
                    <fin_proceso />
                </v-window-item>
            </v-window>

            <v-tabs hide-slider style="height:55px" v-if="tab_pagar != 'proceso_exitoso'">

                <v-col :class="tab_pagar != 'finalizar_proceso' ? 'd-flex justify-space-between align-center' : 'd-flex justify-end align-center'">
                    <v-tab style="text-transform:none;letter-spacing:0;color:#2D2D8D;font-size: 18px;" @click="volver_proceso()" v-if="!exito_proceso">
                        <v-icon>
                            mdi-chevron-left
                        </v-icon> Volver
                    </v-tab>

                    <v-tab class="btn-add-divisa" variant="outlined" @click="exito_proceso ? finalizar_proceso() : continuar()">{{ exito_proceso ? 'Finalizar' : 'Siguiente' }}</v-tab>

                </v-col>

            </v-tabs>
        </v-col>
    </v-row>
</template>

<script>
import fin_proceso from '../FinProceso.vue'
import { Money3Component } from 'v-money3'
import { state } from '../../views/HomeView.vue'

export default {
    components: {
        fin_proceso,
        money3: Money3Component
    },
    data: () => ({
        validar_formulario: [
            v => !!v || ""
        ],
        tab_pagar: null,
        // ************   RADIO BUTON'S   ************
        tipo_moneda: 'guaranies',
        tipo_cuenta: null,
        
        eleccion_monto: null,
        config: {
            masked: false,
            //prefix: '',
            suffix: '',
            thousands: ',',
            decimal: '.',
            precision: 0,
            disableNegative: false,
            disabled: false,
            min: null,
            max: null,
            allowBlank: false,
            minimumNumberOfCharacters: 0,
            shouldRound: true,
            focusOnRight: false,
        },

        cantidad: 0,
        banco_elegido: 'BBVA',
        exito_proceso: false,
        no_cuenta: 7053459203,
        no_boleta: "",
        nombre_titular: "",
        documento_ide: "",
    }),
    props: {
        eleccion: null
    },
    methods: {
        continuar() {
            if (this.tab_pagar === 'proceso_pagar') {
                this.tab_pagar = 'proceso_exitoso';
            }
            else if (this.tab_pagar === 'proceso_exitoso') {
                this.tab_pagar = 'finalizar_proceso'
                this.exito_proceso = true;
            }
        },
        volver_proceso() {
            if (this.tab_pagar === 0) {
                this.$emit("volver", 0);
            }
            else if (this.tab_pagar === 1) {
                this.tab_pagar = 0;
            }
        },

        proceso_exitoso() {
            this.tab_pagar = 'finalizar_proceso'
            this.exito_proceso = true
        },
        finalizar_proceso() {
            this.$emit("finalizo_proceso", 0);
            state.mostrar_seccion_inicial = true
            state.mostrar_seccion_principal = false
        },
    },
}
</script>
