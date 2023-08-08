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
                placeholder="Password"
                prepend-inner-icon="mdi-key"
                :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="passwordShow = !passwordShow"
                required
              />
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                :loading="loading"
                type="submit"
                color="white"
                variant="contained"
                block
                rounded
                class="submit-button"
              >
                <span>Login</span>
              </v-btn>
            </v-card-actions>
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
      if (this.$refs.form.validate()) {
        this.loading = true;
        try {
          const response = await axios.post('http://127.0.0.1:8000/user/login/', {
            username: this.username,
            password: this.password,
          });
          
          if (response.status === 200) {
            // Successful login, route to another page
            if (this.username === 'bankPersonnel')
              this.$router.push('/bankPersonnel');
            if (this.username === 'loanCustomers')
              this.$router.push('/loanCustomers');
            if (this.username === 'loanProvider')
              this.$router.push('/loanProvider');
          } else {
            // Handle other status codes if needed
            console.log('Login failed');
            this.loginFailedDialog = true;
          }
        } catch (error) {
          if (error.response && error.response.status === 401) {
            console.log('Invalid credentials');
            this.loginFailedDialog = true;
            // Show a message to the user or redirect to an error page
          } else {
            console.error('An error occurred:', error.message);
          }
        } finally {
          this.loading = false;
          this.snackbar = true; // Show snackbar regardless of response
        }
      }
    },
  },
};
</script>

<style scoped>
/* Background image and size */
.background {
  background-image: url('~@/assets/Order-Banner.jpg');
  height: 45vh; /* Adjust as needed */
  width: 100%;
  display: block;
  position: absolute;
  top: 0;
  background-size: cover;
  z-index: -1; /* Place the background behind the content */
}

/* Card styling */
.custom-card {
  background-color: rgba(255, 255, 255, 0.9); /* Adjust the transparency as needed */
  border-radius: 10px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  padding: 24px;
}

/* Button styling */
.submit-button {
  color: white;
  background-color: rgb(72, 102, 204);
}

/* Icon styling */
.icon {
  color: white;
}

@media (max-width: 600px) {
  /* Adjust styling for smaller screens */
  .background {
    height: 35vh;
  }
}
</style>
