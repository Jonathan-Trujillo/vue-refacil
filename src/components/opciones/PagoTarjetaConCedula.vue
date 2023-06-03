<template>
    <v-row>
        <v-col>
            <v-col cols="12" v-if="tab_pago_tarjeta != 'proceso_exitoso' && tab_pago_tarjeta != 'finalizar_proceso'">
                <h style="color:#2D2D8D;font-size:18px">Ingresá la siguiente información:</h>
            </v-col>

            <v-window v-model="tab_pago_tarjeta" class="divisas">

                <v-window-item>
                    <v-form ref="form">
                        <v-row class="ma-0 pt-2">
                            <v-col cols="12" md="8" style="color:#2D2D8D">

                                <v-col cols="12" class="pa-0 d-flex align-center">
                                    <strong class="mr-4 pb-4">Número de comprobante: </strong>
                                    <v-text-field v-model="no_boleta" :rules="validar_formulario" variant="outlined" dense />
                                </v-col>

                                <v-col cols="12" class="pa-0 d-flex align-center">
                                    <strong class="mr-4 pb-4">Número de cédula del titular de la tarjeta: </strong>
                                    <v-text-field v-model="no_cuenta" :rules="validar_formulario" variant="outlined" dense />
                                </v-col>

                                <v-col cols="12" class="pa-0 d-flex align-center">
                                    <strong style="color:#2D2D8D" class="pb-6">Moneda:</strong>
                                    <v-radio-group v-model="tipo_cuenta" inline dense>
                                        <v-radio label="Guaraníes" value="guaranies"></v-radio>
                                        <v-radio label="Dólares" value="dolares"></v-radio>
                                    </v-radio-group>
                                </v-col>

                            </v-col>
                        </v-row>
                    </v-form>
                </v-window-item>

                <v-window-item>
                    <v-row class="ma-0 pt-2 px-4" style="color:#2D2D8D;">
                        <v-col cols="12" md="6" class="py-0">
                            <v-col cols="12" class="pa-6" style="background: #E1F2FF;border-radius: 8px ;">
                            <v-col cols="12" class="pa-0 d-flex align-center">
                                <h class="mr-2">Nombre y Apellido: </h>
                                <strong>Alejandro Rodriguez Gomez</strong>
                            </v-col>
                            
                            <v-col cols="12" class="pa-0 d-flex align-center">
                                <h class="mr-2">Número de Documento: </h>
                                <strong>42.540.092</strong>
                            </v-col>
                            
                            <v-col cols="12" class="pa-0 d-flex align-center">
                                <h class="mr-2">Pago Minimo: </h>
                                <strong>₲ 1.000.000</strong>
                            </v-col>
                            
                            </v-col>
                            <v-col cols="12" class="mt-6 py-0 d-flex align-center">
                                <spam class="mr-4 pb-4">Monto a Pagar: </spam>
                                <v-text-field v-model="no_boleta" :rules="validar_formulario" variant="outlined" dense />
                            </v-col>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-col cols="12" class="pa-0 d-flex flex-column align-end">
                                <h>Número de Tarjeta</h>
                                <strong>20983710173632</strong>
                            </v-col>
                        </v-col>
                    </v-row>
                </v-window-item>


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

            <v-tabs hide-slider style="height:55px" v-if="tab_pago_tarjeta != 'proceso_exitoso'">

                <v-col :class="tab_pago_tarjeta != 'finalizar_proceso' ? 'd-flex justify-space-between align-center' : 'd-flex justify-end align-center' ">
                    <v-tab style="text-transform:none;letter-spacing:0;color:#2D2D8D;font-size: 18px;"
                        @click="volver_proceso()" v-if="!exito_proceso">
                        <v-icon>
                            mdi-chevron-left
                        </v-icon> Volver
                    </v-tab>

                    <v-tab class="btn-add-divisa" variant="outlined" v-if="tab_pago_tarjeta != 'opcion_qr'"
                        @click="exito_proceso ? finalizar_proceso() : continuar()">{{
                            exito_proceso ? 'Finalizar' : tab_pago_tarjeta === 1 ? 'Pagar Tarjeta' : 'Siguiente' }}</v-tab>

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
export default {
    components:{
        fin_proceso
    },
    data: () => ({
        validar_formulario: [
            v => !!v || ""
        ],
        tab_pago_tarjeta: null,
        bancoSeleccionado: null,
        opcionSeleccionada: [
            "Pago Préstamo",
            "Depósito en Efectivo",
            "Extracciones en Efectivo",
            "Opercaión con Cheques",
            "Operación CDA",
            "Pago Tarjeta con Cédula"
        ],
        tipoSeleccionado: null,
        // ************   RADIO BUTON'S   ************
        moneda: null,
        tipo_cuenta: null,
        eleccion: null,
        eleccion_monto: null,
        cantidad: 0,
        banco_elegido: "BBVA",
        image_zoom: false,
        codigo_generado: false,
        esperando_proceso: true,
        exito_proceso: false,
        no_cuenta: "",
        no_boleta: "",
        nombre_titular: "",
        documento_ide: "",
    }),
    computed: {
        banco_seleccionado() {
            return `../assets/images/bancos/${this.bancoSeleccionado}.jpg`;
        },
        opcion_seleccionada() {
            return this.opcionSeleccionada[this.eleccion];
        }
    },
    watch: {},
    methods: {
        continuar() {
            if (this.tab_pago_tarjeta === 0) {
                this.tab_pago_tarjeta = 1;
            }
            else if(this.tab_pago_tarjeta === 1){
                this.tab_pago_tarjeta = 'proceso_exitoso'
            }
        },
        volver_proceso() {
            if (this.tab_pago_tarjeta === 0) {
                this.$emit("volver", 0);
            }
            else if (this.tab_pago_tarjeta === 1) {
                this.tab_pago_tarjeta = 0;
            }
        },
        mensaje_seleccionar_banco() {
            alert("Debes seleccionar un banco");
        },
        mensaje_seleccionar_opcion() {
            alert("Debes seleccionar una opción");
        },
        mensaje_seleccionar_tipo() {
            alert("Debes seleccionar un tipo");
        },
        generar_qr() {
            this.codigo_generado = true;
        },
        proceso_espera() {
            this.tab_pago_tarjeta = "proceso_exitoso";
            this.esperando_proceso = false;
        },
        proceso_exitoso() {
            this.tab_pago_tarjeta = "finalizar_proceso";
            this.exito_proceso = true;
        },
        finalizar_proceso() {
            this.$emit("finalizo_proceso", 0);
        },
    },
}
</script>
