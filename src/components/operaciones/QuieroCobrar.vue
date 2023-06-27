<template>
    <v-row class="ma-0">
        <v-col>
            <v-col cols="12" class="py-0" v-if="tab_extraccion != 'proceso_exitoso' && tab_extraccion != 'finalizar_proceso'">
                <h style="color:#2D2D8D;font-size:18px">{{ tab_extraccion === 'opcion_qr' ? 'Elegí el monto que desear retirar:' : tab_extraccion === 'desde_cuenta' ? 'Ingresá la siguiente información' : 'Elegí la opción con la que deseas continuar:'}}</h>
            </v-col>

            <v-window v-model="tab_extraccion" class="divisas">
                
                <v-window-item value="desde_cuenta" v-if="eleccion === 4">
                    <v-form ref="form">
                        <v-row class="ma-0 pt-2">
                            <v-col cols="12" style="color:#2D2D8D">

                                <v-col cols="12" md="6" class="pa-0 d-flex align-center">
                                    <strong class="mr-4">Número de Cédula: </strong>
                                    <money3 v-model="numero_cedula" maxlength="20" :precision="0" :thousands="''" :rules="validar_formulario" class="v-field__input v-field border-line"/>
                                </v-col>

                                <v-col cols="12" md="6" class="mt-6 pa-0 d-flex align-center">
                                    <strong class="mr-4 pb-5">Nombre de Cliente: </strong>
                                    <v-text-field readonly variant="outlined">{{ nombre_cliente }}</v-text-field>
                                </v-col>

                                <v-col cols="12" md="6" class="mt-6 pa-0 d-flex align-center">
                                    <strong class="mr-4">Número de Cuenta: </strong>
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
                                
                                <v-col cols="12" class="mt-5 pa-0 d-flex align-center">
                                    <v-col cols="12" md="5" class="pa-0 d-flex align-center">
                                        <strong class="mr-4">Ingrese Monto: </strong>
                                        <money3 v-model="eleccion_monto" :prefix="tipo_moneda === 'guaranies' ? '₲' : '$'" maxlength="20" v-bind="config" class="v-field__input v-field border-line"/>
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


                <v-window-item value="otro_monto">
                    <v-row class="ma-0 pt-2">
                        <v-col cols="12" md="6" class="cantidad">
                            <v-text-field v-model.number="cantidad" prefix="₲"
                                hint="Sólo podés ingresar múltiplos de 100" />
                        </v-col>
                    </v-row>
                </v-window-item>

                <v-window-item value="opcion_qr">
                    <v-row class="ma-0 pt-2">
                        <v-col cols="12" md="6" class="cantidad">
                            <v-text-field v-model.number="cantidad" prefix="₲"
                                hint="Sólo podés ingresar múltiplos de 100" />
                            <v-col cols="12" class="px-0">
                                <v-btn class="btn-add-divisa" variant="outlined" @click="generar_qr()">Generar QR</v-btn>
                            </v-col>
                        </v-col>
                        <v-col cols="12" md="6" v-if="codigo_generado">
                            <v-col cols="12" class="d-flex justify-end">
                                <v-img style="max-width: 300px !important; height:auto" src="../../assets/images/qr.svg"
                                    @click="proceso_espera()" />
                            </v-col>
                            <v-col cols="12" class="d-flex justify-end">
                                <v-btn style="text-transform:none;letter-spacing:0;color:#2D2D8D;font-size: 18px;"
                                    variant="text" @click="image_zoom = true">Ampliar</v-btn>
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

            <v-tabs hide-slider style="height:55px" v-if="tab_extraccion != 'proceso_exitoso'">

                <v-col :class="tab_extraccion != 'finalizar_proceso' ? 'd-flex justify-space-between align-center' : 'd-flex justify-end align-center' ">
                    <v-tab style="text-transform:none;letter-spacing:0;color:#2D2D8D;font-size: 18px;"
                        @click="volver_proceso()" v-if="!exito_proceso">
                        <v-icon>
                            mdi-chevron-left
                        </v-icon> Volver
                    </v-tab>

                    <v-tab :disabled="deshabilitar_boton" class="btn-add-divisa" variant="outlined" v-if="tab_extraccion != 'opcion_qr'"
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
import fin_proceso from '../FinProceso.vue'
import { Money3Component } from 'v-money3'

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
        numero_cedula: null,
        nombre_cliente: null,

        validar_formulario: [
                      v => !!v || ""
                    ],
        tab_extraccion: null,

        bancoSeleccionado: null,
        deshabilitar_boton: false,
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
        moneda: null,
        tipo_moneda: 'guaranies',

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
    props:{
        eleccion: null
    },
    computed: {
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
           
            if (this.tab_extraccion === 'desde_cuenta') {
                // this.tab_extraccion = 'elegir_monto'
                this.mostar_datos_de_cliente()
            } else if (this.tab_extraccion === 'elegir_monto') {
                if(this.eleccion_monto === 5){
                this.tab_extraccion = 'otro_monto'
            }else{
                this.tab_extraccion = 'proceso_exitoso'

                }
            }
            else if (this.tab_extraccion === 'otro_monto'){
                this.tab_extraccion = 'proceso_exitoso'

            }
        },
        volver_proceso() {
            if (this.tab_extraccion === 'desde_cuenta') {
                this.$emit('volver', 0)
            }  else if (this.tab_extraccion === 'elegir_monto') {
                this.tab_extraccion = 'desde_cuenta'
            }

            else if (this.tab_extraccion === 'opcion_qr') {
                this.tab_extraccion = 0
            }
        },
        mostar_datos_de_cliente(){
        // AGREGAR AQUI LA FUNCION QUE TRAE LOS DATOS DEL CLIENTE -- Eliminar el Ejemplo
            if(this.numero_cedula === '1234'){
                this.nombre_cliente = 'Alfonso Rodriguez'
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
            this.tab_extraccion = 'proceso_exitoso'
            this.esperando_proceso = false
        },
        proceso_exitoso() {
            this.tab_extraccion = 'finalizar_proceso'
            this.exito_proceso = true
        },
        finalizar_proceso() {
            this.$emit('finalizo_proceso', 0)
        },
    },
}
</script>
