<template>

    <v-row class="ma-0 d-flex align-center">
        <v-col class="d-flex align-center" cols="12" md="5">
            <v-img src='../assets/images/perfil.png' class="perfil mr-4" />
            <div class='info'>
            <h2>Bienvenido, Alfonso Rodriguez</h2>
            <span>Sucursal:</span> 203 La Esquina<br />
                <span>Turno:</span> Tarde
            </div>
        </v-col>

        <v-col cols="12" md="7" class="pa-0">
            <v-card >
            <v-row class="ma-0" dense>
                <v-col cols="12" class="px-8 py-0 header-tabla d-flex justify-space-between align-center">
                  <v-col cols="12" md="6" class="d-flex align-center justify-start divisas_select">
                    <h class="mr-4">Saldos</h>
                    <v-select variant="solo" v-model="seleccionar_tipo_billete" :items="tipo_billete" dense/>
                  </v-col>
                <h>{{ timeString  }}</h>
                
                </v-col>
                <v-col class="py-0">
                <v-row class="listado-tabla" dense>
                    <v-col cols="12" md="2" class="pa-0 my-3 d-flex align-center justify-center flex-column"
                    style="border-right:1px solid #2D2D8D; height:100% !important;">
                    <h>Saldo Ap:</h>
                    <span>{{ saldo_apertura }}</span>
                    </v-col>
                    <v-col cols="12" md="2" class="pa-0 my-3 d-flex align-center justify-center flex-column"
                    style="border-right:1px solid #2D2D8D; height:100% !important;">
                    <h>Cantidad Trx:</h>
                    <span>{{ transacciones }}</span>
                    </v-col>
                    <v-col cols="12" md="2" class="pa-0 my-3 d-flex align-center justify-center flex-column"
                    style="border-right:1px solid #2D2D8D; height:100% !important;">
                    <h>Cheques:</h>
                    <span>{{ cheques }}</span>
                    </v-col>
                    <v-col cols="12" md="2" class="pa-0 my-3 d-flex align-center justify-center flex-column"
                    style="border-right:1px solid #2D2D8D; height:100% !important;">
                    <h>Efectivo:</h>
                    <span>{{ efectivo }}</span>
                    </v-col>
                    <v-col cols="12" md="2" class="pa-0 my-3 d-flex align-center justify-center flex-column"
                    style="border-right:1px solid #2D2D8D; height:100% !important;">
                    <h>Cambios:</h>
                    <span>-</span>
                    </v-col>
                    <v-col cols="12" md="2" class="pa-0 my-3 d-flex align-center justify-center flex-column"
                    style="height:100% !important;">
                    <h>Tipo Cambio:</h>
                    <span>-</span>
                    </v-col>
                </v-row>
                </v-col>
            </v-row>
            </v-card>
        </v-col>
    </v-row>
    
</template>


<script>
import currency from 'currency.js'
import {state} from '../funciones_globales'

export default {
  data: () => ({
    fecha_actual: new Date(),    
    seleccionar_tipo_billete: 'Guaraníes',
    tipo_billete: ['Guaraníes', 'Dólares'],
  }),
  props:{
    valor_guaranies: {
      type: Number,
      required: true
    },
    valor_dolares: {
      type: Number,
      required: true
    },
  },
  computed: {
    saldo_apertura(){
      return currency( this.seleccionar_tipo_billete === 'Guaraníes' ? this.valor_guaranies : this.valor_dolares, {separator: '.', decimal: ',', precision: 0 , symbol: this.seleccionar_tipo_billete === 'Guaraníes' ? '₲' : '$'}).format()
    },
    transacciones(){
      return state.transacciones_realizadas
    },
    cheques(){
      return 0 + state.cheques_agregados
    },
    efectivo(){
      return currency( this.seleccionar_tipo_billete === 'Guaraníes' ?  this.valor_guaranies + state.efectivo_agregado_guaranies : this.valor_dolares + state.efectivo_agregado_dolares, {separator: '.', decimal: ',', precision: 0 , symbol: this.seleccionar_tipo_billete === 'Guaraníes' ? '₲' : '$'}).format()
    },
    timeString() {
      const dia = this.fecha_actual.getDate().toString().padStart(2, '0');
      const mes = (this.fecha_actual.getMonth() + 1).toString().padStart(2, '0');
      const anio = this.fecha_actual.getFullYear();
      const hora = this.fecha_actual.getHours().toString().padStart(2, '0');
      const minutos = this.fecha_actual.getMinutes().toString().padStart(2, '0');
      const segundos = this.fecha_actual.getSeconds().toString().padStart(2, '0');
      return `${dia}/${mes}/${anio} ${hora}:${minutos}:${segundos}`;
    }
  },
  mounted() {
    // Actualiza el reloj cada segundo
    setInterval(() => {
      this.fecha_actual = new Date();
    }, 1000);
  }

}
</script>


<style>
.divisas_select .v-field__input, .divisas_select .v-field.v-field{
    background:#f1f1f1;
    border-radius:5px;
    border:rgba(0,0,0,0) 0px !important;
    min-height: 20px !important;
    padding: 0px !important;
    top: 10px;
    padding-left: 10px !important;
    align-items: center !important;
    justify-items: flex-start;
    display: flex !important;
  }

  
  .divisas_select .v-field__prepend-inner, .divisas_select .v-field__append-inner, .divisas_select .v-field__clearable, .divisas_select .v-text-field__prefix, .divisas_select .v-field__input {
    align-items: flex-start !important;
    display: flex !important;
    padding: 2px 0 !important;
  }
  </style>