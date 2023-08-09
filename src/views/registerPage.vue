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
            <h2 class="indigo--text">Register Page</h2>
        </div>
        <v-form @submit.prevent="registerHandler" ref="form">
            <v-card-text>
            <v-text-field
                v-model="registerData.username"
                :rules="usernameRules"
                type="text"
                label="Username"
                placeholder="Username"
                prepend-inner-icon="mdi-account"
                required
            />
            <v-text-field
                v-model="registerData.password"
                :rules="passwordRules"
                :type="passwordShow ? 'text' : 'password'"
                label="Password"
                placeholder="Password"
                prepend-inner-icon="mdi-key"
                :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="passwordShow = !passwordShow"
                required
            />
            <v-text-field
                v-model="registerData.email"
                :rules="emailRules"
                type="email"
                label="Email"
                placeholder="Email"
                prepend-inner-icon="mdi-email"
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
              <span>Register</span>
              </v-btn>
            </v-card-actions>
            <v-btn
              class="register-link"
              text
              @click="$router.push('/login')" 
            >
              Login
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
name: 'RegisterPage',
data: () => ({
    loading: false,
    snackbar: false,
    passwordShow: false,
    registerData: {
    username: '',
    password: '',
    email: '',
    },
    usernameRules: [v => !!v || 'Username is required'],
    passwordRules: [
    v => !!v || 'Password is required',
    v => (v && v.length >= 6) || 'Password must be 6 characters or more!',
    ],
    emailRules: [
    v => !!v || 'Email is required',
    v => /.+@.+/.test(v) || 'Valid email is required',
    ],
}),
methods: {
    async registerHandler() {
    if (this.$refs.form.validate()) {
        this.loading = true;
        try {
        const response = await axios.post('http://127.0.0.1:8000/user/', this.registerData);
        
        if (response.status === 201) {
            console.log('Registration successful');
            this.$router.push('/login');
        } else {
            console.log('Registration failed');
        }
        } catch (error) {
        console.error('An error occurred:', error.message);
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

.register-link {
color: inherit;
text-decoration: underline;
cursor: pointer;
box-shadow: none; 
}
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
.custom-card {
  background-color: rgba(255, 255, 255, 0.9); 
  border-radius: 10px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  padding: 24px;
}

/* Button styling */
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
