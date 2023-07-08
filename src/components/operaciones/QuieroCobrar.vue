<template>
    <v-row class="ma-0">
        <v-col>
            <v-col cols="12" class="py-0" v-if="tab_cobrar != 'proceso_exitoso' && tab_cobrar != 'finalizar_proceso'">
                <h style="color:#2D2D8D;font-size:18px">{{ tab_cobrar === 'opcion_qr' ? 'Elegí el monto que desear retirar:' : tab_cobrar === 'desde_cuenta' ? 'Ingresá la siguiente información' : 'Elegí la opción con la que deseas continuar:'}}</h>
            </v-col>

            <v-window v-model="tab_cobrar" class="divisas">
                
                <v-window-item value="desde_cuenta">
                    <v-form ref="form">
                        <v-row class="ma-0 pt-2">
                            <v-col cols="12" :md="eleccion === 5 ? 6 : ''" style="color:#2D2D8D">

                                    <!-- ************   DATOS GENERALES   ************** -->
                                <v-col cols="12" :md="eleccion != 5 ? 6 : ''" class="pa-0 d-flex align-center">
                                    <strong class="mr-4">Número de Documento: </strong>
                                    <v-text-field v-model="numero_documento" maxlength="20" variant="outlined"/>
                                </v-col>
                                    <!-- ***********   FIN DATOS GENERALES   *********** -->
                                
                    <!-- *********************************   COBRO DESDE MI CUENTA   ********************************* -->
                                <v-col cols="12" md="6" class="mt-6 pa-0 d-flex align-center" v-if="mostrar_numero_cuenta">
                                    <strong class="mr-4">Número de Cuenta: </strong>
                                    <!-- <v-select v-model="numero_cuenta" :items="numeros_cuenta_cliente" variant="outlined" clearable=""/> -->
                                <v-text-field v-model="numero_cuenta" maxlength="15" variant="outlined"/>
                                </v-col>
                                <div v-if="mostrar_validar_cliente">
                                    <v-col cols="12" md="6" class="mt-6 pa-0 d-flex align-center">
                                        <strong class="mr-4">Nombre de Cliente: </strong>
                                        <v-text-field readonly variant="outlined">{{ nombre_cliente }}</v-text-field>
                                    </v-col>
                                    <!-- **************   PREGUNTAS DE VALIDACION   *************** -->
                                    <v-col cols="12" md="6" class="mt-6 pa-0 d-flex align-center">
                                        <strong class="mr-4">{{ pregunta_01 }}: </strong>
                                        <v-text-field variant="outlined"/>
                                    </v-col>
                                    <v-col cols="12" md="6" class="mt-6 pa-0 d-flex align-center">
                                        <strong class="mr-4">{{ pregunta_02 }}: </strong>
                                        <v-text-field variant="outlined"/>
                                    </v-col>
                                    <v-col cols="12" md="6" class="mt-6 pa-0 d-flex align-center">
                                        <strong class="mr-4">{{ pregunta_03 }}: </strong>
                                        <v-text-field variant="outlined"/>
                                    </v-col>
                                    <!-- ***********   FIN DE PREGUNTAS DE VALIDACION   *********** -->
                                </div>
                    <!-- *********************************   FIN COBRO DESDE MI CUENTA   ********************************* -->

                                
                                    <!-- ***********   DATOS GENERALES   *********** -->
                                <v-col cols="12" class="mt-4 pa-0 d-flex align-center" v-if="mostrar_moneda">
                                    <strong style="color:#2D2D8D">Moneda:</strong>
                                    <v-radio-group v-model="tipo_moneda" inline dense>
                                        <v-radio label="Guaraníes" value="guaranies"></v-radio>
                                        <v-radio label="Dólares" value="dolares"></v-radio>
                                    </v-radio-group>
                                </v-col>

                                <v-col cols="12" class="mt-5 pa-0 d-flex align-center" v-if="mostrar_monto">
                                    <v-col cols="12" :md="eleccion != 5 ? 6 : ''" class="pa-0 d-flex align-center">
                                        <strong class="mr-4">Ingrese Monto: </strong>
                                        <money3 v-model="monto_ingresado" :prefix="tipo_moneda === 'guaranies' ? '₲' : '$'" maxlength="20" v-bind="config" class="v-field__input v-field border-line"/>
                                    </v-col>
                                </v-col>
                                    <!-- ***********   FIN DATOS GENERALES   *********** -->

                                    
                                <v-col cols="12" class="mt-16 px-0" v-if="eleccion === 5">
                                    <v-btn class="btn-add-divisa" variant="outlined" @click="generar_qr()">Generar QR</v-btn>
                                </v-col>
                            </v-col>
                            
                            <v-col cols="12" md="6" v-if="eleccion === 5 && codigo_generado" class="py-0">
                                <v-col cols="12" class="pa-0 d-flex justify-end cursor-pointer">
                                    <v-img style="max-width: 300px !important; height:auto" src="../../assets/images/qr.svg"
                                        @click="proceso_espera()" />
                                </v-col>
                                <v-col cols="12" class="px-0 pb-0 pt-6 d-flex justify-end">
                                    <v-btn style="text-transform:none;letter-spacing:0;color:#2D2D8D;font-size: 18px;"
                                        variant="text" @click="image_zoom = true">Ampliar</v-btn>
                                </v-col>
                            </v-col>
                        </v-row>
                    </v-form>
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
                                
                                <v-col cols="12" class="mt-5 pa-0 d-flex align-center" v-if="mostrar_monto">
                                    <v-col cols="12" :md="eleccion != 5 ? 6 : ''" class="pa-0 d-flex align-center">
                                        <strong class="mr-4">Monto Ingresado: </strong>
                                        <money3 v-model="monto_ingresado" :prefix="tipo_moneda === 'guaranies' ? '₲' : '$'" maxlength="20" v-bind="config" class="v-field__input v-field border-line"/>
                                    </v-col>
                                </v-col>

                                <v-col cols="12" class="mt-5 pa-0 d-flex align-center" v-if="mostrar_monto">
                                    <v-col cols="12" :md="eleccion != 5 ? 6 : ''" class="pa-0 d-flex align-center">
                                        <strong class="mr-4">Monto Validado: </strong>
                                        <money3 v-model="monto_validado" :prefix="tipo_moneda === 'guaranies' ? '₲' : '$'" maxlength="20" v-bind="config" class="v-field__input v-field border-line"/>
                                    </v-col>
                                </v-col>

                            </v-col>
                        </v-row>
                </v-window-item>

                <v-window-item value="proceso_exitoso" style="min-height: 480px">
                    <v-row class="ma-0 pt-2">

                        <v-col class="pa-5 d-flex align-center justify-center cursor-pointer">
                            <v-img style="max-width: 55% !important;" src="../../assets/images/loading.png"
                                @click="proceso_exitoso()" />
                        </v-col>
                    </v-row>
                </v-window-item>


                <v-window-item value="finalizar_proceso">
                    <fin_proceso :numero_cuenta="numero_cuenta" :banco_elegido="banco_elegido.replace(' /','')" :monto_ingresado="monto_ingresado" :tipo_moneda="tipo_moneda"/>
                </v-window-item>
            </v-window>

            <v-tabs hide-slider style="height:55px" v-if="tab_cobrar != 'proceso_exitoso'">

                <v-col :class="tab_cobrar != 'finalizar_proceso' ? 'd-flex justify-space-between align-center' : 'd-flex justify-end align-center' ">
                    <v-tab style="text-transform:none;letter-spacing:0;color:#2D2D8D;font-size: 18px;"
                        @click="volver_proceso()" v-if="!exito_proceso">
                        <v-icon>
                            mdi-chevron-left
                        </v-icon> Volver
                    </v-tab>

                    <v-col class="d-flex justify-end">
                        <v-tab :disabled="deshabilitar_boton" class="mr-4 btn-outlined" variant="outlined" v-if="mostrar_rechazar"
                            @click="rechazar()">Rechazar</v-tab>
                        
                        <v-tab :disabled="deshabilitar_boton" class="btn-add-divisa" variant="outlined" v-if="ocultar_btn_en_qr"
                            @click="exito_proceso ? finalizar_proceso() : continuar()">{{ exito_proceso ? 'Finalizar' : eleccion === 7 && tab_cobrar === 'validar_monto' ? 'Aprobar' : 'Siguiente' }}</v-tab>
                        </v-col>
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
import fin_proceso from '../FinProceso.vue'
import { Money3Component } from 'v-money3'
import { state } from '../../funciones_globales'

export default {
    components:{
        fin_proceso,
        money3: Money3Component
    },
    data: () => ({

        eleccion_monto: null,
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

        numero_documento: null,
        nombre_cliente: null,
        numero_cuenta: null,
        numeros_cuenta_cliente: [
            '1234567890',
            '0987654321'
        ],
        tipo_moneda: 'guaranies',
        monto_ingresado: null,
        monto_validado: null,
        validar_cliente: false,

        codigo_generado: false,
        image_zoom: false,

        validar_formulario: [
                      v => !!v || ""
                    ],
        tab_cobrar: null,

        bancoSeleccionado: null,
        // deshabilitar_boton: false,
        opcionSeleccionada: [
            'Pago Préstamo',
            'Depósito en Efectivo',
            'Extracciones en Efectivo',
            'Opercaión con Cheques',
            'Operación CDA',
            'Pago Tarjeta con Cédula'
        ],
        // tipoSeleccionado: null,
        // ************   RADIO BUTON'S   ************

    }),
    props:{
        eleccion: null,
        banco_elegido: null
    },
    computed: {
        deshabilitar_boton() {
            return this.eleccion === 5 ? false : this.eleccion === 6 ? false : this.eleccion === 7 ? false : this.numero_cuenta != null && this.monto_ingresado != 0 ? false:true
        },
        ocultar_btn_en_qr(){
            return this.tab_cobrar === 'desde_cuenta' && this.eleccion === 5 ?  false : true
        },
        mostrar_numero_cuenta(){
            return this.eleccion === 4 && !this.validar_cliente ? true : false
        },
        mostrar_moneda(){
            return this.validar_cliente || this.eleccion === 7 || this.eleccion === 6  ? false:true
        },
        mostrar_monto(){
            return (this.eleccion === 4 && this.validar_cliente) || (this.eleccion === 6 && !this.validar_cliente) ? false:true
        },
        mostrar_validar_cliente(){
            return (this.eleccion === 4 || this.eleccion === 6) && this.validar_cliente ? true:false
        },
        mostrar_rechazar(){
            return this.eleccion === 7 && this.tab_cobrar === 'validar_monto' ?  true : false
        },

        banco_seleccionado() {
            return `../assets/images/bancos/${this.bancoSeleccionado}.jpg`
        },
        opcion_seleccionada() {
            return this.opcionSeleccionada[this.eleccion]
        }
    },
    // watch: {
    //     tipoSeleccionado(){
    //         if(this.tipoSeleccionado != null)
    //         this.deshabilitar_boton = false
    //     },
    // },
    methods: {
        continuar() {
            // if(this.eleccion_monto === null){this.deshabilitar_boton = true}
           
            if ((this.eleccion === 4 || this.eleccion === 6) && this.tab_cobrar === 'desde_cuenta' && this.validar_cliente === false) {
                this.mostar_datos_de_cliente()
            }
            else if (this.tab_cobrar === 'desde_cuenta' && this.validar_cliente === true) {
                this.tab_cobrar = 'proceso_exitoso'
                this.validar_cliente = true
            }
            else if (this.eleccion === 7 && this.tab_cobrar === 'desde_cuenta') {
                this.tab_cobrar = 'proceso_cheque'
            }
            else if (this.eleccion === 7 && this.tab_cobrar === 'proceso_cheque') {
                this.tab_cobrar = 'validar_monto'
            }
            else if (this.eleccion === 7 && this.tab_cobrar === 'validar_monto') {
                this.tab_cobrar = 'proceso_exitoso'
            }
        },
        volver_proceso() {
            if (this.tab_cobrar === 'desde_cuenta' && this.validar_cliente === false) {
                this.$emit('volver', 0)
            }else{
                this.validar_cliente = false
            }

            if (this.tab_cobrar === 'proceso_cheque') {
                this.tab_cobrar = 'desde_cuenta'
            }
            else if (this.tab_cobrar === 'validar_monto') {
                this.tab_cobrar = 'proceso_cheque'
            }
        },
        mostrar_preguntas_validacion(){
            this.pregunta_01 = 'Se muestra aqui la pregunta 01'
            this.pregunta_02 = 'Se muestra aqui la pregunta 02'
            this.pregunta_03 = 'Se muestra aqui la pregunta 03'
        },
        rechazar(){
            alert('Monto Rechazado')
        },
        mostar_datos_de_cliente(){
        // AGREGAR AQUI LA FUNCION QUE TRAE LOS DATOS DEL CLIENTE -- Eliminar el Ejemplo
            if(this.numero_documento === '1234'){
                this.nombre_cliente = 'Alfonso Rodriguez'
                this.mostrar_preguntas_validacion()
            }

            this.validar_cliente = true
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
            this.tab_cobrar = 'proceso_exitoso'
            this.esperando_proceso = false
        },
        proceso_exitoso() {
            this.tab_cobrar = 'finalizar_proceso'
            this.exito_proceso = true
            this.$emit('mostrar_comprobante', 0)

            if(this.tipo_moneda === 'guaranies'){
                state.efectivo_agregado_guaranies = state.efectivo_agregado_guaranies - parseInt(this.monto_ingresado)
            }else{
                state.efectivo_agregado_dolares = state.efectivo_agregado_dolares - parseInt(this.monto_ingresado)
            }
            state.transacciones_realizadas = parseInt(state.transacciones_realizadas) + 1
            
            if(this.eleccion === 7){
                
            state.cheques_agregados = parseInt(state.cheques_agregados) + 1
            }
        },
        finalizar_proceso() {
            this.$emit('finalizo_proceso', 0)
            state.mostrar_seccion_inicial = true
            state.mostrar_seccion_principal = false
        },
    },
}
</script>
