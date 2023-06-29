<template>
    <v-card>
        <v-row>
            <v-col cols="12" class="pa-10 d-flex align-center justify-center">
                <v-row style="min-height: 627px !important;max-height: 627px !important;" class="pt-3 d-flex align-start">
                    <v-col cols="12" class="d-flex align-center" style="min-height: 85px;max-height: 85px;">
                        <v-img class="img-top" :src="require(`../assets/images/bancos/${bancoSeleccionado}.jpg`)"
                            v-if="bancoSeleccionado != null" />
                        <v-card-title style="color:#2D2D8D">{{ banco_elegido }} {{ opcion_seleccionada }} {{ opcion_cheques }}</v-card-title>
                        <!-- {{ tab }}{{ moneda }} -->

                    </v-col>
                    <v-col cols="12">
                        <hr style="border:0; border-bottom: 2px solid rgba(50,100,200,0.2)">
                    </v-col>

                    <v-col cols="12" class="pa-0" v-if="seleccionar_banco">

                        <v-col cols="12" class="py-0 pr-0" v-if="esperando_proceso">
                            <h style="color:#2D2D8D;font-size:18px">{{ tab === 0 ? `Elegí una de las entidades financieras para ` :
                                'Elegí la opción con la que deseas continuar:' }} <strong>{{ tab === 0 ? `${tipo_transaccion}:` : ''}}</strong></h>
                        </v-col>
                        <v-window v-model="tab" class="mb-4 mt-2 divisas">
                            <v-window-item>
                                <v-row class="ma-0 pt-2">
                                    <v-col cols="12" md="4">
                                        <div :class="bancoSeleccionado === bancos.id_banco_familiar ? '  seleccionado_img' : 'logobanco'"
                                            @click="bancoSeleccionado = bancos.id_banco_familiar, continuar()">
                                            <v-img src='../assets/images/bancos/banco-familiar.jpg' />
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div :class="bancoSeleccionado === bancos.id_banco_atlas ? '  seleccionado_img' : 'logobanco'"
                                            @click="bancoSeleccionado = bancos.id_banco_atlas, continuar()">
                                            <v-img src='../assets/images/bancos/banco-atlas.jpg' />
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div :class="bancoSeleccionado === bancos.id_banco_basa ? '  seleccionado_img' : 'logobanco'"
                                            @click="bancoSeleccionado = bancos.id_banco_basa, continuar()">
                                            <v-img src='../assets/images/bancos/banco-basa.jpg' />
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div :class="bancoSeleccionado === bancos.id_banco_sudameris ? '  seleccionado_img' : 'logobanco'"
                                            @click="bancoSeleccionado = bancos.id_banco_sudameris, continuar()">
                                            <v-img src='../assets/images/bancos/banco-sudameris.jpg' />
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div :class="bancoSeleccionado === bancos.id_banco_itau ? '  seleccionado_img' : 'logobanco'"
                                            @click="bancoSeleccionado = bancos.id_banco_itau, continuar()">
                                            <v-img src='../assets/images/bancos/banco-itau.jpg' />
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div :class="bancoSeleccionado === bancos.id_banco_bnf ? '  seleccionado_img' : 'logobanco'"
                                            @click="bancoSeleccionado = bancos.id_banco_bnf, continuar()">
                                            <v-img src='../assets/images/bancos/banco-bnf.jpg' />
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-window-item>

                            <v-window-item>
                                <v-row class="ma-0 pt-2">
                                    <!-- *******   OPCION DEPOSITAR   ******* -->
                                    <v-col cols="12" md="4" v-if="mostrar_opciones_depositar">
                                        <div class="d-flex align-center justify-center"
                                            :class="eleccion === 0 ? 'seleccionado' : 'logobanco'" @click="eleccion = 0, continuar()">
                                            Efectivo
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4" v-if="mostrar_opciones_depositar">
                                        <div class="d-flex align-center justify-center"
                                            :class="eleccion === 1 ? 'seleccionado' : 'logobanco'" @click="eleccion = 1, continuar()">
                                            Cheques
                                        </div>
                                    </v-col>

                                    <!-- *******   OPCION PAGAR   ******* -->
                                    <v-col cols="12" md="4" v-if="mostrar_opciones_pagar">
                                        <div class="d-flex align-center justify-center"
                                            :class="eleccion === 2 ? 'seleccionado' : 'logobanco'" @click="eleccion = 2, continuar()">
                                            Prestamo
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4" v-if="mostrar_opciones_pagar">
                                        <div class="d-flex align-center justify-center flex-column"
                                            :class="eleccion === 3 ? 'seleccionado' : 'logobanco'" @click="eleccion = 3, continuar()">
                                            Tarjeta de Crédito
                                        </div>
                                    </v-col>

                                    <!-- *******   OPCION COBRAR   ******* -->
                                    <v-col cols="12" md="4" v-if="mostrar_opciones_cobrar">
                                        <div class="d-flex align-center justify-center"
                                            :class="eleccion === 4 ? 'seleccionado' : 'logobanco'" @click="eleccion = 4, continuar()">
                                            Desde mi Cuenta
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4" v-if="mostrar_opciones_cobrar">
                                        <div class="d-flex align-center justify-center"
                                            :class="eleccion === 5 ? 'seleccionado' : 'logobanco'" @click="eleccion = 5, continuar()">
                                            Desde mi Cuenta con QR
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4" v-if="mostrar_opciones_cobrar">
                                        <div class="d-flex align-center justify-center"
                                            :class="eleccion === 6 ? 'seleccionado' : 'logobanco'" @click="eleccion = 6, continuar()">
                                            Mi Prestamo
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4" v-if="mostrar_opciones_cobrar">
                                        <div class="d-flex align-center justify-center"
                                            :class="eleccion === 7 ? 'seleccionado' : 'logobanco'" @click="eleccion = 7, continuar()">
                                            Un Cheque
                                        </div>
                                    </v-col>

                                </v-row>
                            </v-window-item>
                        </v-window>

                        <v-tabs hide-slider style="height:55px">

                            <!-- <v-col :class="tab === 0 || exito_proceso ? 'd-flex justify-end align-center' : 'd-flex justify-space-between align-center'"> -->
                            <v-col class="d-flex justify-space-between align-center">
                            
                                <v-tab style="text-transform:none;letter-spacing:0;color:#2D2D8D;font-size: 18px;"
                                    @click="volver_proceso()">
                                    <v-icon>
                                        mdi-chevron-left
                                    </v-icon> Volver
                                </v-tab>

                                <v-tab :disabled="deshablitar_boton" class="btn-add-divisa" variant="outlined"
                                    @click="exito_proceso ? finalizar_proceso() : continuar()"
                                    v-if="tab < 9 && tab > 1 || exito_proceso">{{ exito_proceso ? 'Finalizar' : 'Siguiente' }}</v-tab>

                            </v-col>

                        </v-tabs>

                    </v-col>
                    <v-col cols="12" class="pa-0">
                        <quiero_depositar v-if="ver_depositar" :eleccion="eleccion"
                            @volver="ver_depositar = false, seleccionar_banco = true"
                            @finalizo_proceso="$emit('finalizo_proceso', 0)"/>
                            
                        <quiero_pagar v-if="ver_pagar" :eleccion="eleccion"
                            @volver="ver_pagar = false, seleccionar_banco = true"
                            @finalizo_proceso="$emit('finalizo_proceso', 0)" />

                        <quiero_cobrar v-if="ver_cobrar" :eleccion="eleccion"
                            @volver="ver_cobrar = false, seleccionar_banco = true"
                            @finalizo_proceso="$emit('finalizo_proceso', 0)" />
                            
                        <!-- <pago_prestamos v-if="ver_pago_prestamos"
                            @volver="ver_pago_prestamos = false, seleccionar_banco = true"
                            @finalizo_proceso="$emit('finalizo_proceso', 0)" />
                        <depositos_en_efectivo v-if="ver_depositos_en_efectivo"
                            @volver="ver_depositos_en_efectivo = false, seleccionar_banco = true"
                            @finalizo_proceso="$emit('finalizo_proceso', 0)" />
                        <operacion_con_cheques v-if="ver_cheques" @volver="ver_cheques = false, seleccionar_banco = true"
                            @tipoSeleccionado="actualizar_datos_cheques" @finalizo_proceso="$emit('finalizo_proceso', 0)" />
                        <extraccion_efectivo v-if="ver_extraccion"
                            @volver="ver_extraccion = false, seleccionar_banco = true"
                            @finalizo_proceso="$emit('finalizo_proceso', 0)" />
                        <pago_tarjeta v-if="ver_pago_tarjeta" @volver="ver_pago_tarjeta = false, seleccionar_banco = true"
                            @finalizo_proceso="$emit('finalizo_proceso', 0)" /> -->
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-card>
</template>


<script>
// import pago_prestamos from './opciones/PagoPrestamos.vue'
// import depositos_en_efectivo from './opciones/DepositosEnEfectivo.vue'
// import operacion_con_cheques from './opciones/OperacionConCheques.vue'
// import extraccion_efectivo from './opciones/ExtraccionEfectivo.vue'
// import pago_tarjeta from './opciones/PagoTarjetaConCedula.vue'

import quiero_depositar from '../components/operaciones/QuieroDepositar'
import quiero_pagar from '../components/operaciones/QuieroPagar'
import quiero_cobrar from '../components/operaciones/QuieroCobrar'

import { state } from '../funciones_globales'

export default {
    components: {
        quiero_depositar,
        quiero_pagar,
        quiero_cobrar
        // pago_prestamos,
        // depositos_en_efectivo,
        // operacion_con_cheques,
        // extraccion_efectivo,
        // pago_tarjeta
    },
    data: () => ({
        tab: null,

        seleccionar_banco: true,
        deshablitar_boton: true,
        bancoSeleccionado: null,
        opcionSeleccionada: [
            'Deposito en Efectivo',
            'Deposito en Cheque',

            'Pagar Prestamo',
            'Pagar Tarjeta de Crédito',

            'Cobrar Desde mi Cuenta',
            'Cobrar Desde mi Cuenta con QR',
            'Cobrar Prestamo',
            'Cobrar Cheque'
        ],
        bancos: {
            id_banco_familiar: 'banco-familiar',
            banco_familiar: 'Banco Familiar',
            
            id_banco_atlas: 'banco-atlas',
            banco_atlas: 'Banco Atlas',
            
            id_banco_basa: 'banco-basa',
            banco_basa: 'Banco Basa',

            id_banco_sudameris: 'banco-sudameris',
            banco_sudameris: 'Banco Sudameris',
            
            id_banco_itau: 'banco-itau',
            banco_itau: 'Banco Itaú',

            id_banco_bnf: 'banco-bnf',
            banco_bnf: 'Banco BNF'
        },

        tipoSeleccionado: null,
        // ************   RADIO BUTON'S   ************
        moneda: null,
        tipo_cuenta: null,



        eleccion: null,
        eleccion_monto: null,
        cantidad: 0,
        no_cuenta: 7053459203,
        // banco_elegido: 'BBVA',
        image_zoom: false,
        codigo_generado: false,
        esperando_proceso: true,
        exito_proceso: false,

        ver_depositar: false,
        ver_pagar: false,
        ver_cobrar: false,

        ver_pago_prestamos: false,
        ver_cheques: false,
        ver_extraccion: false,
        ver_pago_tarjeta: false,

        no_boleta: null,

        opcion_cheques: '',
    }),
    computed: {
        banco_elegido(){
            return this.bancoSeleccionado === this.bancos.id_banco_familiar ? `${this.bancos.banco_familiar} /` : this.bancoSeleccionado === this.bancos.id_banco_atlas ? `${this.bancos.banco_atlas} /` :  this.bancoSeleccionado === this.bancos.id_banco_basa ? `${this.bancos.banco_basa} /` : this.bancoSeleccionado === this.bancos.id_banco_sudameris ? `${this.bancos.banco_sudameris} /` :  this.bancoSeleccionado === this.bancos.id_banco_itau ? `${this.bancos.banco_itau} /` : this.bancoSeleccionado === this.bancos.id_banco_bnf ? `${this.bancos.banco_bnf} /` : null
        },
        tipo_transaccion(){
            return state.mostrar_depositar ? 'Depositar' : state.mostrar_pagar ? 'Pagar' : 'Cobrar'
        },
        banco_seleccionado() {
            return `../assets/images/bancos/${this.bancoSeleccionado}.jpg`
        },
        opcion_seleccionada() {
            return this.opcionSeleccionada[this.eleccion]
        },
        mostrar_opciones_depositar(){
            return state.mostrar_depositar
        },
        mostrar_opciones_pagar(){
            return state.mostrar_pagar
        },
        mostrar_opciones_cobrar(){
            return state.mostrar_cobrar
        }
    },
    watch: {
        // bancoSeleccionado() {
        //     if (this.bancoSeleccionado != null) {
        //         this.deshablitar_boton = false
        //     }
        // },
        eleccion() {
            if (this.eleccion != null) {
                this.deshablitar_boton = false
            }
        }

    },
    methods: {
        
        continuar() {
            if (this.eleccion === null) { this.deshablitar_boton = true }
            if (this.tab === 0) {
                if (this.bancoSeleccionado === null) { this.mensaje_seleccionar_banco() } else { this.tab = this.tab + 1 }
            }

            else if (this.tab === 1) {
                if (this.eleccion === null) { this.mensaje_seleccionar_opcion() }

                /*************   Cuando se elija "Quiero Depositar"   *************/
                if (this.eleccion === 0 || this.eleccion === 1) {
                    this.ver_depositar = true
                    this.seleccionar_banco = false
                }

                /*************   Cuando se elija "Quiero Pagar"   *************/
                else if (this.eleccion === 2 || this.eleccion === 3) {
                    this.ver_pagar = true
                    this.seleccionar_banco = false
                }


                /*************   Cuando se elija "Quiero Cobrar"   *************/
                else if (this.eleccion === 4 || this.eleccion === 5 || this.eleccion === 6 || this.eleccion === 7) {
                    this.ver_cobrar = true
                    this.seleccionar_banco = false
                }

            }




            // else if (this.tab === 2) {
            //     if (this.tipoSeleccionado === null) { this.mensaje_seleccionar_tipo() } else {
            //         if (this.tipoSeleccionado === 1) { this.tab = 3 }
            //         if (this.tipoSeleccionado === 2) { this.tab = this.tab + 2 }
            //     }
            // }
            // else if (this.tab === 3) { this.tab = 4 } else if (this.tab === 4) { this.tab = 6 }



        },
        volver_proceso() {
            if (this.tab === 0){
                state.mostrar_seccion_principal = false
                state.mostrar_seccion_inicial = true
            }
            else if (this.tab === 1) {
                this.tab = this.tab - 1
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
            this.tab = 4
            this.esperando_proceso = false
        },
        proceso_exitoso() {
            this.tab = 5
            this.exito_proceso = true
        },
        finalizar_proceso() {
            this.$emit('finalizo_proceso', 0)
        },
        actualizar_datos_cheques(valor) {
            this.opcion_cheques = valor
        }
    },
}
</script>

<style>
.cantidad .v-field__input,
.cantidad .v-text-field__prefix {
    color: #2D2D8D !important;
    font-size: 40px;
    font-weight: 600;
}</style>