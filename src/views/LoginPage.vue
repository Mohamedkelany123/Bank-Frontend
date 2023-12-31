<template>
  <v-app>
    <div class="background"></div>
    <v-main class="d-flex justify-center align-center">
      <v-col cols="12" md="8" lg="4" class="mx-auto">
        <v-card class="pa-4 custom-card">
          <div class="text-center">
            <v-avatar size="80" color="rgb(72, 102, 204)">
              <v-icon size="40" class="icon">mdi-account</v-icon>
            </v-avatar>
            <h2 class="indigo--text">Login Page</h2>
          </div>
          <v-form @submit.prevent="submitHandler" ref="form">
            <v-card-text>
              <v-text-field
                v-model="username"
                :rules="usernameRules"
                type="text"
                id="Username"
                label="Username"
                placeholder="Username"
                prepend-inner-icon="mdi-account"
                required
              />
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                :type="passwordShow ? 'text' : 'password'"
                label="Password"
                id="Password"
                placeholder="Password"
                prepend-inner-icon="mdi-key"
                :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="passwordShow = !passwordShow"
                required
              />
              <div v-if="loginError" class="error-message">{{ loginError }}</div>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                :loading="loading"
                type="submit"
                id="submit"
                color="white"
                variant="contained"
                block
                rounded
                class="submit-button"
              >
              <span>Login</span>
              </v-btn>
            </v-card-actions>
            <v-btn
              class="register-link"
              text
              @click="$router.push('/register')" 
            >
              Register
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginPage',
  data: () => ({
    loginError: null,
    loading: false,
    snackbar: false,
    passwordShow: false,
    username: '',
    usernameRules: [v => !!v || 'Username is required'],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 6) || 'Password must be 6 characters or more!',
    ],
  }),
  methods: {
    async submitHandler() {
      this.loginError = null;
      if (this.$refs.form.validate()) {
        this.loading = true;
        try {
          const response = await axios.post('http://127.0.0.1:8000/user/login/', {
            username: this.username,
            password: this.password,
          });
          
          if (response.status === 200) {
            // Successful login, set the token in Vuex store
            const token = response.data.token;
            this.$store.commit('setToken', token);

            // Route to the appropriate page based on the user's role
            if (this.username === 'bankPersonnel') {
              this.$router.push('/bankPersonnel');
            } else if (this.username === 'loanProvider') {
              this.$router.push('/loanProvider');
            } else {
              this.$router.push({
                name: 'loanCustomer', 
                params: { username: this.username }, 
              });
            }
          } else if (response.status === 401) {
            this.loginError = 'Invalid credentials'; 
          } else {
            // Handle other status codes if needed
            console.log('Login failed');
            this.loginFailedDialog = true;
          }
        } catch (error) {
          if (error.response && error.response.status === 401) {
            console.log('Invalid credentials');
            console.log('Error Response:', error.response.data);
            this.loginError = 'Invalid credentials';
          } else {
            console.error('An error occurred:', error.message);
          }
        } finally {
          this.loading = false;
          this.snackbar = true; 
        }
      }
    },
  },
};
</script>

<style scoped>

.background {
  background-image: url('~@/assets/Order-Banner.jpg');
  height: 45vh; 
  width: 100%;
  display: block;
  position: absolute;
  top: 0;
  background-size: cover;
  z-index: -1; 
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}


.custom-card {
  background-color: rgba(255, 255, 255, 0.9); 
  border-radius: 10px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  padding: 24px;
}


.submit-button {
  color: white;
  background-color: rgb(72, 102, 204);
}

.register-link {
  color: inherit; 
  text-decoration: underline; 
  cursor: pointer;
  box-shadow: none;
}


.icon {
  color: white;
}

@media (max-width: 600px) {
 
  .background {
    height: 35vh;
  }
}
</style>
