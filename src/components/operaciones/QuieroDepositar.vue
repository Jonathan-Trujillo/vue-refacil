<template>
    <v-row class="ma-0">
        <v-col>
            <v-col cols="12" class="py-0" v-if="tab_depositar != 'proceso_exitoso' && tab_depositar != 'finalizar_proceso'">
                <span style="color:#2D2D8D;font-size:18px">{{ tab_depositar === 0 ? 'Ingresá la siguiente información: ' : 'Elegí el monto que deseas depositar' }}</span> 
                    {{ numero_documento_depositante }}    
                    {{ numero_documento_titular}}
                    {{numero_boleta}}
                    {{numero_cuenta}}
                    {{tipo_cuenta}}
                    {{tipo_moneda}}
                    {{monto_ingresado}}
                    {{cantidad_cheques }}
            </v-col>

            <v-window v-model="tab_depositar" class="divisas">

                <v-window-item value="proceso_depositar">
                    <v-row class="ma-0 pt-2">
                        <v-col cols="12" style="color:#2D2D8D">

                            <v-col cols="12" md="6" class="pa-0 d-flex align-center">
                                <strong class="mr-4">Número de Documento del Depositante: </strong>
                                <v-text-field v-model="numero_documento_depositante" maxlength="15" variant="outlined"/>
                            </v-col>

                            <v-col cols="12" md="6" class="mt-6 pa-0 d-flex align-center">
                                <strong class="mr-4">Número de Documento del Titular: </strong>
                                <v-text-field v-model="numero_documento_titular" maxlength="15" variant="outlined"/>
                            </v-col>

                            <v-col cols="12" md="5" class="mt-6 pa-0 d-flex align-center">
                                <strong class="mr-4">Número de boleta: </strong>
                                <v-text-field v-model="numero_boleta" maxlength="15" variant="outlined"/>
                            </v-col>

                            <v-col cols="12" class="mt-6 pa-0 d-flex align-center">
                                <strong class="mr-4">Número y Tipo de Cuenta Bancaria: </strong>
                                <v-select v-model="numero_cuenta" variant="outlined" dense />
                                <v-radio-group v-model="tipo_cuenta" inline class="ml-4" dense>
                                    <v-radio label="CTA CTE" value="cta_cte"></v-radio>
                                    <v-radio label="CTA AH" value="cta_ah"></v-radio>
                                </v-radio-group>
                            </v-col>

                            <v-col cols="12" class="mt-6 pa-0">
                                <v-col class="pa-0 d-flex align-center">
                                    <strong style="color:#2D2D8D">Moneda:</strong>
                                    <v-radio-group v-model="tipo_moneda" inline dense>
                                        <v-radio label="Guaraniés" value="guaranies"></v-radio>
                                        <v-radio label="Dólares" value="dolares"></v-radio>
                                    </v-radio-group>
                                </v-col>
                            </v-col>

                            <v-col cols="12" md="8" class="mt-6 pa-0 d-flex align-center">
                                <v-col cols="12" md="7" class="pa-0 d-flex align-center">
                                    <strong class="mr-4">Ingrese Monto: </strong>
                                    <money3 v-model="monto_ingresado" :prefix="tipo_moneda === 'guaranies' ? '₲' : '$'"
                                        maxlength="20" v-bind="config" class="v-field__input v-field border-line" />
                                </v-col>
                                <v-col cols="12" md="5" class="ml-4 pa-0 d-flex align-center" v-if="eleccion === 1">
                                    <strong class="mr-4">Cantidad de Cheques: </strong>
                                    <money3 v-model="cantidad_cheques" maxlength="3" :precision="0" :thousands="''" 
                                        class="v-field__input v-field border-line" />
                                </v-col>

                            </v-col>


                        </v-col>
                    </v-row>
                </v-window-item>

                <v-window-item value="proceso_cheque" style="min-height: 480px">
                    <v-row class="ma-0 pa-4">
                        <v-col class="my-6 d-flex align-center justify-center" style="width:100%;height:300px;background:#c2dbf0; border-radius: 16px;" dense>
                            <h>Colocar aquí dentro el Iframe</h>
                        </v-col>
                    </v-row>
                </v-window-item>
                
                <v-window-item value="validar_monto">
                        <v-row class="ma-0 pt-2">
                            <v-col cols="12" :md="eleccion === 5 ? 6 : ''" style="color:#2D2D8D">
                                
                                <v-col cols="12" class="mt-5 pa-0 d-flex align-center">
                                    <v-col cols="12" :md="eleccion != 5 ? 6 : ''" class="pa-0 d-flex align-center">
                                        <strong class="mr-4">Monto Ingresado: </strong>
                                        <money3 v-model="monto_ingresado" :prefix="tipo_moneda === 'guaranies' ? '₲' : '$'" maxlength="20" v-bind="config" class="v-field__input v-field border-line"/>
                                    </v-col>
                                </v-col>

                                <v-col cols="12" class="mt-5 pa-0 d-flex align-center">
                                    <v-col cols="12" :md="eleccion != 5 ? 6 : ''" class="pa-0 d-flex align-center">
                                        <strong class="mr-4">Monto Validado: </strong>
                                        <money3 v-model="monto_validado" :prefix="tipo_moneda === 'guaranies' ? '₲' : '$'" maxlength="20" v-bind="config" class="v-field__input v-field border-line"/>
                                    </v-col>
                                </v-col>

                            </v-col>
                        </v-row>
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

            <v-tabs hide-slider style="height:55px" v-if="tab_depositar != 'proceso_exitoso'">

                <v-col
                    :class="tab_depositar != 'finalizar_proceso' ? 'd-flex justify-space-between align-center' : 'd-flex justify-end align-center'">
                    <v-tab style="text-transform:none;letter-spacing:0;color:#2D2D8D;font-size: 18px;"
                        @click="volver_proceso()" v-if="!exito_proceso">
                        <v-icon>
                            mdi-chevron-left
                        </v-icon> Volver
                    </v-tab>

                    <v-tab :disabled="deshabilitar_boton" class="btn-add-divisa" variant="outlined"
                        @click="exito_proceso ? finalizar_proceso() : continuar()">{{ exito_proceso ? 'Finalizar' :
                            'Siguiente' }}</v-tab>

                </v-col>

            </v-tabs>
        </v-col>
    </v-row>
</template>

<script>
import { Money3Component } from 'v-money3'
import { state } from '../../funciones_globales'
// import currency from 'currency.js'


import fin_proceso from '../FinProceso.vue'
export default {
    components: {
        fin_proceso,
        money3: Money3Component
    },
    data: () => ({

        tab_depositar: null,
        bancoSeleccionado: null,

        numero_documento_depositante: null,
        numero_documento_titular: null,
        numero_boleta: null,
        numero_cuenta: null,
        tipo_cuenta: null,
        tipo_moneda: 'guaranies',
        monto_ingresado: null,
        cantidad_cheques: 0,

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

        validar_formulario: [
            v => !!v || ""
        ],
        // ************   RADIO BUTON'S   ************

        exito_proceso: false,

    }),
    props: {
        eleccion: null
    },
    computed: {
        deshabilitar_boton() {
            return this.numero_documento_depositante != null && this.numero_boleta != null && this.tipo_cuenta != null && this.monto_ingresado != null ? false:true 
        },
        banco_seleccionado() {
            return `../assets/images/bancos/${this.bancoSeleccionado}.jpg`
        },
    },
    methods: {
        continuar() {
            if (this.eleccion === 0 && this.tab_depositar === 'proceso_depositar') {
                this.tab_depositar = 'proceso_exitoso'
            }
            else if (this.tab_depositar === 'proceso_exitoso') {
                this.tab_depositar = 'finalizar_proceso'
                this.exito_proceso = true
            }
            else if (this.eleccion === 1 && this.tab_depositar === 'proceso_depositar') {
                this.tab_depositar = 'proceso_cheque'
            }
            else if (this.eleccion === 1 && this.tab_depositar === 'proceso_cheque') {
                this.tab_depositar = 'validar_monto'
            }
            else if (this.eleccion === 1 && this.tab_depositar === 'validar_monto') {
                this.tab_depositar = 'proceso_exitoso'
            }

        },
        volver_proceso() {
            if (this.tab_depositar === 'proceso_depositar') {
                this.$emit('volver', 0)
            }
        },
        mensaje_seleccionar_banco() {
            alert('Debes seleccionar un banco')
        },
        mensaje_seleccionar_opcion() {
            alert('Debes seleccionar una opción')
        },
        mensaje_seleccionar_tipo() {
            alert('Debes seleccionar un tipo')
        },
        proceso_exitoso() {
            this.tab_depositar = 'finalizar_proceso'
            this.exito_proceso = true

            if(this.tipo_moneda === 'guaranies'){
                state.efectivo_agregado_guaranies = state.efectivo_agregado_guaranies + parseInt(this.monto_ingresado)
            }else{
                state.efectivo_agregado_dolares = state.efectivo_agregado_dolares + parseInt(this.monto_ingresado)
            }

            state.cheques_agregados = parseInt(state.cheques_agregados) + parseInt(this.cantidad_cheques)
            
            state.transacciones_realizadas = parseInt(state.transacciones_realizadas) + 1

            // console.log(state.cheques_agregados,this.cantidad_cheques);
        },
        finalizar_proceso() {
            this.$emit('finalizo_proceso', 0)
            state.mostrar_seccion_inicial = true
            state.mostrar_seccion_principal = false
        },
    },
}
</script>
