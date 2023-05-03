<template>
    <v-card>
        <v-row>
            <v-col class="pa-16 d-flex align-center justify-center">
                <v-row style="min-height: 460px !important">
                    <v-col cols="12" class="d-flex align-center">
                        <v-img class="img-top" :src="require(`../assets/images/bancos/${bancoSeleccionado}.jpg`)"
                            v-if="bancoSeleccionado != null" />
                        <v-card-title style="color:#2D2D8D">{{opcion_seleccionada}}</v-card-title>
                        <!-- {{ tab }}{{ moneda }} -->
                        
                    </v-col>
                    <v-col cols="12"><hr style="opacity:0.2"></v-col>

                    <v-col cols="12" class="pa-0" v-if="seleccionar_banco">

                    <v-col cols="12" class="pa-0" v-if="esperando_proceso">
                        <h style="color:#2D2D8D;font-size:18px">{{tab === 3 ? 'Elegí el monto que desea retirar' : 'Elegí una uno de los bancos para operar:'}}</h>
                    </v-col>
                        <v-window v-model="tab" class="my-4">
                            <v-window-item>
                                <v-row class="ma-0 pt-2">
                                    <v-col cols="12" md="4">
                                        <div :class="bancoSeleccionado === 'banco-familiar' ? 'seleccionado' : 'logobanco'"
                                            @click="bancoSeleccionado = 'banco-familiar'">
                                            <v-img src='../assets/images/bancos/banco-familiar.jpg' />
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div :class="bancoSeleccionado === 'banco-atlas' ? 'seleccionado' : 'logobanco'"
                                            @click="bancoSeleccionado = 'banco-atlas'">
                                            <v-img src='../assets/images/bancos/banco-atlas.jpg' />
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div :class="bancoSeleccionado === 'banco-basa' ? 'seleccionado' : 'logobanco'"
                                            @click="bancoSeleccionado = 'banco-basa'">
                                            <v-img src='../assets/images/bancos/banco-basa.jpg' />
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div :class="bancoSeleccionado === 'banco-sudameris' ? 'seleccionado' : 'logobanco'"
                                            @click="bancoSeleccionado = 'banco-sudameris'">
                                            <v-img src='../assets/images/bancos/banco-sudameris.jpg' />
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div :class="bancoSeleccionado === 'banco-itau' ? 'seleccionado' : 'logobanco'"
                                            @click="bancoSeleccionado = 'banco-itau'">
                                            <v-img src='../assets/images/bancos/banco-itau.jpg' />
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div :class="bancoSeleccionado === 'banco-bnf' ? 'seleccionado' : 'logobanco'"
                                            @click="bancoSeleccionado = 'banco-bnf'">
                                            <v-img src='../assets/images/bancos/banco-bnf.jpg' />
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-window-item>

                            <v-window-item>
                                <v-row class="ma-0 pt-2">
                                    <v-col cols="12" md="4">
                                        <div class="d-flex align-center justify-center"
                                            :class="eleccion === 0 ? 'seleccionado' : 'logobanco'"
                                            @click="eleccion = 0">
                                            Pago Préstamo
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div class="d-flex align-center justify-center"
                                            :class="eleccion === 1 ? 'seleccionado' : 'logobanco'"
                                            @click="eleccion = 1">
                                            Depósito en Efectivo
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div class="d-flex align-center justify-center"
                                            :class="eleccion === 2 ? 'seleccionado' : 'logobanco'"
                                            @click="eleccion = 2">
                                            Extracciones en Efectivo
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div class="d-flex align-center justify-center flex-column"
                                            :class="eleccion === 3 ? 'seleccionado' : 'logobanco'"
                                            @click="eleccion = 3">
                                            Operación con Cheques
                                            <span style="font-size:12px;">(Propios - Otro Banco - Cobro Cheques)</span>
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div class="d-flex align-center justify-center"
                                            :class="eleccion === 4 ? 'seleccionado' : 'logobanco'"
                                            @click="eleccion = 4">
                                            Operación CDA
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div class="d-flex align-center justify-center"
                                            :class="eleccion === 5 ? 'seleccionado' : 'logobanco'"
                                            @click="eleccion = 5">
                                            Pago Tarjeta con Cédula
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-window-item>
                        </v-window>
                        <v-tabs hide-slider style="height:55px">

                            <v-col
                                :class="tab === 0 || exito_proceso ? 'd-flex justify-end align-center' : 'd-flex justify-space-between align-center'">
                                <v-tab style="text-transform:none;letter-spacing:0;color:#2D2D8D;font-size: 18px;"
                                    @click="volver_proceso()" v-if="tab != 0 && this.esperando_proceso">
                                    <v-icon>
                                        mdi-chevron-left
                                    </v-icon> Volver
                                </v-tab>

                                <v-tab :disabled="deshablitar_boton" class="btn-add-divisa" variant="outlined" @click="exito_proceso ? finalizar_proceso() : continuar()"
                                    v-if="tab < 9 || exito_proceso">{{ exito_proceso ? 'Finalizar' : 'Siguiente' }}</v-tab>

                            </v-col>

                        </v-tabs>

                    </v-col>
                    <v-col cols="12" class="pa-0">
                        <pago_prestamos v-if="ver_pago_prestamos" @volver="ver_pago_prestamos = false, seleccionar_banco = true" @finalizo_proceso="$emit('finalizo_proceso',0)"/>
                        <extraccion_efectivo v-if="ver_extraccion" @volver="ver_extraccion = false, seleccionar_banco = true" @finalizo_proceso="$emit('finalizo_proceso',0)"/>
                        <pago_tarjeta v-if="ver_pago_tarjeta" @volver="ver_pago_tarjeta = false, seleccionar_banco = true" @finalizo_proceso="$emit('finalizo_proceso',0)"/>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-card>
</template>


<script>
import pago_prestamos from './opciones/PagoPrestamos.vue'
import extraccion_efectivo from './opciones/ExtraccionEfectivo.vue'
import pago_tarjeta from './opciones/PagoTarjetaConCedula.vue'

export default {
    components:{
        pago_prestamos,
        extraccion_efectivo,
        pago_tarjeta
    },
    data: () => ({
        tab: null,
        
        seleccionar_banco: true,
        deshablitar_boton: true,
        bancoSeleccionado: null,
        opcionSeleccionada: [
                                'Pago Préstamo',
                                'Depósito en Efectivo',
                                'Extracciones en Efectivo',
                                'Opercaión con Cheques',
                                'Operación CDA',
                                'Pago Tarjeta con Cédula'
                            ],
        tipoSeleccionado: null,
    // ************   RADIO BUTON'S   ************
        moneda: null,
        tipo_cuenta: null,


        eleccion: null,
        eleccion_monto: null,
        cantidad: 0,
        no_cuenta: 7053459203,
        banco_elegido: 'BBVA',
        image_zoom: false,
        codigo_generado: false,
        esperando_proceso: true,
        exito_proceso: false,

        ver_pago_prestamos: false,
        ver_extraccion: false,
        ver_pago_tarjeta: false,

        no_boleta: null,
    }),
    computed: {
        banco_seleccionado() {
            return `../assets/images/bancos/${this.bancoSeleccionado}.jpg`
        },
        opcion_seleccionada(){
            return this.opcionSeleccionada[this.eleccion]
        },
    },
    watch: {
        bancoSeleccionado(){
            if(this.bancoSeleccionado != null){
                this.deshablitar_boton = false
            }
        },
        eleccion(){
            if(this.eleccion != null){
                this.deshablitar_boton = false
            }
        }

    }, 
    methods: {
        continuar(){
            if(this.eleccion === null){this.deshablitar_boton = true}
            if(this.tab === 0){
                if(this.bancoSeleccionado === null){ this.mensaje_seleccionar_banco()}else{this.tab = this.tab+1}
            }

            else if(this.tab === 1){
                if( this.eleccion === null){ this.mensaje_seleccionar_opcion()}
                
            /*************   Cuando se elija "Pago Préstamo"   *************/
                 if(this.eleccion === 0){
                        this.ver_pago_prestamos = true
                        this.seleccionar_banco = false
                    }
            
            /*************   Cuando se elija "Depósito en Efectivo"   *************/
                    else if(this.eleccion === 1){
                        this.ver_extraccion = true
                        this.seleccionar_banco = false
                    }
                
            
            /*************   Cuando se elija "Extracción de Efectivo"   *************/
                else if(this.eleccion === 2){
                        this.ver_extraccion = true
                        this.seleccionar_banco = false
                    }
            
            /*************   Cuando se elija "Pago Tarjeta con Cédula"   *************/
                    else if(this.eleccion === 5){
                        this.ver_pago_tarjeta = true
                        this.seleccionar_banco = false
                    }
                
            }
        


            
            else if(this.tab === 2){
                if( this.tipoSeleccionado === null){ this.mensaje_seleccionar_tipo()}else{
                    if(this.tipoSeleccionado === 1){this.tab = 3}
                    if(this.tipoSeleccionado === 2){this.tab = this.tab+2}
                }
            }
            else if(this.tab === 3){ this.tab = 4} else if(this.tab === 4){ this.tab = 6}
            

            
        },
        volver_proceso(){
            if(this.tab === 1){
                this.tab = this.tab - 1
            }
            else if (this.ver_extraccion){this.ver_extraccion}
        },
        mensaje_seleccionar_banco(){
            alert('Debes seleccionar un banco')
        },
        mensaje_seleccionar_opcion(){
            alert('Debes seleccionar una opción')
        },
        mensaje_seleccionar_tipo(){
            alert('Debes seleccionar un tipo')
        },
        generar_qr(){
            this.codigo_generado = true
        },
        proceso_espera(){
            this.tab = 4
            this.esperando_proceso = false
        },
        proceso_exitoso(){
            this.tab = 5
            this.exito_proceso = true
        },
        finalizar_proceso(){
            this.$emit('finalizo_proceso', 0)
        },
    },
}
</script>

<style>
.cantidad .v-field__input,.cantidad .v-text-field__prefix{
    color:#2D2D8D !important;
    font-size:40px;
    font-weight:600;
}
</style>