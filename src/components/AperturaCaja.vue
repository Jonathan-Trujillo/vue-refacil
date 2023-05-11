<template>
    <v-row class="ma-0 pt-5" dense>
        <v-col cols="12" class="pa-0">
            <v-card class="d-flex align-center">
                <v-row class="ma-0 pa-0" dense>
                    <v-col cols="12" md="8" class="pa-0">
                        <v-row class="ma-0 pa-4 px-5" dense>
                            <v-col cols="12" style="border-bottom: 1px solid rgba(0,0,0,0.2)">
                                <v-card-title class="px-0" style="color:#2D2D8D;font-size:22px;">Apertura de Caja</v-card-title>
                            </v-col>

                            <v-col cols="12" class="pa-0">
                                <v-col cols="12" class="px-0 py-8">
                                    <h style="color:#2D2D8D;font-size:18px">Carga las divisas que tienes en efectivo para
                                        continuar:</h>
                                </v-col>
                                    <v-tabs v-model="tab">
                                        <v-tab slider-color="#2D2D8D" class="btn-tabs" value="Guaraníes">Guaraníes</v-tab>
                                        <v-tab slider-color="#2D2D8D" class="btn-tabs" value="Dolares">Dolares</v-tab>
                                        <!-- <v-tab slider-color="#2D2D8D" class="btn-tabs" value="Euros">Euros</v-tab> -->
                                    </v-tabs>

                                    <v-card-text class="divisas px-0 pt-10">

                                        <v-row class="ma-0" v-for="(fila, index) in filas" :key="index">

                                            <v-col cols="12" md="3" v-model="fila.campo1" class="pa-0 d-flex align-center">
                                                <h style="font-size:20px; color:#2D2D8D;" class="mr-4 pb-4">Tengo </h>
                                                
                                        <money3 v-model="tengo_billetes" v-bind="config" class="mt-n6 v-field__input v-field"></money3>
                                            </v-col>
                                            <v-col cols="12" md="4" v-model="fila.campo2" class="pa-0 d-flex align-center">
                                                <h style="font-size:20px; color:#2D2D8D;" class="mx-4 pb-4">Billetes de </h>
                                                <v-select variant="outlined" v-model="seleccionar_billete" :items="tipo_billete" item-title="text" item-value="value" dense :prefix="tab === 'Guaraníes' ? '₲' : '$'"/>
                                            </v-col>
                                            <v-col cols="12" md="2" class="pa-0 d-flex align-center">
                                                <h style="font-size:20px; color:#2D2D8D;" class="mx-4 pb-4">{{ divisa }}</h>
                                            </v-col>
                                            <v-col cols="12" md="3" class="pa-0 d-flex align-center justify-end">
                                                <h style="font-size:20px; color:#2D2D8D;" class="pb-4">Total = {{ suma_total }}
                                                </h>
                                            </v-col>

                                        </v-row>
                                        <v-col cols="12">
                                            <v-btn class="btn-add-divisa" :disabled="filas.length >= maximoFilas"
                                                variant="outlined" @click="agregar_a_divisa()">
                                                <v-icon>
                                                    mdi-plus-circle
                                                </v-icon> Añadir al total
                                            </v-btn>

                                            <v-btn class="cursor-pointer" :disabled="filas.length >= maximoFilas"
                                                variant="text" @click="agregar_divisa()">
                                                <v-icon>
                                                    mdi-plus-circle
                                                </v-icon> Agregar otra fila
                                            </v-btn>


                                            <v-btn text class="ml-4 btn-delete-divisa" color="error"
                                                v-if="filas.length >= 2" @click="eliminarFila(index)">
                                                <v-icon>
                                                    mdi-close-circle
                                                </v-icon>
                                            </v-btn>



                                        </v-col>
                                    </v-card-text>
                            </v-col>
                        </v-row>
                    </v-col>

                    <v-row cols="12" md="4" class="ma-0 pa-4 justify-center" dense>
                        <v-card style="background:#E1F2FF !important;position:relative" elevation="0" class="pa-6" width="100%">
                            <v-col cols="12" style="border-bottom: 1px solid rgba(0,0,0,0.2)">
                                <v-card-title class="px-0" style="color:#2D2D8D;font-size:22px;">Totales</v-card-title>
                            </v-col>
                            <v-col cols="12" style="border-bottom: 1px solid rgba(0,0,0,0.2)" class="d-flex flex-column">
                                <v-card-title class="px-0" style="color:#2D2D8D;font-size:22px;">{{ divisa }}</v-card-title>
                                <h style="font-size:20px; color:#2D2D8D;" class="pb-4">Total Billetes = {{ total_billetes }}</h>
                                <h style="font-size:20px; color:#2D2D8D;" class="pb-4">Total = {{ suma_total_efectivo }}</h>
                            </v-col>
                            <v-col style="position: absolute; bottom:30px" class="d-flex justify-center">
                                <v-btn text class="btn-color" @click="$emit('abrir_caja', 0)">Abrir Caja</v-btn>
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

export default {
    components: { money3: Money3Component },
    
    currency: {
      update(el, binding) {
        el.value = currency(binding.value, { symbol: binding.arg }).format();
      },
      unbind(el) {
        el.value = '';
      }
    },
    data: () => ({
        
        tengo_billetes: null,
        seleccionar_billete: null,

        total_billetes: 0,
        suma_total_efectivo: 0,

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

        currency: 'USD',

        
        tipo_billete_guaranies: ['100.000', '50.000', '20.000', '10.000', '5.000', '2.000', '1.000', '500', '100', '50'],
        tipo_billete_dolares: ['500','200','100','50','20','10','5'],

        fechaHoraFormateada: null,
        tab: null,
        divisa: null,

        filas: [
            {
                campo1: null,
                campo2: null
            }
        ],
        maximoFilas: 5,
    }),
    created() {
        this.ver_fecha();
    },
    computed: {
        suma_total(){
            return currency(this.tengo_billetes * this.seleccionar_billete, { symbol: this.tab === 'Guaraníes' ? '₲' : '$'}).format()
        },
        tipo_billete(){
            return this.tab === 'Guaraníes' ? this.tipo_billete_guaranies.map((billete) => {
                return {
                text: billete,
                value: parseInt(billete.replace('.', ''))
                };
            }) : this.tipo_billete_dolares.map((billete) => {
                return {
                text: billete,
                value: parseInt(billete.replace('.', ''))
                };
            });
        }
        // seleccionar_billete(){
        //     return currency(this.seleccionar_billete, { symbol: '$' }).format()
        // }
    },
    watch: {
        tab() {
            this.seleccionar_billete = null
        },

    },
    methods: {
        agregar_a_divisa(){
            this.total_billetes = this.tengo_billetes
            this.suma_total_efectivo = this.suma_total
            this.$emit('efectivo', this.suma_total, this.tab)
        },
        ver_fecha() {
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
        agregar_divisa() {
            if (this.filas.length < this.maximoFilas) {
                this.filas.push({ campo1: null, campo2: null });
            }
        },
        eliminarFila(index) {
            this.filas.splice(index, 1);
        },
    }

}
</script>
