<template>
  <v-app>
    <div class="background"></div>
    <v-main class="d-flex justify-center align-center">
      <v-col cols="10" lg="4" class="mx-auto">
        <v-card class="pa-4">
          <div class="text-center">
            <v-avatar size="100" color="indigo lighten-4">
              <v-icon size="40" icon="mdi-account"></v-icon>
            </v-avatar>
            <h2 class="indigo--text">Login Page</h2>
          </div>
          <v-form @submit.prevent="submitHandler">
            <v-card-text>
              <v-text-field
                type="text"
                label="Username"
                placeholder="Username"
                prepend-inner-icon="mdi-account"
              />
              <v-text-field
                :type="passwordShow?'text' : 'password'"
                label="Password"
                placeholder="Password"
                prepend-inner-icon="mdi-key"
                :append-icon="passwordShow ? 'mdi-eye':'mdi-eye-off'"
                @click:append="passwordShow = !passwordShow"
              />
            </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn type="submit" :loading="loading" color="indigo lighten-4" variant="text"  block rounded="lg" size="x-large">
                    Login
                </v-btn>
              </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    loading: false,
    passwordShow:false,
    loginSuccess: false,
    
  }),
  methods:{
    submitHandler(){
      console.log(this.Username)
      this.loginSuccess = true;
    }
  }
}
</script>

<style>
  .background{
    background-image: url(./assets/Order-Banner.jpg) !important;
    height: 370px;
    width: 100%;
    display: block;
    position: absolute;
    top: 0;
    background-size: cover;
  }

</style>
