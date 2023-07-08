<template>
    <v-row class="ma-0 pt-5" dense>
        <v-col cols="12" class="pa-0">
            <v-card class="d-flex align-center">
                <v-row class="ma-0 pa-0" dense>
                    <v-col cols="12" md="8" class="pa-0">
                        <v-row class="pa-4 pr-0" dense>
                            <v-col cols="12" style="border-bottom: 1px solid rgba(0,0,0,0.2)">
                                <v-card-title class="px-4" style="color:#2D2D8D;font-size:22px;">Cierre de Caja {{ cierre_caja_efectivo_guaranies }} {{ cierre_caja_efectivo_dolares }}</v-card-title>
                            </v-col>

                            <v-col cols="12" class="pa-0">
                                <v-col cols="12" class="px-4">
                                    <h style="color:#2D2D8D;font-size:18px">Carga las divisas que tienes en efectivo para
                                        continuar:</h>
                                </v-col>
                                <v-col cols="12" class="px-4 d-flex">
                                        
                                    <v-tabs v-model="tab">
                                        <v-tab slider-color="#2D2D8D" class="btn-tabs" value="Guaraníes">Guaraníes</v-tab>
                                        <v-tab slider-color="#2D2D8D" class="btn-tabs" value="Dólares">Dólares</v-tab>
                                        <!-- <v-tab slider-color="#2D2D8D" class="btn-tabs" value="Euros">Euros</v-tab> -->
                                    </v-tabs>
                                    <v-col class="pa-0 d-flex justify-end">
                                        <v-btn variant="text" active class="cursor-pointer" style="color:red !important" v-if="tab === 'Guaraníes' ? cierre_caja_filas_guaranies.length >= 2 :  cierre_caja_filas_dolares.length >= 2"
                                                @click="tab === 'Guaraníes' ? limpiar_divisas_guaranies() : limpiar_divisas_dolares()">Limpiar</v-btn>
                                    </v-col>
                                </v-col>
                                <v-window v-model="tab">
                                    <v-window-item value="Guaraníes">
                                        <v-card-text class="divisas px-0 divisas-apertura_caja">                                         
                                            <v-row class="contenedor_divisas pl-4 pr-8 py-1" dense>
                                                     <v-col cols="12" class="pt-2 d-flex" v-for="(value, cierre_caja_key_guaranies) in cierre_caja_filas_guaranies" :key="cierre_caja_key_guaranies">

                                                        <v-col cols="12" md="3" class="pa-0 d-flex align-center">
                                                            <h style="font-size:20px; color:#2D2D8D;" class="mr-4">Tengo </h>
                                                            <money3 v-model="cierre_caja_filas_guaranies[cierre_caja_key_guaranies].cierre_caja_guraranies_billetes" v-bind="config" class="v-field__input v-field border-line"></money3>
                                                        </v-col>
                                                        <v-col cols="12" md="4" class="pa-0 d-flex align-center">
                                                            <h style="font-size:20px; color:#2D2D8D;" class="mx-4">Billetes de </h>
                                                            <v-select variant="outlined" v-model="cierre_caja_filas_guaranies[cierre_caja_key_guaranies].cierre_caja_guraranies_valor" :items="tipo_billete" item-title="text" item-value="value" dense class="mb-n1" />
                                                        </v-col>
                                                        <v-col cols="12" md="2" class="pa-0 d-flex align-center">
                                                            <h style="font-size:20px; color:#2D2D8D;" class="mx-4">{{ tab }}</h>
                                                        </v-col>
                                                        <v-col cols="12" md="3" class="px-0 d-flex align-center justify-end" style="position:relative">
                                                                <h style="font-size:20px; color:#2D2D8D;">Total = {{ ver_datos_guaranies }} {{ cierre_caja_filas_guaranies[cierre_caja_key_guaranies].cierre_caja_guraranies_total }}</h>
                                                            <v-badge v-if="cierre_caja_filas_guaranies.length >= 2" :content="'X'" color="error" floating @click="eliminar_fila_guaranies( cierre_caja_key_guaranies)"
                                                                overlap class="pb-8 cursor-pointer" style="position:absolute;right: 0px;"/>
                                                        </v-col>

                                                    </v-col>
                                                </v-row>
                                                <v-row class="pa-4 align-center" style="position:absolute;bottom:0; width: 100%; box-shadow:  -5px -10px 10px rgba(50, 100, 200, 0.075);" dense>
                                                    <v-col cols="12" md="6">
                                                        <v-btn class="btn-add-divisa"
                                                            variant="outlined" @click="agregar_guaranies_a_divisa()">
                                                            <v-icon class="pr-2" style="padding-top: 2px;">
                                                                mdi-plus-circle
                                                            </v-icon> Añadir al total
                                                        </v-btn>
                                                    </v-col>
                                                    <v-col cols="12" md="6" class="pa-0 d-flex justify-end">
                                                        <v-btn class="btn-outlined" :disabled="cierre_caja_filas_guaranies.length >= maximo_filas_guaranies"
                                                            variant="outlined" @click="agregar_divisa_guaranies()">
                                                            <v-icon class="pr-2" style="padding-top: 2px;">
                                                                mdi-plus-circle
                                                            </v-icon> Nueva fila
                                                        </v-btn>
                                                        <!-- <v-btn text class="ml-4 btn-delete-divisa" color="error"
                                                            v-if="filas_dolares.length >= 2" @click="eliminar_fila_guaranies(index_guaranies)">
                                                            <v-icon>
                                                                mdi-close-circle
                                                            </v-icon>
                                                        </v-btn> -->
                                                    </v-col>
                                                </v-row>
                                        </v-card-text>
                                    </v-window-item>

                                    <v-window-item value="Dólares">
                                        <v-card-text class="divisas px-0 divisas-apertura_caja"> 
                                            <v-row class="contenedor_divisas pl-4 pr-8 py-1" dense>
                                                     <v-col cols="12" class="pt-2 d-flex" v-for="(value, cierre_caja_key_dolares) in cierre_caja_filas_dolares" :key="cierre_caja_key_dolares">

                                                        <v-col cols="12" md="3" class="pa-0 d-flex align-center">
                                                            <h style="font-size:20px; color:#2D2D8D;" class="mr-4">Tengo </h>
                                                            <money3 v-model="cierre_caja_filas_dolares[cierre_caja_key_dolares].cierre_caja_dolares_billetes" v-bind="config" class="v-field__input v-field border-line"></money3>
                                                        </v-col>
                                                        <v-col cols="12" md="4" class="pa-0 d-flex align-center">
                                                            <h style="font-size:20px; color:#2D2D8D;" class="mx-4">Billetes de </h>
                                                            <v-select variant="outlined" v-model="cierre_caja_filas_dolares[cierre_caja_key_dolares].cierre_caja_dolares_valor" :items="tipo_billete" item-title="text" item-value="value" dense class="mb-n1" />
                                                        </v-col>
                                                        <v-col cols="12" md="2" class="pa-0 d-flex align-center">
                                                            <h style="font-size:20px; color:#2D2D8D;" class="mx-4">{{ tab }}</h>
                                                        </v-col>
                                                        <v-col cols="12" md="3" class="px-0 d-flex align-center justify-end" style="position:relative">
                                                                <h style="font-size:20px; color:#2D2D8D;">Total = {{ ver_datos_dolares }} {{ cierre_caja_filas_dolares[cierre_caja_key_dolares].cierre_caja_dolares_total }}</h>
                                                            <v-badge v-if="cierre_caja_filas_dolares.length >= 2" :content="'X'" color="error" floating @click="eliminar_fila_dolares( cierre_caja_key_dolares)"
                                                                overlap class="pb-8 cursor-pointer" style="position:absolute;right: 0px;"/>
                                                        </v-col>

                                                    </v-col>
                                                </v-row>
                                                <v-row class="pa-4 align-center" style="position:absolute;bottom:0; width: 100%;box-shadow:  -5px -10px 10px rgba(50, 100, 200, 0.075);" dense>
                                                    <v-col cols="12" md="6">
                                                        <v-btn class="btn-add-divisa"
                                                            variant="outlined" @click="agregar_dolares_a_divisa()">
                                                            <v-icon class="pr-2" style="padding-top: 2px;">
                                                                mdi-plus-circle
                                                            </v-icon> Añadir al total
                                                        </v-btn>
                                                    </v-col>
                                                    <v-col cols="12" md="6" class="pa-0 d-flex justify-end">
                                                        <v-btn class="btn-outlined" :disabled="cierre_caja_filas_dolares.length >= maximo_filas_dolares"
                                                            variant="outlined" @click="agregar_divisa_dolares()">
                                                            <v-icon class="pr-2" style="padding-top: 2px;">
                                                                mdi-plus-circle
                                                            </v-icon> Nueva fila
                                                        </v-btn>
                                                        <!-- <v-btn text class="ml-4 btn-delete-divisa" color="error"
                                                            v-if="filas_dolares.length >= 2" @click="eliminar_fila_guaranies(index_guaranies)">
                                                            <v-icon>
                                                                mdi-close-circle
                                                            </v-icon>
                                                        </v-btn> -->
                                                    </v-col>
                                                </v-row>
                                        </v-card-text>
                                    </v-window-item>
                                </v-window>

                            </v-col>
                        </v-row>
                    </v-col>

                    <v-row cols="12" md="4" class="ma-0 pa-4 justify-center" dense>
                        <v-card style="background:#E1F2FF !important;position:relative; padding-bottom: 150px !important"
                            elevation="0" class="pa-6" width="100%">
                            <v-col cols="12" style="border-bottom: 1px solid rgba(0,0,0,0.2)">
                                <v-card-title class="px-0" style="color:#2D2D8D;font-size:22px;">Totales</v-card-title>
                            </v-col>
                            <v-col cols="12" style="border-bottom: 1px solid rgba(0,0,0,0.2)" class="d-flex flex-column">
                                <!-- <v-card-title class="px-0" style="color:#2D2D8D;font-size:22px;">{{ cierre_caja_divisa }}</v-card-title> -->

                                <v-card-title class="px-0" style="color:#2D2D8D;font-size:22px;">Guaraníes</v-card-title>

                                <h style="font-size:20px; color:#2D2D8D;" class="pb-4">Total Billetes = {{
                                    cierre_caja_total_billetes_guaranies }}</h>
                                <h style="font-size:20px; color:#2D2D8D;" class="pb-4">Total = {{
                                    cierre_caja_ver_datos_totales_guaranies != null ?
                                    cierre_caja_ver_datos_totales_guaranies : valor_inicial_guaranies }}</h>

                            </v-col>
                            <v-col cols="12" style="border-bottom: 1px solid rgba(0,0,0,0.2)" class="d-flex flex-column">

                                <v-card-title class="px-0" style="color:#2D2D8D;font-size:22px;">Dólares</v-card-title>

                                <h style="font-size:20px; color:#2D2D8D;" class="pb-4">Total Billetes = {{
                                    cierre_caja_total_billetes_dolares }}</h>
                                <h style="font-size:20px; color:#2D2D8D;" class="pb-4">Total = {{
                                    cierre_caja_ver_datos_totales_dolares != null ? cierre_caja_ver_datos_totales_dolares :
                                    valor_inicial_dolares }}</h>

                            </v-col>
                            <v-col style="position: absolute; bottom:30px" class="d-flex justify-center">
                                <v-btn text class="btn-color" @click="cerrar_caja()">Cerrar Caja</v-btn>
                            </v-col>
                        </v-card>
                    </v-row>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>


<script>
import { Money3Component } from 'v-money3'
import currency from 'currency.js';
import { state } from '../funciones_globales'

export default {
    components: { money3: Money3Component },

    data: () => ({
        cierre_caja_total_billetes_guaranies: 0,
        cierre_caja_total_billetes_dolares: 0,
        cierre_caja_suma_total_efectivo: 0,

        cierre_caja_ver_datos_totales_guaranies: currency(0, { separator: '.', decimal: ',', precision: 0, symbol: '₲' }).format(),
        cierre_caja_ver_datos_totales_dolares: currency(0, { separator: '.', decimal: ',', precision: 0, symbol: '$' }).format(),

        total_suma_fectivo_guaranies: 0,
        total_suma_fectivo_dolares: 0,
        cierre_caja_efectivo_guaranies: 0,
        cierre_caja_efectivo_dolares: 0,


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

        cierre_caja_tipo_billete_guaranies: ['₲100.000', '₲50.000', '₲20.000', '₲10.000', '₲5.000', '₲2.000', '₲1.000', '₲500', '₲100', '₲50'],
        cierre_caja_tipo_billete_dolares: ['$100', '$50', '$20', '$10', '$5'],

        fechaHoraFormateada: null,
        tab: null,
        cierre_caja_divisa: null,


        cierre_caja_filas_guaranies: [{ cierre_caja_guraranies_billetes: 0, cierre_caja_guraranies_valor: 0 }],
        cierre_caja_filas_dolares: [{ cierre_caja_dolares_billetes: 0, cierre_caja_dolares_valor: 0 }],
        index_guaranies: 'Guaraníes',
        index_dolares: 'Dólares',
    }),
    created() {
        // console.log(this.cierre_caja_filas_guaranies.cierre_caja_guraranies_total)
        this.ver_fecha();
        // this.cierre_caja_suma_total = currency(0, { separator: '.', decimal: ',', precision: 0, symbol: this.tab === 'Guaraníes' ? '₲' : '$' }).format()
        // this.$emit('efectivo_cierre_caja', this.cierre_caja_suma_total, this.tab)
        // console.log(this.tab);
    },
    computed: {
        dato_total() {
            return currency(0, { separator: '.', decimal: ',', precision: 0, symbol: this.tab === 'Guaraníes' ? '₲' : '$' }).format()
        },
        ver_datos_guaranies() {
            Object.keys(this.cierre_caja_filas_guaranies).forEach((cierre_caja_key_guaranies) => {

                let cierre_caja_billetes_guaranies = this.cierre_caja_filas_guaranies[cierre_caja_key_guaranies].cierre_caja_guraranies_billetes
                let cierre_caja_efectivo_seleccionado_guaranies = this.cierre_caja_filas_guaranies[cierre_caja_key_guaranies].cierre_caja_guraranies_valor

                console.log(this.cierre_caja_filas_guaranies[cierre_caja_key_guaranies].cierre_caja_guraranies_total);
                return this.cierre_caja_filas_guaranies[cierre_caja_key_guaranies].cierre_caja_guraranies_total = currency(cierre_caja_billetes_guaranies * cierre_caja_efectivo_seleccionado_guaranies, { separator: '.', decimal: ',', precision: 0, symbol: '₲' }).format()
            })

            return console.log('Estas Filas: ', this.cierre_caja_filas_guaranies);
        },

        ver_datos_dolares() {
            Object.keys(this.cierre_caja_filas_dolares).forEach((cierre_caja_key_dolares) => {

                let cierre_caja_billetes_dolares = this.cierre_caja_filas_dolares[cierre_caja_key_dolares].cierre_caja_dolares_billetes
                let cierre_caja_efectivo_seleccionado_dolares = this.cierre_caja_filas_dolares[cierre_caja_key_dolares].cierre_caja_dolares_valor

                console.log(this.cierre_caja_filas_dolares[cierre_caja_key_dolares].cierre_caja_dolares_total);
                return this.cierre_caja_filas_dolares[cierre_caja_key_dolares].cierre_caja_dolares_total = currency(cierre_caja_billetes_dolares * cierre_caja_efectivo_seleccionado_dolares, { separator: '.', decimal: ',', precision: 0, symbol: '$' }).format()
            })

            return console.log('Estas Filas: ', this.cierre_caja_filas_dolares);
        },
        valor_inicial_guaranies() {
            return currency(0, { separator: '.', decimal: ',', precision: 0, symbol: '₲' }).format()
        },
        valor_inicial_dolares() {
            return currency(0, { separator: '.', decimal: ',', precision: 0, symbol: '$' }).format()
        },
        tengo_billetes() {
            return currency(0, { separator: '.', decimal: ',', precision: 0, symbol: this.tab === 'Guaraníes' ? '₲' : '$' }).format()
        },
        tipo_billete() {
            return this.tab === 'Guaraníes' ? this.cierre_caja_tipo_billete_guaranies.map((billete) => {
                return {
                    text: billete,
                    value: parseInt(billete.replace('₲', '').replace('.', ''))
                };
            }) : this.cierre_caja_tipo_billete_dolares.map((billete) => {
                return {
                    text: billete,
                    value: parseInt(billete.replace('$', '').replace('.', ''))
                };
            });
        },
        maximo_filas_guaranies() {
            return this.cierre_caja_tipo_billete_guaranies.length
        },
        maximo_filas_dolares() {
            return this.cierre_caja_tipo_billete_dolares.length
        }
    },
    methods: {

        agregar_guaranies_a_divisa() {
            let cierre_caja_suma_guaranies = 0;
            let cierre_caja_suma_efectivo_guaranies = 0;

            Object.keys(this.cierre_caja_filas_guaranies).forEach((cierre_caja_key_guaranies) => {
                let cierre_caja_billetes_guaranies = parseInt(this.cierre_caja_filas_guaranies[cierre_caja_key_guaranies].cierre_caja_guraranies_billetes);
                let cierre_caja_efectivo_seleccionado_guaranies = parseInt(this.cierre_caja_filas_guaranies[cierre_caja_key_guaranies].cierre_caja_guraranies_valor);
                this.cierre_caja_filas_guaranies[cierre_caja_key_guaranies].cierre_caja_guraranies_total = currency(cierre_caja_billetes_guaranies * cierre_caja_efectivo_seleccionado_guaranies, { separator: '.', decimal: ',', precision: 0, symbol: '₲' }).format()

                cierre_caja_suma_guaranies += cierre_caja_billetes_guaranies;
                this.cierre_caja_suma_total_efectivo_guaranies = cierre_caja_billetes_guaranies * cierre_caja_efectivo_seleccionado_guaranies;

                cierre_caja_suma_efectivo_guaranies += this.cierre_caja_suma_total_efectivo_guaranies;
            });

            this.cierre_caja_ver_datos_totales_guaranies = currency(cierre_caja_suma_efectivo_guaranies, { separator: '.', decimal: ',', precision: 0, symbol: '₲' }).format()
            this.total_suma_fectivo_guaranies = cierre_caja_suma_efectivo_guaranies


            this.cierre_caja_total_billetes_guaranies = cierre_caja_suma_guaranies;

        },

        agregar_dolares_a_divisa() {
            let cierre_caja_suma_dolares = 0;
            let cierre_caja_suma_efectivo_dolares = 0;

            Object.keys(this.cierre_caja_filas_dolares).forEach((cierre_caja_key_dolares) => {
                let cierre_caja_billetes_dolares = parseInt(this.cierre_caja_filas_dolares[cierre_caja_key_dolares].cierre_caja_dolares_billetes);
                let cierre_caja_efectivo_seleccionado_dolares = parseInt(this.cierre_caja_filas_dolares[cierre_caja_key_dolares].cierre_caja_dolares_valor);
                this.cierre_caja_filas_dolares[cierre_caja_key_dolares].cierre_caja_dolares_total = currency(cierre_caja_billetes_dolares * cierre_caja_efectivo_seleccionado_dolares, { separator: '.', decimal: ',', precision: 0, symbol: '$' }).format()

                cierre_caja_suma_dolares += cierre_caja_billetes_dolares;
                this.cierre_caja_suma_total_efectivo_dolares = cierre_caja_billetes_dolares * cierre_caja_efectivo_seleccionado_dolares;

                cierre_caja_suma_efectivo_dolares += this.cierre_caja_suma_total_efectivo_dolares;
            });

            this.cierre_caja_ver_datos_totales_dolares = currency(cierre_caja_suma_efectivo_dolares, { separator: '.', decimal: ',', precision: 0, symbol: '$' }).format()
            this.total_suma_fectivo_dolares = cierre_caja_suma_efectivo_dolares

            this.cierre_caja_total_billetes_dolares = cierre_caja_suma_dolares;

        },

        cerrar_caja() {
            // funcion para retornar a Login y dejar valores en 0 
            this.$router.replace('/')
            this.$emit('efectivo_cierre_caja', 0, 0)
            state.transacciones_realizadas = 0
            state.efectivo_agregado_guaranies = 0
            state.cheques_agregados = 0

            state.seleccionar_abrir_componente_caja = false
            state.seleccionar_cerrar_caja = true
            state.seleccionar_abrir_componente_caja = true
            
            // Entrega resultados del efectivo al cierre de caja
            this.cierre_caja_efectivo_guaranies = this.total_suma_fectivo_guaranies
            this.cierre_caja_efectivo_dolares = this.total_suma_fectivo_dolares
        },
        ver_fecha() {
            // Reloj
            const fecha_actual = new Date();
            const dia = fecha_actual.getDate().toString().padStart(2, '0');
            const mes = (fecha_actual.getMonth() + 1).toString().padStart(2, '0');
            const anio = fecha_actual.getFullYear();
            const hora = fecha_actual.getHours().toString().padStart(2, '0');
            const minutos = fecha_actual.getMinutes().toString().padStart(2, '0');
            const segundos = fecha_actual.getSeconds().toString().padStart(2, '0');
            this.fechaHoraFormateada = `${dia}/${mes}/${anio} ${hora}:${minutos}:${segundos}`;
            console.log(this.fechaHoraFormateada);

        },
        agregar_divisa_guaranies() {
            if (this.cierre_caja_filas_guaranies.length < this.maximo_filas_guaranies) {
                this.cierre_caja_filas_guaranies.push({ cierre_caja_guraranies_billetes: 0, cierre_caja_guraranies_valor: 0 });
            }
        },
        eliminar_fila_guaranies(cierre_caja_key_guaranies) {
            console.log(cierre_caja_key_guaranies)
            this.cierre_caja_filas_guaranies.splice(cierre_caja_key_guaranies, 1);
        },
        limpiar_divisas_guaranies(){
            this.cierre_caja_filas_guaranies = [ { cierre_caja_guraranies_billetes: 0, cierre_caja_guraranies_valor: 0 } ]
        },
        agregar_divisa_dolares() {
            if (this.cierre_caja_filas_dolares.length < this.maximo_filas_dolares) {
                this.cierre_caja_filas_dolares.push({ cierre_caja_dolares_billetes: 0, cierre_caja_dolares_valor: 0 });
            }
        },
        eliminar_fila_dolares(index_dolares) {
            this.cierre_caja_filas_dolares.splice(index_dolares, 1);
        },
        limpiar_divisas_dolares(){
            this.cierre_caja_filas_dolares = [ { cierre_caja_dolares_billetes: 0, cierre_caja_dolares_valor: 0 } ]
        },
    }

}
</script>
