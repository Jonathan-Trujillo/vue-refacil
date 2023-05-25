<template>
  <v-row class="ma-0 pt-5" dense>
      <v-col cols="12" class="pa-0">
          <v-card class="d-flex align-center">
              <v-row class="ma-0 pa-0" dense>
                  <v-col cols="12" md="8" class="pa-0">
                      <v-row class="ma-0 pa-4 px-5" dense>
                          <v-col cols="12" style="border-bottom: 1px solid rgba(0,0,0,0.2)">
                              <v-card-title class="px-0" style="color:#2D2D8D;font-size:22px;">Cierre de Caja</v-card-title>
                          </v-col>

                          <v-col cols="12" class="pa-0">
                              <v-col cols="12" class="px-0 py-8">
                                  <h style="color:#2D2D8D;font-size:18px">Carga las divisas que tienes en efectivo para
                                      continuar:</h>
                              </v-col>
                                  <v-tabs v-model="tab">
                                      <v-tab slider-color="#2D2D8D" class="btn-tabs" value="Guaraníes">Guaraníes</v-tab>
                                      <v-tab slider-color="#2D2D8D" class="btn-tabs" value="Dólares">Dólares</v-tab>
                                      <!-- <v-tab slider-color="#2D2D8D" class="btn-tabs" value="Euros">Euros</v-tab> -->
                                  </v-tabs>
                                  <v-window v-model="tab">
                                      <v-window-item value="Guaraníes">
                                          <v-card-text class="divisas px-0 pt-10">

                                              <v-row class="ma-0" v-for="(value, key_guaranies) in filas_guaranies" :key="key_guaranies">

                                                  <v-col cols="12" md="3" class="pa-0 d-flex align-center">
                                                      <h style="font-size:20px; color:#2D2D8D;" class="mr-4 pb-4">Tengo </h>
                                                      
                                              <money3 v-model="filas_guaranies[key_guaranies].guraranies_billetes"  v-bind="config" class="mt-n4 v-field__input v-field border-line"></money3>
                                                  </v-col>
                                                  <v-col cols="12" md="4" class="pa-0 d-flex align-center">
                                                      <h style="font-size:20px; color:#2D2D8D;" class="mx-4 pb-4">Billetes de </h>
                                                      <v-select variant="outlined" v-model="filas_guaranies[key_guaranies].guraranies_valor" :items="tipo_billete" item-title="text" item-value="value" dense class="mb-n1" />
                                                  </v-col>
                                                  <v-col cols="12" md="2" class="pa-0 d-flex align-center">
                                                      <h style="font-size:20px; color:#2D2D8D;" class="mx-4 pb-4">{{ divisa }}</h>
                                                  </v-col>
                                                  <v-col cols="12" md="3" class="pa-0 d-flex align-center justify-end">
                                                      <h style="font-size:20px; color:#2D2D8D;" class="pb-4">Total = {{ ver_datos_guaranies }} {{filas_guaranies[key_guaranies].guraranies_total}}
                                                      </h>
                                                  </v-col>

                                              </v-row>
                                              <v-col cols="12">
                                                  <v-btn class="btn-add-divisa"
                                                      variant="outlined" @click="agregar_guaranies_a_divisa()">
                                                      <v-icon>
                                                          mdi-plus-circle
                                                      </v-icon> Añadir al total
                                                  </v-btn>

                                                  <v-btn class="cursor-pointer" :disabled="filas_guaranies.length >= maximo_filas_guaranies"
                                                      variant="text" @click="agregar_divisa_guaranies()">
                                                      <v-icon>
                                                          mdi-plus-circle
                                                      </v-icon> Agregar otra fila
                                                  </v-btn>


                                                  <v-btn text class="ml-4 btn-delete-divisa" color="error"
                                                      v-if="filas_guaranies.length >= 2" @click="eliminar_fila_guaranies(index_guaranies)">
                                                      <v-icon>
                                                          mdi-close-circle
                                                      </v-icon>
                                                  </v-btn>



                                              </v-col>
                                          </v-card-text>
                                      </v-window-item>

                                      <v-window-item value="Dólares">
                                          <v-card-text class="divisas px-0 pt-10">

                                              <v-row class="ma-0" v-for="(value, key_dolares) in filas_dolares" :key="key_dolares">

                                                  <v-col cols="12" md="3" class="pa-0 d-flex align-center">
                                                      <h style="font-size:20px; color:#2D2D8D;" class="mr-4 pb-4">Tengo </h>
                                                      
                                              <money3 v-model="filas_dolares[key_dolares].dolares_billetes"  v-bind="config" class="mt-n4 v-field__input v-field border-line"></money3>
                                                  </v-col>
                                                  <v-col cols="12" md="4" class="pa-0 d-flex align-center">
                                                      <h style="font-size:20px; color:#2D2D8D;" class="mx-4 pb-4">Billetes de </h>
                                                      <v-select variant="outlined" v-model="filas_dolares[key_dolares].dolares_valor" :items="tipo_billete" item-title="text" item-value="value" dense class="mb-n1" />
                                                  </v-col>
                                                  <v-col cols="12" md="2" class="pa-0 d-flex align-center">
                                                      <h style="font-size:20px; color:#2D2D8D;" class="mx-4 pb-4">{{ divisa }}</h>
                                                  </v-col>
                                                  <v-col cols="12" md="3" class="pa-0 d-flex align-center justify-end">
                                                      <h style="font-size:20px; color:#2D2D8D;" class="pb-4">Total = {{ ver_datos_dolares }} {{filas_dolares[key_dolares].dolares_total}}
                                                      </h>
                                                  </v-col>

                                              </v-row>
                                              <v-col cols="12">
                                                  <v-btn class="btn-add-divisa"
                                                      variant="outlined" @click="agregar_dolares_a_divisa()">
                                                      <v-icon>
                                                          mdi-plus-circle
                                                      </v-icon> Añadir al total
                                                  </v-btn>

                                                  <v-btn class="cursor-pointer" :disabled="filas_dolares.length >= maximo_filas_dolares"
                                                      variant="text" @click="agregar_divisa_dolares()">
                                                      <v-icon>
                                                          mdi-plus-circle
                                                      </v-icon> Agregar otra fila
                                                  </v-btn>


                                                  <v-btn text class="ml-4 btn-delete-divisa" color="error"
                                                      v-if="filas_guaranies.length >= 2" @click="eliminar_fila_dolares(index_dolares)">
                                                      <v-icon>
                                                          mdi-close-circle
                                                      </v-icon>
                                                  </v-btn>



                                              </v-col>
                                          </v-card-text>
                                      </v-window-item>
                                  </v-window>

                          </v-col>
                      </v-row>
                  </v-col>

                  <v-row cols="12" md="4" class="ma-0 pa-4 justify-center" dense>
                      <v-card style="background:#E1F2FF !important;position:relative; padding-bottom: 150px !important" elevation="0" class="pa-6" width="100%">
                          <v-col cols="12" style="border-bottom: 1px solid rgba(0,0,0,0.2)">
                              <v-card-title class="px-0" style="color:#2D2D8D;font-size:22px;">Totales</v-card-title>
                          </v-col>
                          <v-col cols="12" style="border-bottom: 1px solid rgba(0,0,0,0.2)" class="d-flex flex-column">
                              <!-- <v-card-title class="px-0" style="color:#2D2D8D;font-size:22px;">{{ divisa }}</v-card-title> -->
                              
                              <v-card-title class="px-0" style="color:#2D2D8D;font-size:22px;">Guaraníes</v-card-title>

                              <h style="font-size:20px; color:#2D2D8D;" class="pb-4">Total Billetes = {{ total_billetes_guaranies }}</h>
                              <h style="font-size:20px; color:#2D2D8D;" class="pb-4">Total = {{ ver_datos_totales_guaranies != null ? ver_datos_totales_guaranies : valor_inicial_guaranies }}</h>
                              
                          </v-col>
                          <v-col cols="12" style="border-bottom: 1px solid rgba(0,0,0,0.2)" class="d-flex flex-column">
                              
                              <v-card-title class="px-0" style="color:#2D2D8D;font-size:22px;">Dólares</v-card-title>

                              <h style="font-size:20px; color:#2D2D8D;" class="pb-4">Total Billetes = {{ total_billetes_dolares }}</h>
                              <h style="font-size:20px; color:#2D2D8D;" class="pb-4">Total = {{ ver_datos_totales_dolares != null ? ver_datos_totales_dolares : valor_inicial_dolares }}</h>
                              
                          </v-col>
                          <v-col style="position: absolute; bottom:30px" class="d-flex justify-center">
                              <v-btn text class="btn-color" @click="abrir_caja()">Cerrar Caja</v-btn>
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
      total_billetes_guaranies: 0,
      total_billetes_dolares: 0,
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

      
      tipo_billete_guaranies: ['₲100.000', '₲50.000', '₲20.000', '₲10.000', '₲5.000', '₲2.000', '₲1.000', '₲500', '₲100', '₲50'],
      tipo_billete_dolares: ['$100','$50','$20','$10','$5'],

      fechaHoraFormateada: null,
      tab: null,
      divisa: null,

     
      filas_guaranies: [ { guraranies_billetes: null, guraranies_valor: null } ],
      filas_dolares: [ { dolares_billetes: null, dolares_valor: null } ],
      index_guaranies: 'Guaraníes',
      index_dolares: 'Dólares',
  }),
  created() {
      console.log(this.filas_guaranies.guraranies_total)
      this.ver_fecha();
      this.suma_total = currency(0, {separator: '.', decimal: ',' , symbol: this.tab === 'Guaraníes' ? '₲' : '$'}).format()
      this.$emit('efectivo', this.suma_total, this.tab)
      console.log(this.tab);
  },
  computed: {
      dato_total(){ 
          return currency(0, {separator: '.', decimal: ',' , symbol: this.tab === 'Guaraníes' ? '₲' : '$'}).format()
      },
      ver_datos_guaranies(){
          Object.keys(this.filas_guaranies).forEach((key_guaranies) => {
              
              let billetes_guaranies = this.filas_guaranies[key_guaranies].guraranies_billetes
              let efectivo_seleccionado_guaranies = this.filas_guaranies[key_guaranies].guraranies_valor
              
              console.log(this.filas_guaranies[key_guaranies].guraranies_total);
              return this.filas_guaranies[key_guaranies].guraranies_total =  currency( billetes_guaranies * efectivo_seleccionado_guaranies, {separator: '.', decimal: ',' , symbol:'₲'}).format()
          })
          
          return console.log('Estas Filas: ', this.filas_guaranies);
      },
      
      ver_datos_dolares(){
          Object.keys(this.filas_dolares).forEach((key_dolares) => {
              
              let billetes_dolares = this.filas_dolares[key_dolares].dolares_billetes
              let efectivo_seleccionado_dolares = this.filas_dolares[key_dolares].dolares_valor
              
              console.log(this.filas_dolares[key_dolares].dolares_total);
              return this.filas_dolares[key_dolares].dolares_total =  currency( billetes_dolares * efectivo_seleccionado_dolares, {separator: '.', decimal: ',' , symbol: '$'}).format()
          })
          
          return console.log('Estas Filas: ', this.filas_dolares);
      },
      valor_inicial_guaranies(){
          return currency(0, {separator: '.', decimal: ',' , symbol: '₲'}).format()
      },
      valor_inicial_dolares(){
          return currency(0, {separator: '.', decimal: ',' , symbol: '$'}).format()
      },
      tengo_billetes(){
          return currency(0, {separator: '.', decimal: ',' , symbol: this.tab === 'Guaraníes' ? '₲' : '$'}).format()
      },
      // seleccionar_billete(){
      //     return currency(this.filas_guaranies.guraranies_valor, {separator: '.', decimal: ',' , symbol: this.tab === 'Guaraníes' ? '₲' : '$'}).format()
          
      // },
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
      // seleccionar_billete(){
      //     return currency(this.seleccionar_billete, { symbol: '$' }).format()
      // }
  },
  watch: {
      tab() {
          // this.seleccionar_billete = null
          this.$emit('efectivo', this.suma_total, this.tab)
      },

  },
  methods: {
      agregar_guaranies_a_divisa() {
          let suma_guaranies = 0;
          let suma_efectivo_guaranies = 0;

          Object.keys(this.filas_guaranies).forEach((key_guaranies) => {
              let billetes_guaranies = parseInt(this.filas_guaranies[key_guaranies].guraranies_billetes);
              let efectivo_seleccionado_guaranies = parseInt(this.filas_guaranies[key_guaranies].guraranies_valor);
              this.filas_guaranies[key_guaranies].guraranies_total =  currency( billetes_guaranies * efectivo_seleccionado_guaranies, {separator: '.', decimal: ',' , symbol: '₲'}).format()

              suma_guaranies += billetes_guaranies;
              this.suma_total_efectivo_guaranies = billetes_guaranies * efectivo_seleccionado_guaranies;

              suma_efectivo_guaranies += this.suma_total_efectivo_guaranies;
          });

          this.ver_datos_totales_guaranies = currency( suma_efectivo_guaranies, {separator: '.', decimal: ',' , symbol: '₲'}).format()


          this.total_billetes_guaranies = suma_guaranies;

      },
      
      agregar_dolares_a_divisa() {
          let suma_dolares = 0;
          let suma_efectivo_dolares = 0;

          Object.keys(this.filas_dolares).forEach((key_dolares) => {
              let billetes_dolares = parseInt(this.filas_dolares[key_dolares].dolares_billetes);
              let efectivo_seleccionado_dolares = parseInt(this.filas_dolares[key_dolares].dolares_valor);
              this.filas_dolares[key_dolares].dolares_total =  currency( billetes_dolares * efectivo_seleccionado_dolares, {separator: '.', decimal: ',' , symbol: '$'}).format()

              suma_dolares += billetes_dolares;
              this.suma_total_efectivo_dolares = billetes_dolares * efectivo_seleccionado_dolares;

              suma_efectivo_dolares += this.suma_total_efectivo_dolares;
          });

          this.ver_datos_totales_dolares = currency( suma_efectivo_dolares, {separator: '.', decimal: ',' , symbol: '$'}).format()


          this.total_billetes_dolares = suma_dolares;

      },

      abrir_caja(){
          this.$emit('abrir_caja', 0)
          this.$emit('efectivo', this.ver_datos_totales_guaranies, this.ver_datos_totales_dolares, this.tab)
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
              this.filas_guaranies.push({ guraranies_billetes: '', guraranies_valor: '' });
          }
      },
      eliminar_fila_guaranies(index_guaranies) {
          this.filas_guaranies.splice(index_guaranies, 1);
      },
      agregar_divisa_dolares() {
          if (this.filas_dolares.length < this.maximo_filas_dolares) {
              this.filas_dolares.push({ dolares_billetes: '', dolares_valor: '' });
          }
      },
      eliminar_fila_dolares(index_dolares) {
          this.filas_dolares.splice(index_dolares, 1);
      },
  }

}
</script>
