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
                    <v-col cols="12" class="pa-0">
                        <h style="color:#2D2D8D;font-size:18px">{{tab === 3 ? 'Elegí el monto que desea retirar' : 'Elegí una uno de los bancos para operar:'}}</h>
                    </v-col>

                    <v-col cols="12" class="pa-0">

                        <v-window v-model="tab" class="my-4">
                            <v-window-item>
                                <v-row class="ma-0 pt-2">
                                    <v-col cols="12" md="4">
                                        <div :class="bancoSeleccionado === 'banco-bbva' ? 'seleccionado' : 'logobanco'"
                                            @click="bancoSeleccionado = 'banco-bbva'">
                                            <v-img src='../assets/images/bancos/banco-bbva.jpg' />
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
                                        <div :class="bancoSeleccionado === 'banco-santander' ? 'seleccionado' : 'logobanco'"
                                            @click="bancoSeleccionado = 'banco-santander'">
                                            <v-img src='../assets/images/bancos/banco-santander.jpg' />
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div :class="bancoSeleccionado === 'banco-itau' ? 'seleccionado' : 'logobanco'"
                                            @click="bancoSeleccionado = 'banco-itau'">
                                            <v-img src='../assets/images/bancos/banco-itau.jpg' />
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div :class="bancoSeleccionado === 'banco-citybank' ? 'seleccionado' : 'logobanco'"
                                            @click="bancoSeleccionado = 'banco-citybank'">
                                            <v-img src='../assets/images/bancos/banco-citybank.jpg' />
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

                            <v-window-item>
                                <v-row class="ma-0 pt-2">
                                    <v-col cols="12" md="4">
                                        <div class="d-flex align-center justify-center"
                                            :class="tipoSeleccionado === 1 ? 'seleccionado' : 'logobanco'"
                                            @click="tipoSeleccionado = 1">
                                            Boleta de Extracción
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <div class="d-flex align-center justify-center"
                                            :class="tipoSeleccionado === 2 ? 'seleccionado' : 'logobanco'"
                                            @click="tipoSeleccionado = 2">
                                            QR
                                        </div>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-col class="d-flex align-center">
                                            <h style="color:#2D2D8D" class="pb-6">Moneda:</h>
                                            <v-radio-group v-model="moneda" inline dense>
                                                <v-radio label="Guaraníes" value="guaranies"></v-radio>
                                                <v-radio label="Dólares" value="dolares"></v-radio>
                                            </v-radio-group>
                                        </v-col>
                                    </v-col>
                                </v-row>
                            </v-window-item>

                            <v-window-item>
                                <v-row class="ma-0 pt-2">
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model.number="cantidad"  prefix="₲" type="number"  hint="Sólo podés ingresar múltiplos de 100"/>
                                        <v-col cols="12" class="px-0">
                                            <v-btn class="btn-add-divisa" variant="outlined" @click="generar_qr()">Generar QR</v-btn>
                                        </v-col>
                                    </v-col>
                                    <v-col cols="12" md="6" v-if="codigo_generado">
                                        <v-col cols="12" class="d-flex justify-end">
                                            <v-img style="max-width: 300px !important; height:auto" src="../assets/images/qr.svg"/>
                                       </v-col>
                                       <v-col cols="12" class="d-flex justify-end">
                                         <v-btn style="text-transform:none;letter-spacing:0;color:#2D2D8D;font-size: 18px;" variant="text" @click="image_zoom = true">Ampliar</v-btn>
                                        </v-col>
                                    </v-col>
                                </v-row>
                            </v-window-item>

                        </v-window>










                        <v-tabs style="height: auto !important" hide-slider>

                            <v-col
                                :class="tab === 0 ? 'pb-0 d-flex justify-end align-center' : 'pb-0 d-flex justify-space-between align-center'">
                                <v-tab style="text-transform:none;letter-spacing:0;color:#2D2D8D;font-size: 18px;"
                                    @click="tab = tab - 1" v-if="tab != 0">
                                    <v-icon>
                                        mdi-chevron-left
                                    </v-icon> Volver
                                </v-tab>

                                <v-tab class="btn-add-divisa" variant="outlined" @click="continuar()"
                                    v-if="tab < 3">Siguiente</v-tab>

                            </v-col>

                        </v-tabs>

                    </v-col>
                </v-row>
            </v-col>
            <v-dialog v-model="image_zoom" width="50%">
                <v-col class="d-flex justify-center">
                    <v-img style="max-width: 100% !important; height:auto" src="../assets/images/qr.svg"/>
           
                </v-col>
                </v-dialog>
        </v-row>
    </v-card>
</template>


<script>

export default {
    data: () => ({
        tab: null,

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
        moneda: null,
        eleccion: null,
        cantidad: 0,
        image_zoom: false,
        codigo_generado: false,
    }),
    computed: {
        banco_seleccionado() {
            return `../assets/images/bancos/${this.bancoSeleccionado}.jpg`
        },
        opcion_seleccionada(){
            return this.opcionSeleccionada[this.eleccion]
        }
    },
    methods: {
        continuar(){
            if(this.tab === 0){
                if(this.bancoSeleccionado === null){ this.mensaje_seleccionar_banco()}else{this.tab = this.tab+1}
            }else if(this.tab === 1){
                if( this.eleccion === null){ this.mensaje_seleccionar_opcion()}else{this.tab = this.tab+1}
            }else if(this.tab === 2){
                if( this.tipoSeleccionado === null){ this.mensaje_seleccionar_tipo()}else{this.tab = this.tab+1}
            }
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
    },
}
</script>

<style>
.v-field__input,.v-text-field__prefix{
    color:#2D2D8D !important;
    font-size:40px;
    font-weight:600;
}
</style>