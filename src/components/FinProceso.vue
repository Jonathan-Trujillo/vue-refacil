<template>
    <v-row class="ma-0 pt-2">

        <v-col cols="5" class=" d-flex align-center justify-center">
            <v-img style="max-width: 87% !important;" src="../assets/images/check2.svg" @click="proceso_exitoso()" />
        </v-col>

        <v-col cols="7" class="pa-5 d-flex align-center justify-center">
            <v-row>
                <v-col cols="12">
                    <span style="color:#2D2D8D; font-size:22px">El pago por <strong>{{ monto_final_ingresado }}</strong>
                        del préstamo No. <strong>{{ numero_cuenta }}</strong> ha sido realizado exitosamente en
                        el banco <strong>{{ banco_elegido }}</strong></span>
                </v-col>
                <v-col cols="12">
                    <p style="color:#2D2D8D">¿Comó queres el comprobante?</p>
                    <v-col class="px-0 d-flex justify-space-between" style="gap:10px">
                        <v-btn class="btn-outlined" variant="outlined"> <v-icon></v-icon> Impreso</v-btn>
                        <v-btn class="btn-outlined" variant="outlined"> <v-icon></v-icon> Correo
                            electrónico</v-btn>

                    </v-col>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
import currency from 'currency.js'

export default{ 
    data: () => ({
        
    }),
    props:{
        numero_cuenta: null,
        banco_elegido: null,
        monto_ingresado: null,
        tipo_moneda: null
    },
    computed:{
        monto_final_ingresado(){ 
            return currency(this.monto_ingresado, {separator: '.', decimal: ',', precision: 0 , symbol: this.tipo_moneda === 'guaranies' ? '₲' : '$'}).format()
        },
    }
}
</script>