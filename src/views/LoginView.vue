<template>
  <v-app>
    <v-row>
      <v-col cols="12" md="6" class="login-box d-flex align-center" style="position:relative">
        <v-img src="../assets/images/login.png" style="right:-100px" />
        
        <h style="color:#fff;position:absolute;bottom:50px;right:35%">© Todos los derechos reservados</h>
      </v-col>
      <v-col cols="12" md="6" class="d-flex align-center justify-center">

        <v-col cols="12" md="7" class="text-center">
        <v-col cols="12" class="d-flex justify-center">
          <v-img src="../assets/images/logo.png" style="max-width: 70% !important" />
        </v-col>

          <v-col cols="12" v-if="login">

            <v-card-title class="text-center welcome">Bienvenido</v-card-title>
            <v-text-field variant="solo" label="Email">
              <template #prepend-inner>
                <v-icon class="custom-icon">mdi-email-outline</v-icon>
              </template>
            </v-text-field>

            <v-text-field variant="solo" label="Contraseña">
              <template #prepend-inner>
                <v-icon class="custom-icon">mdi-lock-open-outline</v-icon>
              </template>
            </v-text-field>

            <h class="cursor-pointer" @click="restablecer_contraseña()">¿Olvidaste tu contraseña?</h>
            <v-col>
              <v-btn class="recuperar" variant="outlined" @click="logear()">Iniciar Sesión</v-btn>
            </v-col>
          </v-col>


          <v-col cols="12" v-if="restablecer">
            <v-form v-model="valid" ref="form" lazy-validation>
              

            <v-card-title class="text-center welcome">Ingresa tu email</v-card-title>
            <v-text-field variant="solo" label="Email" :rules="validar_correo">
              <template #prepend-inner>
                <v-icon class="custom-icon">mdi-email-outline</v-icon>
              </template>
            </v-text-field>

            <v-col class="py-4" v-if="mostrar_mensaje">
              <v-icon color="green" class="mr-2">
                mdi-checkbox-marked-circle
              </v-icon>

            <h style="color:#2D2D8D;">Revisá tu correo electrónico para restaurar la contraseña</h>
            </v-col>

            <v-btn class="recuperar" variant="outlined" @click="btn_volver ?  volver_login() : recuperar_contraseña()">{{btn_volver ? 'Volver' : 'Recuperar Contraseña'}}</v-btn>
            <v-col>
              <h class="cursor-pointer" v-if="!btn_volver" @click="regresar_login()">Regresar a Login</h>
            </v-col>
            </v-form>
          </v-col>
        </v-col>

      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    login: true,
    restablecer: false,
    btn_volver: false,
    mostrar_mensaje: false,
    validar_correo: [
                      v => !!v || "",
                      v => /.+@.+\..+/.test(v) || ""
                    ],

  }),
  methods: {
    restablecer_contraseña() {
      this.login = false
      this.restablecer = true
    },
    logear(){
    this.$router.replace('/home');
    },
    async recuperar_contraseña() {
      let validado = await this.$refs.form.validate()
        console.log(validado)
      if(validado.valid){
        this.mostrar_mensaje = true
        this.btn_volver = true
      }
    },
    volver_login(){
      this.login = true
      this.restablecer = false
      this.$refs.form.resetValidation()
      this.mostrar_mensaje = false
      this.btn_volver = false

    },
    regresar_login() {
      this.login = true
      this.restablecer = false
    },
  }

}
</script>
