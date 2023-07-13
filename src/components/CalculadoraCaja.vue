<template>
    <v-row class="ma-0 pt-5" dense style="position:relative">
        <div style="position:absolute;top:10px;z-index:3;right:-7px;background:#fff;border-radius:30px;padding:7px;color:#2D2D8D;"
            class="d-flex align-center justify-center link-nav" @click="$emit('cerrar_calculadora', 0)">
        <v-icon>mdi-36px mdi-close-circle</v-icon> </div>
        <v-col cols="12" class="pa-0">
            <v-card class="d-flex align-center">
                <v-row class="ma-0 pa-0 align-center" dense>
                    <v-col cols="12" md="8" class="py-0">
                        <v-row class="px-4 py-0" dense>
                            <v-col cols="12" style="border-bottom: 1px solid rgba(0,0,0,0.2)">
                                <v-card-title class="px-4" style="color:#2D2D8D;font-size:22px;">Calculadora  | Recibí: {{ datos_recibi_guaranies }} {{ datos_recibi_dolares }} | Devolví:  {{ datos_devolvi_guaranies }} {{ datos_devolvi_dolares }}</v-card-title>
                            </v-col>

                            <v-col cols="12" class="pa-0">
                                <v-col cols="3" class="divisas">
                                    <v-select variant="outlined" v-model="opciones_calculadora" :items="itmes_opciones_calculadora" dense/>
                                </v-col>
                                <v-col cols="12" class="px-4 d-flex">
                                    <v-tabs v-model="tab">
                                        <v-tab slider-color="#2D2D8D" class="btn-tabs" value="Guaraníes">Guaraníes</v-tab>
                                        <v-tab slider-color="#2D2D8D" class="btn-tabs" value="Dólares">Dólares</v-tab>
                                        <!-- <v-tab slider-color="#2D2D8D" class="btn-tabs" value="Euros">Euros</v-tab> -->
                                    </v-tabs>
                                    <v-col class="pa-0 d-flex justify-end">
                                        <v-btn variant="text" active class="cursor-pointer" style="color:red !important" v-if="tab === 'Guaraníes' ? filas_guaranies.length >= 2 :  filas_dolares.length >= 2"
                                                @click="tab === 'Guaraníes' ? limpiar_divisas_guaranies() : limpiar_divisas_dolares()">Limpiar</v-btn>
                                    </v-col>
                                </v-col>
                                    <v-window v-model="tab">
                                        <v-window-item value="Guaraníes">
                                            <v-card-text class="divisas px-0 divisas-apertura_caja" style="position: relative;">
                                                <v-row class="contenedor_divisas pl-4 pr-8 py-1" dense>
                                                     <v-col cols="12" class="pt-2 d-flex" v-for="(value, key_guaranies) in filas_guaranies" :key="key_guaranies">

                                                        <v-col cols="12" md="3" class="pa-0 d-flex align-center">
                                                            <h style="font-size:20px; color:#2D2D8D;" class="mr-4">Tengo </h>
                                                            <money3 v-model="filas_guaranies[key_guaranies].guraranies_billetes"  v-bind="config" class="v-field__input v-field border-line"></money3>
                                                        </v-col>
                                                        <v-col cols="12" md="4" class="pa-0 d-flex align-center">
                                                            <h style="font-size:20px; color:#2D2D8D;" class="mx-4">Billetes de </h>
                                                            <v-select variant="outlined" v-model="filas_guaranies[key_guaranies].guraranies_valor" :items="tipo_billete" item-title="text" item-value="value" dense/>
                                                        </v-col>
                                                        <v-col cols="12" md="2" class="pa-0 d-flex align-center">
                                                            <h style="font-size:20px; color:#2D2D8D;" class="mx-4">{{ tab }}</h>
                                                        </v-col>
                                                        <v-col cols="12" md="3" class="px-0 d-flex align-center justify-end" style="position:relative">
                                                                <h style="font-size:20px; color:#2D2D8D;">Total = {{ ver_datos_guaranies }} {{filas_guaranies[key_guaranies].guraranies_total}}</h>
                                                            <v-badge v-if="filas_guaranies.length >= 2" :content="'X'" color="error" floating @click="eliminar_fila_guaranies( key_guaranies)"
                                                                overlap class="pb-8 cursor-pointer" style="position:absolute;right: 0px;"/>
                                                        </v-col>

                                                    </v-col>
                                                </v-row>
                                                <v-row class="pa-4 align-center" style="position:absolute;bottom:0; width: 100%;  box-shadow:  -5px -10px 10px rgba(50, 100, 200, 0.075);" dense>
                                                    <v-col cols="12" md="6">
                                                        <v-btn class="btn-add-divisa"
                                                            variant="outlined" @click="agregar_guaranies_a_divisa()">
                                                            <v-icon class="pr-2" style="padding-top: 2px;">
                                                                mdi-plus-circle
                                                            </v-icon> Añadir al total
                                                        </v-btn>
                                                    </v-col>
                                                    <v-col cols="12" md="6" class="pa-0 d-flex justify-end">
                                                        <v-btn class="btn-outlined" :disabled="filas_guaranies.length >= maximo_filas_guaranies"
                                                            variant="outlined" @click="agregar_divisa_guaranies()">
                                                            <v-icon class="pr-2" style="padding-top: 2px;">
                                                                mdi-plus-circle
                                                            </v-icon> Nueva fila
                                                        </v-btn>
                                                    </v-col>
                                                </v-row>
                                            </v-card-text>
                                        </v-window-item>

                                        <v-window-item value="Dólares">
                                            <v-card-text class="divisas px-0 divisas-apertura_caja">

                                                
                                                <v-row class="contenedor_divisas pl-4 pr-8 py-1" dense>
                                                     <v-col cols="12" class="pt-2 d-flex" v-for="(value, key_dolares) in filas_dolares" :key="key_dolares">

                                                        <v-col cols="12" md="3" class="pa-0 d-flex align-center">
                                                            <h style="font-size:20px; color:#2D2D8D;" class="mr-4">Tengo </h>
                                                            <money3 v-model="filas_dolares[key_dolares].dolares_billetes" v-bind="config" class="v-field__input v-field border-line"></money3>
                                                        </v-col>
                                                        <v-col cols="12" md="4" class="pa-0 d-flex align-center">
                                                            <h style="font-size:20px; color:#2D2D8D;" class="mx-4">Billetes de </h>
                                                            <v-select variant="outlined" v-model="filas_dolares[key_dolares].dolares_valor" :items="tipo_billete" item-title="text" item-value="value" dense class="mb-n1" />
                                                        </v-col>
                                                        <v-col cols="12" md="2" class="pa-0 d-flex align-center">
                                                            <h style="font-size:20px; color:#2D2D8D;" class="mx-4">{{ tab }}</h>
                                                        </v-col>
                                                        <v-col cols="12" md="3" class="px-0 d-flex align-center justify-end" style="position:relative">
                                                                <h style="font-size:20px; color:#2D2D8D;">Total = {{ ver_datos_dolares }} {{filas_dolares[key_dolares].dolares_total}}</h>
                                                            <v-badge v-if="filas_dolares.length >= 2" :content="'X'" color="error" floating @click="eliminar_fila_dolares( key_dolares)"
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
                                                        <v-btn class="btn-outlined" :disabled="filas_dolares.length >= maximo_filas_dolares"
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

                    <v-row cols="12" md="4" class="ma-0 pl-4 pa-8 justify-center" dense>
                        <v-card style="background:#E1F2FF !important;position:relative; padding-bottom: 100px !important" elevation="0" class="px-6 py-4" width="100%">
                            <v-col cols="12" class="py-0" style="border-bottom: 1px solid rgba(0,0,0,0.2)">
                                <v-card-title class="pa-0" style="color:#2D2D8D;font-size:22px;">Totales</v-card-title>
                            </v-col>
                            <v-col cols="12" style="border-bottom: 1px solid rgba(0,0,0,0.2)" class="d-flex flex-column">
                                <!-- <v-card-title class="px-0" style="color:#2D2D8D;font-size:22px;">{{ divisa }}</v-card-title> -->
                                
                                <v-card-title class="pa-0" style="color:#2D2D8D;font-size:22px;text-align: right;">Recibí</v-card-title>
                                
                                <v-card-title class="pa-0" style="color:#2D2D8D;font-size:18px;font-weight: 600;">Guaraníes</v-card-title>
                                <h style="font-size:20px; color:#2D2D8D;">Total Billetes = {{ recibi_total_billetes_guaranies }}</h>
                                <h style="font-size:20px; color:#2D2D8D;">Total = {{ recibi_ver_datos_totales_guaranies != null ? recibi_ver_datos_totales_guaranies : valor_inicial_guaranies }}</h>

                                <v-card-title class="pa-0 mt-1" style="color:#2D2D8D;font-size:18px;font-weight: 600">Dólares</v-card-title>
                                <h style="font-size:20px; color:#2D2D8D;">Total Billetes = {{ recibi_total_billetes_dolares }}</h>
                                <h style="font-size:20px; color:#2D2D8D;">Total = {{ recibi_ver_datos_totales_dolares != null ? recibi_ver_datos_totales_dolares : valor_inicial_dolares }}</h>
                                
                            </v-col>
                            <v-col cols="12" style="border-bottom: 1px solid rgba(0,0,0,0.2)" class="d-flex flex-column">
                                
                                <v-card-title class="pa-0" style="color:#2D2D8D;font-size:22px;text-align: right">Devolví</v-card-title>

                                <v-card-title class="pa-0" style="color:#2D2D8D;font-size:18px;font-weight: 600;">Guaraníes</v-card-title>
                                <h style="font-size:20px; color:#2D2D8D;">Total Billetes = {{ devolvi_total_billetes_guaranies }}</h>
                                <h style="font-size:20px; color:#2D2D8D;">Total = {{ devolvi_ver_datos_totales_guaranies != null ? devolvi_ver_datos_totales_guaranies : valor_inicial_guaranies }}</h>

                                <v-card-title class="pa-0 mt-1" style="color:#2D2D8D;font-size:18px;font-weight: 600">Dólares</v-card-title>
                                <h style="font-size:20px; color:#2D2D8D;">Total Billetes = {{ devolvi_total_billetes_dolares }}</h>
                                <h style="font-size:20px; color:#2D2D8D;">Total = {{ devolvi_ver_datos_totales_dolares != null ? devolvi_ver_datos_totales_dolares : valor_inicial_dolares }}</h>
                                
                            </v-col>
                            <v-col style="position: absolute; bottom:20px" class="pa-0 d-flex justify-center">
                                <v-btn elevation="0" text class="btn-color" @click="agregar_saldos()">Guardar</v-btn>
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
    
    data: () => ({

        recibi_total_billetes_guaranies: 0,
        recibi_total_billetes_dolares: 0,

        devolvi_total_billetes_guaranies: 0,
        devolvi_total_billetes_dolares: 0,

        devolvi_ver_datos_totales_guaranies: currency(0, { separator: '.', decimal: ',', precision: 0, symbol: '₲' }).format(),
        devolvi_ver_datos_totales_dolares: currency(0, { separator: '.', decimal: ',', precision: 0, symbol: '$' }).format(),
        recibi_ver_datos_totales_guaranies: currency(0, { separator: '.', decimal: ',', precision: 0, symbol: '₲' }).format(),
        recibi_ver_datos_totales_dolares: currency(0, { separator: '.', decimal: ',', precision: 0, symbol: '$' }).format(),

        total_suma_fectivo_guaranies: 0,
        total_suma_fectivo_dolares: 0,

        datos_recibi_guaranies: 0,
        datos_recibi_dolares: 0,
        datos_devolvi_guaranies: 0,
        datos_devolvi_dolares: 0,

        opciones_calculadora: 'Recibí',
        itmes_opciones_calculadora: ['Recibí', 'Devolví'],        

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
       
        tipo_billete_guaranies: ['₲100.000', '₲50.000', '₲20.000', '₲10.000', '₲5.000', '₲2.000', '₲1.000', '₲500', '₲100', '₲50'],
        tipo_billete_dolares: ['$100','$50','$20','$10','$5'],

        fechaHoraFormateada: null,
        tab: null,
       
        filas_guaranies: [ { guraranies_billetes: 0, guraranies_valor: 0 } ],
        filas_dolares: [ { dolares_billetes: 0, dolares_valor: 0 } ],
        index_dolares: 'Dólares',
    }),
    created() {
        this.ver_fecha();
    },
    watch:{
        opciones_calculadora(){
            
        this.filas_guaranies = [ { guraranies_billetes: 0, guraranies_valor: 0 } ]
        this.filas_dolares = [ { dolares_billetes: 0, dolares_valor: 0 } ]
        }
    },
    computed: {
        dato_total(){ 
            return currency(0, {separator: '.', decimal: ',', precision: 0 , symbol: this.tab === 'Guaraníes' ? '₲' : '$'}).format()
        },
        ver_datos_guaranies() {
            Object.keys(this.filas_guaranies).forEach((key_guaranies) => {
                let billetes_guaranies = this.filas_guaranies[key_guaranies].guraranies_billetes;
                let efectivo_seleccionado_guaranies = this.filas_guaranies[key_guaranies].guraranies_valor;

                this.filas_guaranies[key_guaranies].guraranies_total = currency(
                    billetes_guaranies * efectivo_seleccionado_guaranies,
                    { separator: ".", decimal: ",", precision: 0, symbol: "₲" }
                ).format();
            });

            return console.log("Estas Filas: ", this.filas_guaranies);
        },
        
        ver_datos_dolares(){
            Object.keys(this.filas_dolares).forEach((key_dolares) => {
                
                let billetes_dolares = this.filas_dolares[key_dolares].dolares_billetes
                let efectivo_seleccionado_dolares = this.filas_dolares[key_dolares].dolares_valor
                
                console.log(this.filas_dolares[key_dolares].dolares_total);
                return this.filas_dolares[key_dolares].dolares_total =  currency( billetes_dolares * efectivo_seleccionado_dolares, {separator: '.', decimal: ',', precision: 0 , symbol: '$'}).format()
            })
            
            return console.log('Estas Filas: ', this.filas_dolares);
        },
        valor_inicial_guaranies(){
            return currency(0, {separator: '.', decimal: ',', precision: 0 , symbol: '₲'}).format()
        },
        valor_inicial_dolares(){
            return currency(0, {separator: '.', decimal: ',', precision: 0 , symbol: '$'}).format()
        },
        tengo_billetes(){
            return currency(0, {separator: '.', decimal: ',', precision: 0 , symbol: this.tab === 'Guaraníes' ? '₲' : '$'}).format()
        },
        tipo_billete(){
            return this.tab === 'Guaraníes' ? this.tipo_billete_guaranies.map((billete) => {
                return {
                text: billete,
                value: parseInt(billete.replace('₲', '').replace('.', ''))
                };
            }) : this.tipo_billete_dolares.map((billete) => {
                return {
                text: billete,
                value: parseInt(billete.replace('$', '').replace('.', ''))
                };
            });
        },
        maximo_filas_guaranies(){
            return this.tipo_billete_guaranies.length
        },
        maximo_filas_dolares(){
            return this.tipo_billete_dolares.length
        }
    },
    methods: {
        agregar_guaranies_a_divisa() {
            let suma_guaranies = 0;
            let suma_efectivo_guaranies = 0;

            Object.keys(this.filas_guaranies).forEach((key_guaranies) => {
                let billetes_guaranies = parseInt(this.filas_guaranies[key_guaranies].guraranies_billetes);
                let efectivo_seleccionado_guaranies = parseInt(this.filas_guaranies[key_guaranies].guraranies_valor);
                this.filas_guaranies[key_guaranies].guraranies_total =  currency( billetes_guaranies * efectivo_seleccionado_guaranies, {separator: '.', decimal: ',', precision: 0 , symbol: '₲'}).format()

                suma_guaranies += billetes_guaranies;
                this.suma_total_efectivo_guaranies = billetes_guaranies * efectivo_seleccionado_guaranies;

                suma_efectivo_guaranies += this.suma_total_efectivo_guaranies;
            });


            if(this.opciones_calculadora === 'Recibí'){
                this.recibi_ver_datos_totales_guaranies =  currency(suma_efectivo_guaranies, { separator: '.', decimal: ',', precision: 0, symbol: '₲' }).format()
                this.suma_recibi_fectivo_guaranies =  suma_efectivo_guaranies
                this.recibi_total_billetes_guaranies = suma_guaranies;
            }else{
                this.devolvi_ver_datos_totales_guaranies =  currency(suma_efectivo_guaranies, { separator: '.', decimal: ',', precision: 0, symbol: '₲' }).format()
                this.suma_devolvi_fectivo_guaranies =  suma_efectivo_guaranies
                this.devolvi_total_billetes_guaranies = suma_guaranies;
            }
        },
        
        agregar_dolares_a_divisa() {
            let suma_dolares = 0;
            let suma_efectivo_dolares = 0;

            Object.keys(this.filas_dolares).forEach((key_dolares) => {
                let billetes_dolares = parseInt(this.filas_dolares[key_dolares].dolares_billetes);
                let efectivo_seleccionado_dolares = parseInt(this.filas_dolares[key_dolares].dolares_valor);
                this.filas_dolares[key_dolares].dolares_total =  currency( billetes_dolares * efectivo_seleccionado_dolares, {separator: '.', decimal: ',', precision: 0 , symbol: '$'}).format()

                suma_dolares += billetes_dolares;
                this.suma_total_efectivo_dolares = billetes_dolares * efectivo_seleccionado_dolares;

                suma_efectivo_dolares += this.suma_total_efectivo_dolares;
            });


            if(this.opciones_calculadora === 'Recibí'){
                this.recibi_ver_datos_totales_dolares =  currency(suma_efectivo_dolares, { separator: '.', decimal: ',', precision: 0, symbol: '$' }).format()
                this.suma_recibi_efectivo_dolares =  suma_efectivo_dolares
                this.recibi_total_billetes_dolares = suma_dolares;
            }
            else if(this.opciones_calculadora === 'Devolví'){
                this.devolvi_ver_datos_totales_dolares =  currency(suma_efectivo_dolares, { separator: '.', decimal: ',', precision: 0, symbol: '$' }).format()
                this.suma_devolvi_efectivo_dolares =  suma_efectivo_dolares
                this.devolvi_total_billetes_dolares = suma_dolares;
            }

        },

        agregar_saldos(){
            
            this.datos_recibi_guaranies = this.suma_recibi_fectivo_guaranies
            this.datos_recibi_dolares = this.suma_recibi_efectivo_dolares
            
            this.datos_devolvi_guaranies = this.suma_devolvi_fectivo_guaranies
            this.datos_devolvi_dolares = this.suma_devolvi_efectivo_dolares
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
        agregar_divisa_guaranies() {
            if (this.filas_guaranies.length < this.maximo_filas_guaranies) {
                this.filas_guaranies.push({ guraranies_billetes: 0, guraranies_valor: 0 });
            }
        },
        eliminar_fila_guaranies(key_guaranies) {
            this.filas_guaranies.splice(key_guaranies, 1);
        },
        limpiar_divisas_guaranies(){
            this.filas_guaranies = [ { guraranies_billetes: 0, guraranies_valor: 0 } ]
        },
        agregar_divisa_dolares() {
            if (this.filas_dolares.length < this.maximo_filas_dolares) {
                this.filas_dolares.push({ dolares_billetes: 0, dolares_valor: 0 });
            }
        },
        eliminar_fila_dolares(key_dolares) {
            this.filas_dolares.splice(key_dolares, 1);
        },
        limpiar_divisas_dolares(){
            this.filas_dolares = [ { dolares_billetes: 0, dolares_valor: 0 } ]
        },
    }

}
</script>
