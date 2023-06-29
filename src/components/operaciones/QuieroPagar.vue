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
                                
                                <v-col cols="12" md="8" class="mb-6 pa-0 d-flex align-center" v-if="eleccion === 3">
                                    <v-col cols="12" md="6" class="pa-0 d-flex align-center">
                                        <strong class="mr-4">Primeros 4 Números de TC: </strong>
                                        <money3 v-model="primeros_num_tarjeta" maxlength="4" :precision="0" :thousands="''" class="v-field__input v-field border-line"/>
                                    </v-col>
                                    <v-col cols="12" md="6" class="ml-4 pa-0 d-flex align-center">
                                        <strong class="mr-4">Últimos 4 Números de TC: </strong>
                                        <money3 v-model="ultimos_num_tarjeta" maxlength="4" :precision="0" :thousands="''" class="v-field__input v-field border-line"/>
                                    </v-col>

                                </v-col>
                                <!-- ***********   Datos de "PAGAR PRESTAMO"   *********** -->
                                <v-col cols="12" md="6" class="pa-0 d-flex align-center">
                                    <strong class="mr-4">{{ eleccion === 2 ? 'Número de documento':'Número de Documento del Titular de la Tarjeta: '}}</strong>
                                    <v-text-field v-model="numero_documento" maxlength="15" variant="outlined"/>
                                </v-col>

                                <v-col cols="12" md="6" class="mt-6 pa-0 d-flex align-center" v-if="eleccion === 2">
                                    <strong class="mr-4">Número de préstamo: </strong>
                                    <v-text-field v-model="numero_prestamo" maxlength="20" variant="outlined"/>
                                </v-col>
                                
                                <!-- ***********   Datos de "PAGAR TARJETA DE CREDITO"   *********** -->


                                <!-- <v-col cols="12" md="8" class="mt-6 pa-0 d-flex align-center" v-if="eleccion === 3">
                                    <strong class="mr-4">Número de Documento del Titular de la Tarjeta: </strong>
                                    <money3 v-model="numero_documento" maxlength="15" :precision="0" :thousands="''" class="v-field__input v-field border-line"/>
                                </v-col> -->
                                
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
                                        <money3 v-model="monto_ingresado" :prefix="tipo_moneda === 'guaranies' ? '₲' : '$'"
                                            maxlength="20" v-bind="config" class="v-field__input v-field border-line"/>
                                    </v-col>

                                </v-col>

                            </v-col>
                        </v-row>
                    </v-form>
                </v-window-item>

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
import { state } from '../../funciones_globales'

export default {
    components: {
        fin_proceso,
        money3: Money3Component
    },
    data: () => ({
        validar_formulario: [
            v => !!v || 0
        ],
        tab_pagar: null,
        // ************   RADIO BUTON'S   ************
        numero_documento: null,
        numero_prestamo: null,
        primeros_num_tarjeta: null,
        ultimos_num_tarjeta: null,
        tipo_moneda: 'guaranies',
        monto_ingresado: null,
        
        tipo_cuenta: null,
        
        config: {
            masked: false,
            //prefix: '',
            suffix: '',
            thousands: '.',
            decimal: ',',
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
            if (this.tab_pagar === 'proceso_pagar') {
                this.$emit("volver", 0);
            }
            else if (this.tab_pagar === 1) {
                this.tab_pagar = 0;
            }
        },

        proceso_exitoso() {
            this.tab_pagar = 'finalizar_proceso'
            this.exito_proceso = true

            if(this.tipo_moneda === 'guaranies'){
                state.efectivo_agregado_guaranies = parseInt(this.monto_ingresado)
            }else{
                state.efectivo_agregado_dolares = parseInt(this.monto_ingresado)
            }
        },
        finalizar_proceso() {
            this.$emit("finalizo_proceso", 0);
            state.mostrar_seccion_inicial = true
            state.mostrar_seccion_principal = false
        },
    },
}
</script>
