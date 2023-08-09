<template>
    <v-app>
      <!-- App Bar -->
      <v-app-bar color="primary" dark class="custom-app-bar" :elevation="7">
        <v-toolbar-title class="app-bar-title">Loan Provider</v-toolbar-title>
        <v-spacer></v-spacer>
        <template v-slot:append>
          <v-btn rounded="xl" size="x-large" class="logout-button" @click="logout">Logout</v-btn>
        </template>
      </v-app-bar>
  
      <div class="page-wrapper">
        <!-- VIEW LOAN FUNDS -->
        <v-container class="custom-container">
          <v-row justify="center">
            <v-col v-for="fund in loanFunds" :key="fund.id" cols="12" sm="6" md="4" lg="3">
              <v-card class="my-4 custom-card" :style="{ backgroundColor: color }">
                <v-card-title class="custom-card-title">{{ fund.name }}</v-card-title>
                <v-divider class="mt-2"></v-divider>
                <v-card-text>
                  <div class="info-item">
                    <div class="info-label-value">
                      <v-icon class="card-icon">mdi-key</v-icon>
                      <span class="info-label-bold">ID:</span> {{ fund.id }}
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
                  <v-card-actions>
                    <v-row align="center">
                        <v-col cols="7">
                        <v-text-field v-model.number="cardInputValues.find(card => card.id === fund.id).value" style="height: 30px;" type="number"></v-text-field>
                        </v-col>
                        <v-col cols="5">
                          <v-btn color="primary" style="height: 0px;" size="large" @click="addFund(fund, cardInputValues.find(card => card.id === fund.id).value)">Add Fund</v-btn>
                        </v-col>
                    </v-row>
                    </v-card-actions>
                    <div v-if="cardInputValues.find(card => card.id === fund.id).errorMsg" style="margin-top: 30px;" class="error-message">{{ cardInputValues.find(card => card.id === fund.id).errorMsg }}</div>
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
    name: 'LoanProviderPage',
  
    data: () => ({
      cardInputValues: [],
      loanFunds: [],
      color: '',
      fundToAdd: 0,
      
      errorMsg: null,
    }),
  
    created() {
      this.viewLoanFunds();
    },
  
    methods: {
    async addFund(fund, amount) {
      if (amount <= 0) {
        const card = this.cardInputValues.find(card => card.id === fund.id);
        card.errorMsg = "Please enter a valid positive amount.";
        return; 
      }
        try {
          const response = await axios.put(`http://127.0.0.1:8000/loanFund/${fund.id}`, {
            amount: amount,
          });

          if (response.status === 200) {
            this.fundToAdd = 0;
            this.viewLoanFunds();
            this.errorMsg = "";
          }
        } catch (error) {
          console.error('Error updating fund amount:', error);
        }
    },
    async viewLoanFunds() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/loanFund/');
        this.cardInputValues = response.data.map(fund => ({ id: fund.id, value: '', errorMsg: '' }));
        this.loanFunds = response.data;
        this.cardInputValues = this.loanFunds.map(fund => ({ id: fund.id, value: '' }));
      } catch (error) {
        console.error('Error fetching loan funds:', error);
      }
    },
  
      logout() {
        this.$router.push('/login');
      },
    },
  };
  </script>
  
  <style>
  .error-message {
  color: red;
  font-size: 14px;
  margin-top: 8px;
  text-align: center;
  font-weight: bold;
}

  </style>
  