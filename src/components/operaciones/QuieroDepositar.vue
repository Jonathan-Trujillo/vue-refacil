<template>
    <v-row class="ma-0">
        <v-col>
            <v-col cols="12" class="py-0"
                v-if="tab_deposito_efectivo != 'proceso_exitoso' && tab_deposito_efectivo != 'finalizar_proceso'">
                <span style="color:#2D2D8D;font-size:18px">{{ tab_deposito_efectivo === 0 ? 'Ingresá la siguiente información: ' : 'Elegí el monto que deseas depositar'}}</span>
            </v-col>

            <v-window v-model="tab_deposito_efectivo" class="divisas">

                <v-window-item value="deposito_efectivo">
                    <v-form ref="form">
                        <v-row class="ma-0 pt-2">
                            <v-col cols="12" style="color:#2D2D8D">

                                <v-col cols="12" md="6" class="pa-0 d-flex align-center">
                                    <strong class="mr-4">Número de cédula depositante: </strong>
                                    <money3 v-model="nombre_titular" :precision="0" maxlength="20" v-bind="config" class="v-field__input v-field border-line"/>
                                </v-col>
                                
                                <v-col cols="12" md="6" class="mt-6 pa-0 d-flex align-center" v-if="eleccion === 1">
                                    <strong class="mr-4">Número de cédula del titular: </strong>
                                    <money3 v-model="nombre_titular" :precision="0" maxlength="20" v-bind="config" class="v-field__input v-field border-line"/>
                                </v-col>

                                <v-col cols="12" md="5" class="mt-6 pa-0 d-flex align-center">
                                    <strong class="mr-4">Número de boleta: </strong>
                                    <money3 v-model="no_boleta" :precision="0" maxlength="20" v-bind="config" class="v-field__input v-field border-line"/>
                                </v-col>

                                <v-col cols="12" class="mt-6 pa-0 d-flex align-center">
                                    <strong class="mr-4">Número de y tipo de cuenta bancaria: </strong>
                                    <v-select v-model="no_cuenta" :rules="validar_formulario" variant="outlined" dense />
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
                                        <money3 v-model="eleccion_monto" :prefix="tipo_moneda === 'guaranies' ? '₲' : '$'" maxlength="20" v-bind="config" class="v-field__input v-field border-line"/>
                                    </v-col>
                                    <v-col cols="12" md="5" class="ml-4 pa-0 d-flex align-center" v-if="eleccion === 1">
                                        <strong class="mr-4">Cantidad de Cheques: </strong>
                                        <money3 v-model="eleccion_monto" maxlength="3" v-bind="config" class="v-field__input v-field border-line"/>
                                    </v-col>

                                </v-col>


                            </v-col>
                        </v-row>
                    </v-form>
                </v-window-item>

                <!-- <v-window-item value="elegir_monto">
                    <v-row class="ma-0 pt-2">
                        <v-col cols="12" md="4">
                            <div class="d-flex align-center justify-center"
                                :class="eleccion_monto === 0 ? 'seleccionado' : 'logobanco'" @click="eleccion_monto = 0">
                                ₲ 20.000
                            </div>
                        </v-col>
                        <v-col cols="12" md="4">
                            <div class="d-flex align-center justify-center"
                                :class="eleccion_monto === 1 ? 'seleccionado' : 'logobanco'" @click="eleccion_monto = 1">
                                ₲ 50.000
                            </div>
                        </v-col>
                        <v-col cols="12" md="4">
                            <div class="d-flex align-center justify-center"
                                :class="eleccion_monto === 2 ? 'seleccionado' : 'logobanco'" @click="eleccion_monto = 2">
                                ₲ 100.000
                            </div>
                        </v-col>
                        <v-col cols="12" md="4">
                            <div class="d-flex align-center justify-center flex-column"
                                :class="eleccion_monto === 3 ? 'seleccionado' : 'logobanco'" @click="eleccion_monto = 3">
                                ₲ 500.000
                            </div>
                        </v-col>
                        <v-col cols="12" md="4">
                            <div class="d-flex align-center justify-center"
                                :class="eleccion_monto === 4 ? 'seleccionado' : 'logobanco'" @click="eleccion_monto = 4">
                                ₲ 1.000.00.000
                            </div>
                        </v-col>
                        <v-col cols="12" md="4">
                            <div class="d-flex align-center justify-center"
                                :class="eleccion_monto === 5 ? 'seleccionado' : 'logobanco'" @click="eleccion_monto = 5">
                                Elegir otro monto
                            </div>
                        </v-col>
                    </v-row>
                </v-window-item> -->


                <!-- <v-window-item value="otro_monto">
                    <v-row class="ma-0 pt-2">
                        <v-col cols="12" md="6" class="cantidad">
                            <v-text-field v-model.number="cantidad" prefix="₲"
                                hint="Sólo podés ingresar múltiplos de 100" />
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

            <v-tabs hide-slider style="height:55px" v-if="tab_deposito_efectivo != 'proceso_exitoso'">

                <v-col
                    :class="tab_deposito_efectivo != 'finalizar_proceso' ? 'd-flex justify-space-between align-center' : 'd-flex justify-end align-center'">
                    <v-tab style="text-transform:none;letter-spacing:0;color:#2D2D8D;font-size: 18px;"
                        @click="volver_proceso()" v-if="!exito_proceso">
                        <v-icon>
                            mdi-chevron-left
                        </v-icon> Volver
                    </v-tab>

                    <v-tab :disabled="tab_deposito_efectivo === 'elegir_monto' ? deshabilitar_boton : false"
                        class="btn-add-divisa" variant="outlined" @click="exito_proceso ? finalizar_proceso() : continuar()">{{ exito_proceso ? 'Finalizar' : 'Siguiente' }}</v-tab>

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
import { state } from '../../views/HomeView.vue'
// import currency from 'currency.js'


import fin_proceso from '../FinProceso.vue'
export default {
    components: {
        fin_proceso,
        money3: Money3Component
    },
    data: () => ({


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
        tipo_moneda: 'guaranies',

        validar_formulario: [
            v => !!v || ""
        ],
        tab_deposito_efectivo: null,
        deshabilitar_boton: true,
        bancoSeleccionado: null,
        // ************   RADIO BUTON'S   ************
        moneda: null,
        tipo_cuenta: null,

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
    props: {
        eleccion: null
    },
    computed: {
        banco_seleccionado() {
            return `../assets/images/bancos/${this.bancoSeleccionado}.jpg`
        },
    },
    methods: {
        continuar() {
            if (this.tab_deposito_efectivo === 'deposito_efectivo') {
                this.tab_deposito_efectivo = 'proceso_exitoso'
            }
            else if (this.tab_deposito_efectivo === 'proceso_exitoso') {
                this.tab_deposito_efectivo = 'finalizar_proceso'
                this.exito_proceso = true
            }

        },
        volver_proceso() {
            if (this.tab_deposito_efectivo === 0) {
                this.$emit('volver', 0)
            }
            else if (this.tab_deposito_efectivo === 'elegir_monto') {
                this.tab_deposito_efectivo = 0
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
            this.tab_deposito_efectivo = 'proceso_exitoso'
            this.esperando_proceso = false
        },
        proceso_exitoso() {
            this.tab_deposito_efectivo = 'finalizar_proceso'
            this.exito_proceso = true
        },
        finalizar_proceso() {
            this.$emit('finalizo_proceso', 0)
            state.mostrar_seccion_inicial = true
            state.mostrar_seccion_principal = false
        },
    },
}
</script>
