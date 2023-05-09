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
                Saldos
                <h>{{ timeString  }}</h>
                </v-col>
                <v-col class="py-0">
                <v-row class="listado-tabla" dense>
                    <v-col cols="12" md="2" class="pa-0 my-3 d-flex align-center justify-center flex-column"
                    style="border-right:1px solid #2D2D8D; height:100% !important;">
                    <h>Saldo Ap:</h>
                    <span>$1,200</span>
                    </v-col>
                    <v-col cols="12" md="2" class="pa-0 my-3 d-flex align-center justify-center flex-column"
                    style="border-right:1px solid #2D2D8D; height:100% !important;">
                    <h>Cantidad Trx:</h>
                    <span>-</span>
                    </v-col>
                    <v-col cols="12" md="2" class="pa-0 my-3 d-flex align-center justify-center flex-column"
                    style="border-right:1px solid #2D2D8D; height:100% !important;">
                    <h>Cheques:</h>
                    <span>-</span>
                    </v-col>
                    <v-col cols="12" md="2" class="pa-0 my-3 d-flex align-center justify-center flex-column"
                    style="border-right:1px solid #2D2D8D; height:100% !important;">
                    <h>Efectivo:</h>
                    <span>{{ suma_total }}</span>
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

export default {
  data: () => ({
    fecha_actual: new Date(),
    tab: null,
    divisa: null,
    suma_total: 0,

    filas: [
              {
                campo1: null,
                campo2: null
              }
            ],
    maximoFilas: 5,
  }),
  created() {
  },
  watch:{
    tab(){
      this.divisa = this.tab
    }
  },
  computed: {
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
  methods: {
    agregar_divisa(){
      if (this.filas.length < this.maximoFilas) {
        this.filas.push({ campo1: null, campo2: null });
      }
    },
    eliminarFila(index) {
      this.filas.splice(index, 1);
    },
  },
  mounted() {
    // Actualiza el reloj cada segundo
    setInterval(() => {
      this.fecha_actual = new Date();
    }, 1000);
  }

}
</script>
