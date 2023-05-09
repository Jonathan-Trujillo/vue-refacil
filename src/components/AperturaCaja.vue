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
                                <v-card elevation="0">
                                    <v-tabs v-model="tab">
                                        <v-tab slider-color="#2D2D8D" class="btn-tabs" value="Guaraníes">Guaraníes</v-tab>
                                        <v-tab slider-color="#2D2D8D" class="btn-tabs" value="Dolares">Dolares</v-tab>
                                        <!-- <v-tab slider-color="#2D2D8D" class="btn-tabs" value="Euros">Euros</v-tab> -->
                                    </v-tabs>

                                    <v-card-text class="divisas px-0 pt-10">

                                        <v-row class="ma-0" v-for="(fila, index) in filas" :key="index">

                                            <v-col cols="12" md="3" v-model="fila.campo1" class="pa-0 d-flex align-center">
                                                <h style="font-size:20px; color:#2D2D8D;" class="mr-4 pb-4">Tengo </h>
                                                <v-text-field v-model="tengo_billetes" variant="outlined" dense/>
                                            </v-col>
                                            <v-col cols="12" md="4" v-model="fila.campo2" class="pa-0 d-flex align-center">
                                                <h style="font-size:20px; color:#2D2D8D;" class="mx-4 pb-4">Billetes de </h>
                                                <v-select variant="outlined" v-model="seleccionar_billete" :items="tipo_billete" dense />
                                            </v-col>
                                            <v-col cols="12" md="2" class="pa-0 d-flex align-center">
                                                <h style="font-size:20px; color:#2D2D8D;" class="mx-4 pb-4">{{ divisa }}</h>
                                            </v-col>
                                            <v-col cols="12" md="3" class="pa-0 d-flex align-center justify-end">
                                                <h style="font-size:20px; color:#2D2D8D;" class="pb-4">Total = {{ suma_total
                                                }}
                                                </h>
                                            </v-col>

                                        </v-row>
                                        <v-col cols="12">
                                            <v-btn class="btn-add-divisa" :disabled="filas.length >= maximoFilas"
                                                variant="outlined" @click="agregar_divisa()">
                                                <v-icon>
                                                    mdi-plus-circle
                                                </v-icon> Agregar Otro
                                            </v-btn>


                                            <v-btn text class="ml-4 btn-delete-divisa" color="error"
                                                v-if="filas.length >= 2" @click="eliminarFila(index)">
                                                <v-icon>
                                                    mdi-close-circle
                                                </v-icon>
                                            </v-btn>



                                        </v-col>
                                    </v-card-text>
                                </v-card>
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
                                <h style="font-size:20px; color:#2D2D8D;" class="pb-4">Total Billetes = {{ tengo_billetes }}</h>
                                <h style="font-size:20px; color:#2D2D8D;" class="pb-4">Total = {{ suma_total }}</h>
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

export default {
    data: () => ({
        
        amount: null,
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



        fechaHoraFormateada: null,
        tab: null,
        divisa: null,
        tipo_billete: [],
        seleccionar_billete: null,

        tengo_billetes: null,
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
            return this.tengo_billetes * this.seleccionar_billete
        }
    },
    watch: {
        tab() {
            this.divisa = this.tab
            if(this.tab === 'Guaraníes'){
               this.tipo_billete = [100000,50000,20000,10000,5000,2000,1000,500,100,50]
            }else if(this.tab === 'Dolares'){
               this.tipo_billete = [100,50,20,10,5,2,1]
            }
            // else if(this.tab === 'Euros'){
            //    this.tipo_billete = [500,200,100,50,20,10,5]
            // }
        },

    },
    methods: {
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
