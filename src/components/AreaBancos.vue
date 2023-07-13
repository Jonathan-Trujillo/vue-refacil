<template>
    <v-card>
        <v-row>
            <v-col cols="12" class="pa-10 d-flex align-center justify-center">
                <v-row style="min-height: 627px !important;max-height: 627px !important;" class="pt-3 d-flex align-center">
                    <v-col cols="12" md="7" class="d-flex align-center" style="min-height: 85px;max-height: 85px;">
                        <v-img class="img-top" :src="require(`../assets/images/bancos/${bancoSeleccionado}.jpg`)"
                            v-if="bancoSeleccionado != null" />
                        <v-card-title style="color:#2D2D8D">{{ banco_elegido }} {{ opcion_seleccionada }}</v-card-title>
                        <!-- {{ tab }}{{ moneda }} -->

                    </v-col>
                    <v-col cols="12" md="5" v-if="mostrar_comprobante" class="d-flex justify-end">
                        <h style="color:#2D2D8D"><strong>Número de Comprobante: </strong>{{ numero_comprobante }}</h>
                    </v-col>
                    <v-col cols="12" class="d-flex align-center">
                        <hr style="width:100%;border:0; border-bottom: 1px solid rgba(50,100,200,0.2)">
                    </v-col>

                    <v-col cols="12" class="pa-0" v-if="seleccionar_banco">

                        <v-col cols="12" class="py-0 pr-0" v-if="esperando_proceso">
                            <h style="color:#2D2D8D;font-size:18px">{{ tab === 0 ? `Elegí una de las entidades financieras
                                para ` :
                                'Elegí la opción con la que deseas continuar:' }} <strong>{{ tab === 0 ?
        `${tipo_transaccion}:` : '' }}</strong></h>
                        </v-col>
                        <v-window v-model="tab" class="mb-4 mt-2 divisas">
                            <v-window-item>
                                <v-row class="ma-0 pt-2 contenedor_divisas">
                                    <v-col cols="12" md="4">
                                        <div :class="bancoSeleccionado === bancos.id_banco_familiar ? '  seleccionado_img' : 'logobanco'"
                                            @click="bancoSeleccionado = bancos.id_banco_familiar, continuar()">
                                            <v-img src="../assets/images/bancos/banco-familiar.jpg" />
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div :class="bancoSeleccionado === bancos.id_banco_atlas ? '  seleccionado_img' : 'logobanco'"
                                            @click="bancoSeleccionado = bancos.id_banco_atlas, continuar()">
                                            <v-img src="../assets/images/bancos/banco-atlas.jpg" />
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div :class="bancoSeleccionado === bancos.id_banco_basa ? '  seleccionado_img' : 'logobanco'"
                                            @click="bancoSeleccionado = bancos.id_banco_basa, continuar()">
                                            <v-img src="../assets/images/bancos/banco-basa.jpg" />
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div :class="bancoSeleccionado === bancos.id_banco_sudameris ? '  seleccionado_img' : 'logobanco'"
                                            @click="bancoSeleccionado = bancos.id_banco_sudameris, continuar()">
                                            <v-img src="../assets/images/bancos/banco-sudameris.jpg" />
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div :class="bancoSeleccionado === bancos.id_banco_itau ? '  seleccionado_img' : 'logobanco'"
                                            @click="bancoSeleccionado = bancos.id_banco_itau, continuar()">
                                            <v-img src="../assets/images/bancos/banco-itau.jpg" />
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div :class="bancoSeleccionado === bancos.id_banco_bnf ? '  seleccionado_img' : 'logobanco'"
                                            @click="bancoSeleccionado = bancos.id_banco_bnf, continuar()">
                                            <v-img src="../assets/images/bancos/banco-bnf.jpg" />
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div :class="bancoSeleccionado === bancos.id_banco_bancop ? '  seleccionado_img' : 'logobanco'"
                                            @click="bancoSeleccionado = bancos.id_banco_bancop, continuar()">
                                            <v-img src="../assets/images/bancos/banco-bancop.jpg" />
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div :class="bancoSeleccionado === bancos.id_banco_comercipar ? '  seleccionado_img' : 'logobanco'"
                                            @click="bancoSeleccionado = bancos.id_banco_comercipar, continuar()">
                                            <v-img src="../assets/images/bancos/comercipar.jpg" />
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div :class="bancoSeleccionado === bancos.id_banco_continental ? '  seleccionado_img' : 'logobanco'"
                                            @click="bancoSeleccionado = bancos.id_banco_continental, continuar()">
                                            <v-img src="../assets/images/bancos/banco-continental.jpg" />
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div :class="bancoSeleccionado === bancos.id_banco_gnb ? '  seleccionado_img' : 'logobanco'"
                                            @click="bancoSeleccionado = bancos.id_banco_gnb, continuar()">
                                            <v-img src="../assets/images/bancos/banco-gnb.jpg" />
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div :class="bancoSeleccionado === bancos.id_banco_interfisa ? '  seleccionado_img' : 'logobanco'"
                                            @click="bancoSeleccionado = bancos.id_banco_interfisa, continuar()">
                                            <v-img src="../assets/images/bancos/banco-interfisa.jpg" />
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div :class="bancoSeleccionado === bancos.id_banco_rio ? '  seleccionado_img' : 'logobanco'"
                                            @click="bancoSeleccionado = bancos.id_banco_rio, continuar()">
                                            <v-img src="../assets/images/bancos/banco-rio.jpg" />
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div :class="bancoSeleccionado === bancos.id_banco_vision ? '  seleccionado_img' : 'logobanco'"
                                            @click="bancoSeleccionado = bancos.id_banco_vision, continuar()">
                                            <v-img src="../assets/images/bancos/banco-vision.jpg" />
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div :class="bancoSeleccionado === bancos.id_cooperativa_multiactiva ? '  seleccionado_img' : 'logobanco'"
                                            @click="bancoSeleccionado = bancos.id_cooperativa_multiactiva, continuar()">
                                            <v-img src="../assets/images/bancos/cooperativa-multiactiva.jpg" />
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div :class="bancoSeleccionado === bancos.id_cooperativa_8_de_marzo ? '  seleccionado_img' : 'logobanco'"
                                            @click="bancoSeleccionado = bancos.id_cooperativa_8_de_marzo, continuar()">
                                            <v-img src="../assets/images/bancos/cooperativa-8-de-marzo.jpg" />
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div :class="bancoSeleccionado === bancos.id_cooperativa_medalla_milagrosa ? '  seleccionado_img' : 'logobanco'"
                                            @click="bancoSeleccionado = bancos.id_cooperativa_medalla_milagrosa, continuar()">
                                            <v-img src="../assets/images/bancos/cooperativa-medalla-milagrosa.jpg" />
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div :class="bancoSeleccionado === bancos.id_cooperativa_nazareth ? '  seleccionado_img' : 'logobanco'"
                                            @click="bancoSeleccionado = bancos.id_cooperativa_nazareth, continuar()">
                                            <v-img src="../assets/images/bancos/cooperativa-nazareth.jpg" />
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div :class="bancoSeleccionado === bancos.id_cooperativa_universitaria ? '  seleccionado_img' : 'logobanco'"
                                            @click="bancoSeleccionado = bancos.id_cooperativa_universitaria, continuar()">
                                            <v-img src="../assets/images/bancos/cooperativa-universitaria.jpg" />
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div :class="bancoSeleccionado === bancos.id_fic_de_finanzas ? '  seleccionado_img' : 'logobanco'"
                                            @click="bancoSeleccionado = bancos.id_fic_de_finanzas, continuar()">
                                            <v-img src="../assets/images/bancos/fic-de-finanzas.jpg" />
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div :class="bancoSeleccionado === bancos.id_financiera_finexpar ? '  seleccionado_img' : 'logobanco'"
                                            @click="bancoSeleccionado = bancos.id_financiera_finexpar, continuar()">
                                            <v-img src="../assets/images/bancos/financiera-finexpar.jpg" />
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div :class="bancoSeleccionado === bancos.id_financiera_finlatina ? '  seleccionado_img' : 'logobanco'"
                                            @click="bancoSeleccionado = bancos.id_financiera_finlatina, continuar()">
                                            <v-img src="../assets/images/bancos/financiera-finlatina.jpg" />
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div :class="bancoSeleccionado === bancos.id_financiera_japosa ? '  seleccionado_img' : 'logobanco'"
                                            @click="bancoSeleccionado = bancos.id_financiera_japosa, continuar()">
                                            <v-img src="../assets/images/bancos/financiera-japosa.jpg" />
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div :class="bancoSeleccionado === bancos.id_solar_banco ? '  seleccionado_img' : 'logobanco'"
                                            @click="bancoSeleccionado = bancos.id_solar_banco, continuar()">
                                            <v-img src="../assets/images/bancos/solar-banco.jpg" />
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div :class="bancoSeleccionado === bancos.id_tu_financiera ? '  seleccionado_img' : 'logobanco'"
                                            @click="bancoSeleccionado = bancos.id_tu_financiera, continuar()">
                                            <v-img src="../assets/images/bancos/tu-financiera.jpg" />
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div :class="bancoSeleccionado === bancos.id_ueno ? '  seleccionado_img' : 'logobanco'"
                                            @click="bancoSeleccionado = bancos.id_ueno, continuar()">
                                            <v-img src="../assets/images/bancos/ueno.jpg" />
                                        </div>
                                    </v-col>

                                </v-row>
                            </v-window-item>

                            <v-window-item>
                                <v-row class="ma-0 pt-2">
                                    <!-- *******   OPCION DEPOSITAR   ******* -->
                                    <v-col cols="12" md="4" v-if="mostrar_opciones_depositar">
                                        <div class="d-flex align-center justify-center"
                                            :class="eleccion === 0 ? 'seleccionado' : 'logobanco'"
                                            @click="eleccion = 0, continuar()">
                                            Efectivo
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4" v-if="mostrar_opciones_depositar">
                                        <div class="d-flex align-center justify-center"
                                            :class="eleccion === 1 ? 'seleccionado' : 'logobanco'"
                                            @click="eleccion = 1, continuar()">
                                            Cheques
                                        </div>
                                    </v-col>

                                    <!-- *******   OPCION PAGAR   ******* -->
                                    <v-col cols="12" md="4" v-if="mostrar_opciones_pagar">
                                        <div class="d-flex align-center justify-center"
                                            :class="eleccion === 2 ? 'seleccionado' : 'logobanco'"
                                            @click="eleccion = 2, continuar()">
                                            Prestamo
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4" v-if="mostrar_opciones_pagar">
                                        <div class="d-flex align-center justify-center flex-column"
                                            :class="eleccion === 3 ? 'seleccionado' : 'logobanco'"
                                            @click="eleccion = 3, continuar()">
                                            Tarjeta de Crédito
                                        </div>
                                    </v-col>

                                    <!-- *******   OPCION COBRAR   ******* -->
                                    <v-col cols="12" md="4" v-if="mostrar_opciones_cobrar">
                                        <div class="d-flex align-center justify-center"
                                            :class="eleccion === 4 ? 'seleccionado' : 'logobanco'"
                                            @click="eleccion = 4, continuar()">
                                            Desde mi Cuenta
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4" v-if="mostrar_opciones_cobrar">
                                        <div class="d-flex align-center justify-center"
                                            :class="eleccion === 5 ? 'seleccionado' : 'logobanco'"
                                            @click="eleccion = 5, continuar()">
                                            Desde mi Cuenta con QR
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4" v-if="mostrar_opciones_cobrar">
                                        <div class="d-flex align-center justify-center"
                                            :class="eleccion === 6 ? 'seleccionado' : 'logobanco'"
                                            @click="eleccion = 6, continuar()">
                                            Mi Prestamo
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4" v-if="mostrar_opciones_cobrar">
                                        <div class="d-flex align-center justify-center"
                                            :class="eleccion === 7 ? 'seleccionado' : 'logobanco'"
                                            @click="eleccion = 7, continuar()">
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
                                    v-if="tab < 9 && tab > 1 || exito_proceso">{{ exito_proceso ? 'Finalizar' : 'Siguiente'
                                    }}</v-tab>

                            </v-col>

                        </v-tabs>

                    </v-col>
                    <v-col cols="12" class="pa-0">
                        <quiero_depositar v-if="ver_depositar" :eleccion="eleccion" :banco_elegido="banco_elegido"
                            @volver="ver_depositar = false, seleccionar_banco = true"
                            @finalizo_proceso="$emit('finalizo_proceso', 0)"
                            @mostrar_comprobante="mostrar_comprobante = true" />

                        <quiero_pagar v-if="ver_pagar" :eleccion="eleccion" :banco_elegido="banco_elegido"
                            @volver="ver_pagar = false, seleccionar_banco = true"
                            @finalizo_proceso="$emit('finalizo_proceso', 0)"
                            @mostrar_comprobante="mostrar_comprobante = true" />

                        <quiero_cobrar v-if="ver_cobrar" :eleccion="eleccion" :banco_elegido="banco_elegido"
                            @volver="ver_cobrar = false, seleccionar_banco = true"
                            @finalizo_proceso="$emit('finalizo_proceso', 0)"
                            @mostrar_comprobante="mostrar_comprobante = true" />

                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-card>
</template>


<script>
import quiero_depositar from '../components/operaciones/QuieroDepositar'
import quiero_pagar from '../components/operaciones/QuieroPagar'
import quiero_cobrar from '../components/operaciones/QuieroCobrar'


import { state } from '../funciones_globales'

export default {
    components: {
        quiero_depositar,
        quiero_pagar,
        quiero_cobrar,
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
            banco_bnf: 'Banco BNF',

            id_banco_bancop: 'banco-bancop',
            banco_bancop: 'Bancop',

            id_banco_comercipar: 'comercipar',
            banco_comercipar: 'Comercipar',

            id_banco_continental: 'banco-continental',
            banco_continental: 'Banco Continental',

            id_banco_gnb: 'banco-gnb',
            banco_gnb: 'Banco GNB',

            id_banco_interfisa: 'banco-interfisa',
            banco_interfisa: 'Banco Interfisa',

            id_banco_rio: 'banco-rio',
            banco_rio: 'Banco Río',

            id_banco_vision: 'banco-vision',
            banco_vision: 'Banco Vision',

            id_cooperativa_multiactiva: 'cooperativa-multiactiva',
            cooperativa_multiactiva: 'Cooperativa Multiactiva',

            id_cooperativa_8_de_marzo: 'cooperativa-8-de-marzo',
            cooperativa_8_de_marzo: 'Cooperativa 8 de Marzo',

            id_cooperativa_medalla_milagrosa: 'cooperativa-medalla-milagrosa',
            cooperativa_medalla_milagrosa: 'Cooperativa Medalla Milagrosa',

            id_cooperativa_nazareth: 'cooperativa-nazareth',
            cooperativa_nazareth: 'Cooperativa Nazareth',

            id_cooperativa_universitaria: 'cooperativa-universitaria',
            cooperativa_universitaria: 'Cooperativa Universitaria',

            id_fic_de_finanzas: 'fic-de-finanzas',
            fic_de_finanzas: 'FIC de Finanzas',

            id_financiera_finexpar: 'financiera-finexpar',
            financiera_finexpar: 'Financiera Finexpar',

            id_financiera_finlatina: 'financiera-finlatina',
            financiera_finlatina: 'Financiera Finlatina',

            id_financiera_japosa: 'financiera-japosa',
            financiera_japosa: 'Financiera Japosa',

            id_solar_banco: 'solar-banco',
            solar_banco: 'Solar Banco',

            id_tu_financiera: 'tu-financiera',
            tu_financiera: 'Tu Financiera',

            id_ueno: 'ueno',
            ueno: 'Ueno'
        },


        tipoSeleccionado: null,
        // ************   RADIO BUTON'S   ************
        moneda: null,
        tipo_cuenta: null,

        mostrar_comprobante: false,
        numero_comprobante: 5462356623565,


        eleccion: null,
        esperando_proceso: true,
        exito_proceso: false,

        ver_depositar: false,
        ver_pagar: false,
        ver_cobrar: false,
        ver_pantalla_error: false,

        ver_pago_prestamos: false,
        ver_cheques: false,
        ver_extraccion: false,
        ver_pago_tarjeta: false,

        banco_elegido: null

    }),
    computed: {
        // banco_elegido() {
        //     return this.bancoSeleccionado === this.bancos.id_banco_familiar ? `${this.bancos.banco_familiar} /` : this.bancoSeleccionado === this.bancos.id_banco_atlas ? `${this.bancos.banco_atlas} /` : this.bancoSeleccionado === this.bancos.id_banco_basa ? `${this.bancos.banco_basa} /` : this.bancoSeleccionado === this.bancos.id_banco_sudameris ? `${this.bancos.banco_sudameris} /` : this.bancoSeleccionado === this.bancos.id_banco_itau ? `${this.bancos.banco_itau} /` : this.bancoSeleccionado === this.bancos.id_banco_bnf ? `${this.bancos.banco_bnf} /` : null
        // },
        tipo_transaccion() {
            return state.mostrar_depositar ? 'Depositar' : state.mostrar_pagar ? 'Pagar' : 'Cobrar'
        },
        banco_seleccionado() {
            return `../assets/images/bancos/${this.bancoSeleccionado}.jpg`
        },
        opcion_seleccionada() {
            return this.opcionSeleccionada[this.eleccion]
        },
        mostrar_opciones_depositar() {
            return state.mostrar_depositar
        },
        mostrar_opciones_pagar() {
            return state.mostrar_pagar
        },
        mostrar_opciones_cobrar() {
            return state.mostrar_cobrar
        }
    },
    watch: {
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
                if (this.bancoSeleccionado === null) { this.mensaje_seleccionar_banco() }
                else {
                    this.tab = this.tab + 1
                
                    const selectedBancoKey = Object.entries(this.bancos).find(([key, value]) => key.startsWith('id_')  && value === this.bancoSeleccionado)[0];
                    const bancoKey = selectedBancoKey.replace('id_', '');
                    this.banco_elegido = this.bancos[bancoKey] + ' / '
            }
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
        },
        volver_proceso() {
            if (this.tab === 0) {
                state.mostrar_seccion_principal = false
                state.mostrar_seccion_inicial = true
            }
            else if (this.tab === 1) {
                this.tab = this.tab - 1

                this.banco_elegido = null
                this.bancoSeleccionado = null
                this.eleccion = null
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
    },
}
</script>