<template>
    <v-row class="ma-0">
        <v-col>
            <v-col cols="12" class="py-0" v-if="tab_pago_prestamos != 'finalizar_proceso'">
                <span style="color:#2D2D8D;font-size:18px">Ingresá la siguiente información:</span>
            </v-col>

            <v-window v-model="tab_pago_prestamos" class="divisas">

                <v-window-item>
                    <v-form ref="form">
                        <v-row class="ma-0 pt-2">
                            <v-col cols="12" md="8" style="color:#2D2D8D;">

                                <v-col cols="12" class="pa-0 d-flex align-center">
                                    <strong class="mr-4 pb-4">Número de documento: </strong>
                                    <v-text-field v-model="no_boleta" :rules="validar_formulario" variant="outlined" dense />
                                </v-col>

                                <v-col cols="12" class="pa-0 d-flex align-center">
                                    <strong class="mr-4 pb-4">Número de préstamo: </strong>
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
                    <v-row class="ma-0 pt-2" style="color:#2D2D8D;">
                        <v-col cols="12" md="6" class="pa-0 d-flex flex-column justify-center align-center" style="background: #E1F2FF;border-radius: 8px ;">
                                <p><span style="font-size: 36px">Cuota: <strong>04/10</strong></span></p>
                            
                                <p>
                                    <span class="mr-2">Monto de cuota: </span>
                                    <strong>350 USD/Mensual</strong>
                                </p>

                                <p>
                                    <span class="mr-2">Móneda: </span>
                                    <strong>Dólares (USD)</strong>
                                </p>
                            
                        </v-col>
                        <v-col cols="12" md="6">
                            
                        <v-col cols="12">
                            <v-col cols="12" class="pa-0 d-flex align-center">
                                <span class="mr-2">Nombre y Apellido: </span>
                                <strong>Alejandro Rodriguez Gomez</strong>
                            </v-col>
                            
                            <v-col cols="12" class="pa-0 d-flex align-center">
                                <span class="mr-2">Número de Documento: </span>
                                <strong>42.540.092</strong>
                            </v-col>
                    <v-col cols="12"><hr style="opacity:0.2"></v-col>
                            
                            <v-col cols="12" class="pa-0 d-flex align-center">
                                <span class="mr-2">Monto Total Préstamos: </span>
                                <strong>10.500 USD</strong>
                            </v-col>
                            
                            <v-col cols="12" class="pa-0 d-flex align-center">
                                <span class="mr-2">Saldo Deuda: </span>
                                <strong>7500 USD</strong>
                            </v-col>
                        </v-col>

                            <v-col cols="12" md="10" class="d-flex align-center">
                                <spam class="mr-4 pb-4">Pagar Cuota: </spam>
                                <v-text-field v-model="no_boleta" :rules="validar_formulario" variant="outlined" dense />
                            </v-col>
                        </v-col>
                    </v-row>
                </v-window-item>

                <v-window-item value="finalizar_proceso">
                    <fin_proceso/>
                </v-window-item>
            </v-window>

            <v-tabs hide-slider style="height:55px">

                <v-col :class="tab_pago_prestamos != 'finalizar_proceso' ? 'd-flex justify-space-between align-center' : 'd-flex justify-end align-center' ">
                    <v-tab style="text-transform:none;letter-spacing:0;color:#2D2D8D;font-size: 18px;"
                        @click="volver_proceso()" v-if="!exito_proceso">
                        <v-icon>
                            mdi-chevron-left
                        </v-icon> Volver
                    </v-tab>

                    <v-tab class="btn-add-divisa" variant="outlined" v-if="tab_pago_prestamos != 'opcion_qr'"
                        @click="exito_proceso ? finalizar_proceso() : continuar()">{{
                            exito_proceso ? 'Finalizar' : 'Siguiente' }}</v-tab>

                </v-col>

            </v-tabs>
        </v-col>
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
        tab_pago_prestamos: null,
        // ************   RADIO BUTON'S   ************
        moneda: null,
        tipo_cuenta: null,

        cantidad: 0,
        banco_elegido: 'BBVA',
        exito_proceso: false,
        no_cuenta: 7053459203,
        no_boleta: "",
        nombre_titular: "",
        documento_ide: "",
    }),
    methods: {
        continuar() {
            if (this.tab_pago_prestamos === 0) {
                this.tab_pago_prestamos = 1;
            }
            else if(this.tab_pago_prestamos === 1){
                this.tab_pago_prestamos = 'finalizar_proceso'
            this.exito_proceso = true;
            }
        },
        volver_proceso() {
            if (this.tab_pago_prestamos === 0) {
                this.$emit("volver", 0);
            }
            else if (this.tab_pago_prestamos === 1) {
                this.tab_pago_prestamos = 0;
            }
        },
        
        finalizar_proceso() {
            this.$emit("finalizo_proceso", 0);
        },
    },
}
</script>
