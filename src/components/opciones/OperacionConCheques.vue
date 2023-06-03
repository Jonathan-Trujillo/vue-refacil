<template>
    <v-row>
        <v-col>
            <v-col cols="12" class="py-0" v-if="tab_cheques != 'proceso_exitoso' && tab_cheques != 'finalizar_proceso'">
                <h style="color:#2D2D8D;font-size:18px">{{ tab_cheques === 'opcion_qr' ? 'Elegí el monto que desear retirar:' : tab_cheques === 'datos' ? 'Ingresá la siguiente información' : 'Elegí la opción con la que deseas continuar:'}}</h>
            </v-col>

            <v-window v-model="tab_cheques" class="divisas">
                <v-window-item>
                    <v-row class="ma-0 pt-2">
                        <v-col cols="12" md="4">
                            <div class="d-flex align-center justify-center text-center"
                                :class="tipoSeleccionado === 1 ? 'seleccionado' : 'logobanco'"
                                @click="tipoSeleccionado = 1, $emit">
                                Depósitos Cheques Propios 
                            </div>
                        </v-col>
                        <v-col cols="12" md="4">
                            <div class="d-flex align-center justify-center text-center"
                                :class="tipoSeleccionado === 2 ? 'seleccionado' : 'logobanco'"
                                @click="tipoSeleccionado = 2">
                                Depósitos Otros Bancos
                            </div>
                        </v-col>
                        <v-col cols="12" md="4">
                            <div class="d-flex align-center justify-center"
                                :class="tipoSeleccionado === 3 ? 'seleccionado' : 'logobanco'"
                                @click="tipoSeleccionado = 3">
                                Cobro Cheque
                            </div>
                        </v-col>
                    </v-row>
                </v-window-item>

                <v-window-item value="datos">
                    <v-form ref="form">
                        <v-row class="ma-0 pt-2">
                            <v-col cols="12" md="8" style="color:#2D2D8D">

                                <v-col cols="12" class="pa-0 d-flex align-center">
                                    <strong class="mr-4 pb-4">Número de cuenta bancaria: </strong>
                                    <v-text-field v-model="no_cuenta" :rules="validar_formulario" variant="outlined" dense />
                                </v-col>

                                <v-col cols="12" class="pa-0">
                                    <v-col class="pa-0 d-flex align-center">
                                        <h style="color:#2D2D8D" class="pb-6">Tipo de cuenta:</h>
                                        <v-radio-group v-model="tipo_cuenta" inline dense>
                                            <v-radio label="CTA CTE" value="cta_cte"></v-radio>
                                            <v-radio label="CTA AH" value="cta_ah"></v-radio>
                                        </v-radio-group>
                                    </v-col>
                                </v-col>

                                <v-col cols="12" class="pa-0 d-flex align-center">
                                    <strong class="mr-4 pb-4">Nombre y apellido titular: </strong>
                                    <v-text-field v-model="nombre_titular" :rules="validar_formulario" variant="outlined" dense />
                                </v-col>

                                <v-col cols="12" class="pa-0 d-flex align-center">
                                    <strong class="mr-4 pb-4">Número de Cheque: </strong>
                                    <v-text-field v-model="documento_ide" :rules="validar_formulario" variant="outlined" dense />
                                </v-col>

                                <v-col cols="12" class="pa-0">
                                    <v-col class="pa-0 d-flex align-center">
                                        <h style="color:#2D2D8D" class="pb-6">Moneda:</h>
                                        <v-radio-group v-model="tipo_cuenta" inline dense>
                                            <v-radio label="Guaraniés" value="guaranies"></v-radio>
                                            <v-radio label="Dólares" value="dolares"></v-radio>
                                        </v-radio-group>
                                    </v-col>
                                </v-col>

                            </v-col>
                        </v-row>
                    </v-form>
                </v-window-item>

                <v-window-item value="montos">
                    <v-row class="ma-0 pt-2 depositos" style="color:#2D2D8D">
                        <v-col cols="12" md="6" class="cantidad">
                            <h>Ingrese el monto del cheque</h>
                            
                            <money3 v-model="cantidad" v-bind="config" class="mt-4 v-field__input v-field border-line" hint="Sólo podés ingresar múltiplos de 100" prefix="₲"/>
                             
                        </v-col>
                        <v-col cols="12" md="6">
                            <h>Cantidad de cheques</h>
                            <v-col cols="12" md="6" class="cantidad pa-0">
                                <money3 v-model="cantidad_cheques" v-bind="config" class="mt-4 v-field__input v-field border-line" hint="Sólo podés ingresar múltiplos de 100"/>
                            
                            </v-col>
                        </v-col>
                    </v-row>
                </v-window-item>

                <v-window-item value="proceso_exitoso" style="min-height: 480px">
                    <v-row class="ma-0 pt-2">

                        <v-col class="pa-5 d-flex align-center justify-center">
                            <v-img style="max-width: 55% !important;" src="../../assets/images/loading.png"
                                @click="proceso_exitoso()" />
                        </v-col>
                    </v-row>
                </v-window-item>


                <v-window-item value="finalizar_proceso">
                    <fin_proceso/>
                </v-window-item>
            </v-window>

            <v-tabs hide-slider style="height:55px" v-if="tab_cheques != 'proceso_exitoso'">

                <v-col :class="tab_cheques != 'finalizar_proceso' ? 'd-flex justify-space-between align-center' : 'd-flex justify-end align-center' ">
                    <v-tab style="text-transform:none;letter-spacing:0;color:#2D2D8D;font-size: 18px;"
                        @click="volver_proceso()" v-if="!exito_proceso">
                        <v-icon>
                            mdi-chevron-left
                        </v-icon> Volver
                    </v-tab>

                    <v-tab :disabled="deshabilitar_boton" class="btn-add-divisa" variant="outlined" v-if="tab_cheques != 'opcion_qr'"
                        @click="exito_proceso ? finalizar_proceso() : continuar()">{{
                            exito_proceso ? 'Finalizar' : 'Siguiente' }}</v-tab>

                </v-col>

            </v-tabs>
        </v-col>

        <v-dialog v-model="image_zoom" width="50%">
            <v-col class="d-flex justify-center">
                <v-img style="max-width: 100% !important; height:auto" src="../../assets/images/qr.svg" />
            </v-col>
        </v-dialog>
    </v-row>
</template>

<script>

import { Money3Component } from 'v-money3'
import fin_proceso from '../FinProceso.vue'
export default {
    components: {
        fin_proceso,
        money3: Money3Component
    },
    data: () => ({
        

        config: {
          masked: false,
          prefix: '',
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


        validar_formulario: [
                      v => !!v || ""
                    ],
        tab_cheques: null,

        bancoSeleccionado: null,
        deshabilitar_boton: true,
        opcionSeleccionada: [
            'Depósitos Cheques Propios',
            'Depósito Otros Bancos',
            'Cobro Cheque',
        ],
        tipoSeleccionado: null,
        // ************   RADIO BUTON'S   ************
        moneda: null,
        tipo_cuenta: null,

        eleccion: null,
        eleccion_monto: null,
        cantidad: 0,
        banco_elegido: 'BBVA',
        image_zoom: false,
        codigo_generado: false,
        esperando_proceso: true,
        exito_proceso: false,

        no_cuenta: '',
        no_boleta: '',
        nombre_titular: '',
        documento_ide: '',

    }),
    computed: {
        banco_seleccionado() {
            return `../assets/images/bancos/${this.bancoSeleccionado}.jpg`
        },
        opcion_seleccionada() {
            return '/ ' + this.opcionSeleccionada[(this.tipoSeleccionado -1)]
        }
    },
    watch: {
        tipoSeleccionado(){
            if(this.tipoSeleccionado != null)
            this.deshabilitar_boton = false
        },
    },
    methods: {
        continuar() {

            if (this.tab_cheques === 0) {
                if (this.tipoSeleccionado === null) { this.mensaje_seleccionar_tipo() } else {
                    if (this.tipoSeleccionado === 1) { this.tab_cheques = 3 }
                    if (this.tipoSeleccionado === 2) { this.tab_cheques = 3 }
                    if (this.tipoSeleccionado === 3) { this.tab_cheques = 3 }
                }
                if (this.tipoSeleccionado === 1) {
                    this.tab_cheques = 'datos'
                    this.$emit('tipoSeleccionado', this.opcion_seleccionada)
                }
                else if (this.tipoSeleccionado === 2) {
                    this.tab_cheques = 'datos'
                    this.$emit('tipoSeleccionado', this.opcion_seleccionada)
                }
                else if (this.tipoSeleccionado === 3) {
                    this.tab_cheques = 'datos'
                    this.$emit('tipoSeleccionado', this.opcion_seleccionada)
                }
            }

            else if (this.tab_cheques === 'datos') {
                this.tab_cheques = 'montos'
            }

            else if (this.tab_cheques === 'montos'){
                this.tab_cheques = 'proceso_exitoso'

            }


        },
        volver_proceso() {
            if (this.tab_cheques === 0) {
                this.$emit('volver', 0)
                this.opcion_seleccionada = ''
            } else if (this.tab_cheques === 'datos') {
                this.tab_cheques = 0
            } else if (this.tab_cheques === 'montos') {
                this.tab_cheques = 'datos'
            }

            else if (this.tab_cheques === 'opcion_qr') {
                this.tab_cheques = 0
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
        generar_qr() {
            this.codigo_generado = true
        },
        proceso_espera() {
            this.tab_cheques = 'proceso_exitoso'
            this.esperando_proceso = false
        },
        proceso_exitoso() {
            this.tab_cheques = 'finalizar_proceso'
            this.exito_proceso = true
        },
        finalizar_proceso() {
            this.$emit('finalizo_proceso', 0)
        },
    },
}
</script>

<style>
.depositos .v-text-field__prefix{
    line-height: 0;
    font-size: 25px !important;
}
</style>