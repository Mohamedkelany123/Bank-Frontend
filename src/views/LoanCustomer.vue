<template>
    <v-app>
      <!-- App Bar -->
      <v-app-bar color="primary" dark class="custom-app-bar" :elevation="7">
        <v-toolbar-title class="app-bar-title">Loan Customer</v-toolbar-title>
        <v-spacer></v-spacer>
        <template v-slot:append>
          
          <v-btn rounded="0" size="x-large" class="app-bar" @click="viewLoanFunds">View Loan Funds</v-btn>
          <v-btn rounded="0" size="x-large" class="app-bar" @click="createLoan">Create Loan</v-btn>
          <v-btn rounded="0" size="x-large" class="app-bar" @click="viewLoans">View Loans</v-btn>
          <v-btn rounded="xl" size="x-large" class="logout-button" @click="logout">Logout</v-btn>
          
        </template>
      </v-app-bar>

      <div class="page-wrapper">

        <!-- VIEW LOAN FUNDS -->
      <v-container class="custom-container">
        <v-row  justify="center">
          <v-col v-for="fund in loanFunds" :key="fund.id" cols="12" sm="6" md="4" lg="3">
            <v-card class="my-4 custom-card" :style="{ backgroundColor: color }">
              <v-card-title class="custom-card-title">{{ fund.name }}</v-card-title>
              <v-card-actions class="delete-button">
              </v-card-actions>
              <v-divider class="mt-2"></v-divider>
              <v-card-text>
                <div class="info-item">
                  <div class="info-label-value">
                    <v-icon class="card-icon">mdi-key</v-icon>
                    <span class="info-label-bold"></span> {{ fund.id }}
                  </div>
                </div>
                <div class="info-item">
                  <div class="info-label-value">
                    <span class="info-label-bold">Available amount:</span> ${{ fund.amount }}
                  </div>
                </div>
                <div class="info-item">
                  <div class="info-label-value">
                    <span class="info-label-bold">Max Loan:</span> ${{ fund.max_loan_amount }}
                  </div>
                </div>
                <div class="info-item">
                  <div class="info-label-value">
                    <span class="info-label-bold">Min Loan:</span> ${{ fund.min_loan_amount }}
                  </div>
                </div>
                <div class="info-item">
                  <div class="info-label-value">
                    <span class="info-label-bold">Interest Rate:</span> {{ fund.interest_rate }}%
                  </div>
                </div>
                <div class="info-item">
                  <div class="info-label-value">
                    <span class="info-label-bold">Loan Duration:</span> {{ fund.loan_duration }} Months
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      
      </v-container>

      <!-- CREATE LOAN -->
    <v-container class="custom-container" v-if="showCreateLoanForm">
        <v-row justify="center">
          <v-col cols="12" sm="8" md="6" lg="4">
            <v-card class="my-4 custom-card" :style="{ backgroundColor: color }">
              <v-card-title class="custom-card-title">Create Loan</v-card-title>
              <v-divider class="mt-2"></v-divider>
              <v-card-text>
                <v-form @submit.prevent="submitLoanForm">
                  <v-text-field v-model="newLoan.customerName" label="Customer Name" readonly></v-text-field>
                  <v-text-field v-model.number="newLoan.loan_fund_id" label="Loan Fund ID"></v-text-field>
                  <v-text-field v-model.number="newLoan.amount" label="Amount"></v-text-field>
                  <div v-if="createLoanError" class="error-message">{{ createLoanError }}</div>
                  <v-btn type="submit" color="primary">Create</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <!-- VIEW LOANS AND ACCEPT/REJECT LOAN -->
      <v-container class="custom-container">
        <v-row justify="center">
          <v-col v-for="item in loan" :key="item.id" cols="12" sm="6" md="4" lg="3">
            <v-card class="my-4 custom-card" :style="{ backgroundColor: color }">
              <v-card-title class="custom-card-title">{{ item.customerName }}</v-card-title>
              <v-divider class="mt-2"></v-divider>
              <v-card-text>
                <div class="info-item">
                  <div class="info-label-value">
                    <v-icon class="card-icon">mdi-key</v-icon>
                    <span class="info-label-bold"></span> {{ item.id }}
                  </div>
                </div>
                <div class="info-item">
                  <div class="info-label-value">
                    <span class="info-label-bold">Loan amount:</span> ${{ item.loan_amount }}
                  </div>
                </div>
                <div class="info-item">
                  <div class="info-label-value">
                    <span class="info-label-bold">Interest Rate:</span> {{ item.interest_rate }}%
                  </div>
                </div>
                <div class="info-item">
                  <div class="info-label-value">
                    <span class="info-label-bold">Status:</span> {{ item.status }}
                  </div>
                </div>
                <div class="info-item">
                  <div class="info-label-value">
                    <span class="info-label-bold">Date Requested:</span> {{ item.date_requested }}
                  </div>
                </div>
                <div class="info-item">
                  <div class="info-label-value">
                    <span class="info-label-bold">Loan Duration:</span> {{ item.duration }} Months
                  </div>
                </div>
                <div class="info-item">
                  <div class="info-label-value">
                    <span class="info-label-bold">Monthly Installment:</span> ${{ item.monthly_installment }}
                  </div>
                </div>
                <div class="info-item">
                  <div class="info-label-value">
                    <span class="info-label-bold">Loan Fund ID:</span> {{ item.loan_fund_ID }}
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          </v-row>
        </v-container>

      </div>
    </v-app>
</template>


<script>
import axios from 'axios';

export default {
  name: 'LoanCustomerPage',

  created() {
    const username = this.$route.params.username;
    console.log(`Hello, ${username}! Welcome to the Loan Customer Page.`);
    this.newLoan.customerName = username;
  },


  data: () => ({
    loanFunds: [],
    loan: [], 
    newLoan: {
      customerName: '',
      loan_fund_id: null,
      status: "Requested",
      amount: 0,
    },
    showCreateLoanForm: false,
    createLoanError: null,
  }),

  methods: {
    logout() {
        this.$router.push('/login');
    },
    async viewLoans() {
        try {
        const username = this.$route.params.username;
        this.showCreateLoanForm = false;
        this.loanFunds = [];
        const response = await axios.get(`http://127.0.0.1:8000/loan/${username}`);
        // Assuming the response data is an array of loans
        this.loan = response.data;
        } catch (error) {
        console.error('Error fetching loans:', error);
        }
    },
    async submitLoanForm() {
      try {
        const response = await axios.post("http://127.0.0.1:8000/loan/", this.newLoan);
        if (response.status === 201) {
          this.newLoan = {
            customerName: this.$route.params.username,
            loan_fund_id: null,
            status: "Requested",
            amount: 0,
          };
          this.viewLoans();
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
            this.createLoanError = error.response.data.error; 
        } else {
          console.error("Error creating loan:", error);
        }
      }
    },
    async viewLoanFunds() {
      try {
        this.showCreateLoanForm = false;
        this.loan = [];
        const response = await axios.get('http://127.0.0.1:8000/loanFund/');
        this.loanFunds = response.data;
      } catch (error) {
        console.error('Error fetching loan funds:', error);
      }
    },
    createLoan(){
      this.loanFunds = [];
      this.loan = [];
      this.showCreateLoanForm = true;
    },

  },
  };

</script>

<style>

</style>