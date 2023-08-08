<template>
  <v-app>

    <!-- App Bar -->
    <v-app-bar color="primary" dark class="custom-app-bar" :elevation="7">
      <v-toolbar-title class="app-bar-title">Bank Personnel</v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-slot:append>
        <v-btn rounded="0" size="x-large" class="app-bar" @click="createLoanFunds">Create Loan Fund</v-btn>
        <v-btn rounded="0" size="x-large" class="app-bar" @click="viewLoanFunds">View Loan Funds</v-btn>
        <v-btn rounded="0" size="x-large" class="app-bar" @click="viewLoans">View Loans</v-btn>
        <v-btn rounded="0" size="x-large" class="app-bar" @click="editLoanFunds">Edit Loan Funds</v-btn>
        <v-btn rounded="0" size="x-large" class="app-bar" @click="editLoans">Edit Loans</v-btn>
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

      <!-- VIEW LOANS -->
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

      <!-- CREATE LOAN FUND -->
      <v-container class="custom-container">
        <v-row justify="center">
          <v-col cols="12" sm="8" md="6" lg="4">
            <v-card class="my-4 custom-card" :style="{ backgroundColor: color }">
              <v-card-title class="custom-card-title">Create Loan Fund</v-card-title>
              <v-divider class="mt-2"></v-divider>
              <v-card-text>
                <v-form @submit.prevent="submitLoanFundForm">
                  <v-text-field v-model="newLoanFund.name" label="Name"></v-text-field>
                  <v-text-field v-model="newLoanFund.max_loan_amount" label="Max Loan Amount"></v-text-field>
                  <v-text-field v-model="newLoanFund.min_loan_amount" label="Min Loan Amount"></v-text-field>
                  <v-text-field v-model="newLoanFund.interest_rate" label="Interest Rate"></v-text-field>
                  <v-text-field v-model="newLoanFund.loan_duration" label="Loan Duration"></v-text-field>
                  <v-btn type="submit" color="primary">Create</v-btn>
                </v-form>
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
  name: 'BankPersonnelPage',

  data: () => ({
    
    loanFunds: [],
    loan: [], 
    color: '',
    newLoanFund: {
      name: "",
      max_loan_amount: 0,
      min_loan_amount: 0,
      interest_rate: 0,
      loan_duration: 0,
    },
  }),

  methods: {
    async viewLoanFunds() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/loanFund/');
        this.loanFunds = response.data;
        this.loan = [];
      } catch (error) {
        console.error('Error fetching loan funds:', error);
      }
    },
      
    async viewLoans() {
      try {
      const response = await axios.get('http://127.0.0.1:8000/loan/');
      this.loan = response.data;
      this.loanFunds = [];
    } catch (error) {
      console.error('Error fetching loan funds:', error);
    }
    },
    async submitLoanFundForm() {
      try {
        const response = await axios.post("http://127.0.0.1:8000/loanFund/", this.newLoanFund);
        if (response.status === 201) {
          // Successful creation, update the UI or perform other actions
          // Clear the form fields
          this.newLoanFund = {
            name: "",
            max_loan_amount: 0,
            min_loan_amount: 0,
            interest_rate: 0, 
            loan_duration: 0,
          };
          // Optionally, you can fetch and update the list of loan funds after successful creation
          this.viewLoanFunds();
        }
      } catch (error) {
        console.error("Error creating loan fund:", error);
        // Display an error message to the user
        // You can use a library like v-dialog to show a modal with the error message
        // Or use a snackbar to show a temporary message at the bottom of the screen
      }
    },

    editLoanFunds() {
        // Handle edit loan funds action
    },
    editLoans() {
        // Handle edit loans action
    },
    logout() {
        // Handle logout action
        // Redirect to the login page
        this.$router.push('/login');
    },
  },
};
</script>
  
  <style>
  .page-wrapper {
    background-color: #f5f5f5; /* Set the background color for the whole page */
    min-height: 100vh; /* Set the minimum height to cover the viewport */
    padding-top: 70px; /* To account for the app bar height */
    box-sizing: border-box;
  }
  .app-bar-title {
    font-size: 1.75vw;
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
  }
  .info-label-bold {
    font-weight: bold;
  }
  .logout-button {
    background-color: white;
    color: black;
    font-size: 1vw;
  }
  .app-bar {
    font-size: 1vw;
  }
  .custom-app-bar {
    position: sticky;
    top: 0;
    height: 70px;
    display: flex;
    align-items: center;
    background-color: #1a1717;
    color: white;
    font-size: 18px;
    font-weight: bold;
    z-index: 1000;
  }
  .custom-card {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.custom-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
}

.custom-card-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 8px;
  text-align: center;
}

.info-label-bold {
  font-weight: bold;
  color: #333333;
}

.card-icon {
  font-size: 24px;
  margin-right: 4px;
}

</style>
  