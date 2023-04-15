<template>
    <v-card>
        <v-row>
            <v-col class="pa-16 d-flex align-center justify-center">
                <v-row>
                    <v-col cols="12" class="px-0 py-8">
                        <h style="color:#2D2D8D;font-size:18px">Elegí una uno de los bancos para operar:</h>
                    </v-col>
                    <v-col cols="12">
                        <!-- <v-row>
                            <v-col cols="12" md="4">
                                <v-card class="btn-seccion-principal pa-1" style="max-height: 100px">
                                    <v-v-img style="width:100%; min-height: 100% !important" src="../assets/images/bancos/bbva.png"/>
                                </v-card>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-card class="btn-seccion-principal pa-1">
                                    <v-v-img src="../assets/images/bancos/atlas.png"/>
                                </v-card>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-card class="btn-seccion-principal pa-1">
                                    <v-v-img src="../assets/images/bancos/basa.png"/>
                                </v-card>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-card class="btn-seccion-principal pa-1">
                                    <v-v-img src="../assets/images/bancos/santander.png"/>
                                </v-card>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-card class="btn-seccion-principal pa-1">
                                    <v-v-img src="../assets/images/bancos/itau.png"/>
                                </v-card>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-card class="btn-seccion-principal pa-1">
                                    <v-v-img src="../assets/images/bancos/citi.png"/>
                                </v-card>
                            </v-col>
                        </v-row> -->

                         <!--banco step1-->
                    <div class='container bancos' id='bancos'>

                        <v-row>
                            <v-col cols="12" md="4">
                                <div class='logobanco'>
                                    <v-img id='bbva' class='lazyload' src='../assets/images/bancos/bbva.png'/>
                                </div>
                            </v-col>
                            <v-col cols="12" md="4">
                                <div class='logobanco'>
                                    <v-img class='lazyload' src='../assets/images/bancos/atlas.png'/>
                                </div>
                            </v-col>
                            <v-col cols="12" md="4">
                                <div class='logobanco'>
                                    <v-img class='lazyload' src='../assets/images/bancos/basa.png'/>
                                </div>
                            </v-col>
                            <v-col cols="12" md="4">
                                <div class='logobanco'>
                                    <v-img src='../assets/images/bancos/santander.png' class='std lazyload'/>
                                </div>
                            </v-col>
                            <v-col cols="12" md="4">
                                <div class='logobanco'>
                                    <v-img class='lazyload' src='../assets/images/bancos/itau.png'/>
                                </div>
                            </v-col>
                            <v-col cols="12" md="4">
                                <div class='logobanco'>
                                    <v-img class='lazyload' src='../assets/images/bancos/citi.png'/>
                                </div>
                            </v-col>
                        </v-row>
						
						
						
                        <!-- <nav class='navbar navbar-expand-lg mt-8'>
                            <div class='container-fluid'>
                                <a class='volver' id='v1'><i class="fa-solid fa-chevron-left"></i> volver </a>
                                <div class='collapse navbar-collapse' id='navbarSupportedContent'>
                                    <ul class='navbar-nav ms-auto mb-2 mb-lg-0'>
                                        <li><a class='btn_s' id='btn_s1'>Siguiente</a></li>
                                    </ul>
                                </div>
                            </div>
                        </nav> -->
                    </div>

                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-card>
</template>