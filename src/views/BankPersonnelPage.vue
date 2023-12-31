<template>
  <v-app>

    <!-- App Bar -->
    <v-app-bar color="primary" dark class="custom-app-bar" :elevation="7">
      <v-toolbar-title class="app-bar-title">Bank Personnel</v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-slot:append>
        <v-btn id="createLoanFunds" rounded="0" size="x-large" class="app-bar" @click="createLoanFunds">Create Loan Fund</v-btn>
        <v-btn id="createLoan" rounded="0" size="x-large" class="app-bar" @click="createLoan">Create Loan</v-btn>
        <v-btn id="viewLoanFunds" rounded="0" size="x-large" class="app-bar" @click="viewLoanFunds">View Loan Funds</v-btn>
        <v-btn id="viewLoans" rounded="0" size="x-large" class="app-bar" @click="viewLoans">View Loans</v-btn>
        <!-- <v-btn rounded="0" size="x-large" class="app-bar" @click="editLoans">Edit Loans</v-btn> -->
        <v-btn id="logOut" rounded="xl" size="x-large" class="logout-button" @click="logout">Logout</v-btn>
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
                <v-btn icon color="error" @click="deleteLoanFund(fund.id)">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
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

      <!-- VIEW LOANS AND ACCEPT/REJECT LOAN -->
      <v-container class="custom-container">
        <v-row justify="center">
          <v-col v-for="item in loan" :key="item.id" cols="12" sm="6" md="4" lg="3">
            <v-card class="my-4 custom-card" :style="{ backgroundColor: color }">
              <v-card-title id="loanTitle" class="custom-card-title">{{ item.customerName }}</v-card-title>
              <v-card-actions class="delete-button">
                <v-btn icon color="error" @click="deleteLoan(item.id)">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-card-actions>
              <v-divider class="mt-2"></v-divider>
              <v-card-text>
                <div class="info-item">
                  <div class="info-label-value">
                    <v-icon class="card-icon">mdi-key</v-icon>
                    <span id="loanID" class="info-label-bold">{{ item.id }}</span> 
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
                    <span id="loanID" class="info-label-bold">Loan Fund ID:</span> {{ item.loan_fund_ID }}
                  </div>
                </div>
              </v-card-text>
              <v-card-actions class="card-actions">
                <div class="actions-center">
                  <v-btn :id="'acceptLoan' + item.loan_fund_ID" color="success" @click="acceptLoan(item.id)">Accept</v-btn>
                  <v-btn :id="'rejectLoan' + item.loan_fund_ID" color="error" @click="rejectLoan(item.id)">Reject</v-btn>
                </div>
              </v-card-actions>
            </v-card>
          </v-col>
          </v-row>
        </v-container>

      <!-- CREATE LOAN FUND -->
      <v-container class="custom-container" v-if="showCreateForm">
        <v-row justify="center">
          <v-col cols="12" sm="8" md="6" lg="4">
            <v-card class="my-4 custom-card" :style="{ backgroundColor: color }">
              <v-card-title class="custom-card-title">Create Loan Fund</v-card-title>
              <v-divider class="mt-2"></v-divider>
              <v-card-text>
                <v-form @submit.prevent="submitLoanFundForm">
                  <v-text-field id="Name" v-model="newLoanFund.name" label="Name"></v-text-field>
                  <v-text-field id="Max Loan Amount" v-model="newLoanFund.max_loan_amount" label="Max Loan Amount"></v-text-field>
                  <v-text-field id="Min Loan Amount" v-model="newLoanFund.min_loan_amount" label="Min Loan Amount"></v-text-field>
                  <v-text-field id="Interest Rate" v-model="newLoanFund.interest_rate" label="Interest Rate"></v-text-field>
                  <v-text-field id="Loan Duration" v-model="newLoanFund.loan_duration" label="Loan Duration"></v-text-field>
                  <v-btn id="submitLoanFund" type="submit" color="primary" label="Create LoanFund">Create</v-btn>
                </v-form>
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
                  <v-text-field v-model="newLoan.customerName" label="Customer Name"></v-text-field>
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




    </div>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BankPersonnelPage',

  data: () => ({
    newLoan: {
      customerName: "",
      loan_fund_id: null,
      status: "Requested",
      amount: 0,
    },
    showCreateLoanForm: false,
    loanFunds: [],
    createLoanError: null,
    showCreateForm: false,
    loan: [], 
    color: '',
    newLoanFund: {
      name: "",
      max_loan_amount: "",
      min_loan_amount: "",
      interest_rate: "",
      loan_duration: "",
    },
  }),

  methods: {
    async deleteLoan(loan_id) {
  try {
    const token = this.$store.state.token; 
    const config = {
      headers: {
        Authorization: `Token ${token}`, 
      },
    };

    const response = await axios.delete(`http://127.0.0.1:8000/loan/delete/${loan_id}`, config); 

    if (response.status === 204) {
      this.viewLoans();
    }
  } catch (error) {
    console.error('Error deleting loan:', error);
  }
},

    async deleteLoanFund(fundId) {
  try {
    const token = this.$store.state.token; 
    const config = {
      headers: {
        Authorization: `Token ${token}`, 
      },
    };

    const response = await axios.delete(`http://127.0.0.1:8000/loanFund/${fundId}`, config); 

    if (response.status === 204) {
      this.viewLoanFunds();
    }
  } catch (error) {
    console.error('Error deleting loan fund:', error);
  }
},

async submitLoanForm() {
  try {
    const token = this.$store.state.token; 
    const config = {
      headers: {
        Authorization: `Token ${token}`, 
      },
    };

    const response = await axios.post("http://127.0.0.1:8000/loan/", this.newLoan, config); 

    if (response.status === 201) {
      this.newLoan = {
        customerName: "",
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


async acceptLoan(loanId) {
  try {
    const token = this.$store.state.token; 
    const config = {
      headers: {
        Authorization: `Token ${token}`, 
      },
    };

    const response = await axios.put(`http://127.0.0.1:8000/loan/approve/${loanId}`, null, config); 

    if (response.status === 200) {
      this.viewLoans();
    }
  } catch (error) {
    console.error('Error accepting loan:', error);
  }
},


async rejectLoan(loanId) {
  try {
    const token = this.$store.state.token; 
    const config = {
      headers: {
        Authorization: `Token ${token}`, 
      },
    };

    const response = await axios.put(`http://127.0.0.1:8000/loan/reject/${loanId}`, null, config); 

    if (response.status === 200) {
      this.viewLoans();
    }
  } catch (error) {
    console.error('Error rejecting loan:', error);
  }
},


  async viewLoanFunds() {
    try {

      const token = this.$store.state.token;


      const config = {
        headers: {
          Authorization: `Token ${token}`, 
        },
      };

      const response = await axios.get('http://127.0.0.1:8000/loanFund/', config);
      
      this.loanFunds = response.data;
      this.loan = [];
      this.showCreateForm = false;
      this.showCreateLoanForm = false;
    } catch (error) {
      console.error('Error fetching loan funds:', error);
    }
},
      
async viewLoans() {
  try {
    const token = this.$store.state.token; 
    const config = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    const response = await axios.get('http://127.0.0.1:8000/loan/', config); 
    this.loan = response.data;
    this.loanFunds = [];
    this.showCreateForm = false;
    this.showCreateLoanForm = false;
  } catch (error) {
    console.error('Error fetching loans:', error);
  }
},
async submitLoanFundForm() {
  try {
    const token = this.$store.state.token; 
    const config = {
      headers: {
        Authorization: `Token ${token}`, 
      },
    };

    const response = await axios.post("http://127.0.0.1:8000/loanFund/", this.newLoanFund, config);

    if (response.status === 201) {
      this.newLoanFund = {
        name: "",
        max_loan_amount: 0,
        min_loan_amount: 0,
        interest_rate: 0,
        loan_duration: 0,
      };
      this.viewLoanFunds();
    }
  } catch (error) {
    console.error("Error creating loan fund:", error);
  }
},

    createLoanFunds(){
      this.loan = [];
      this.loanFunds = [];
      this.showCreateLoanForm = false;
      this.showCreateForm = true;
    },
    createLoan(){
      this.loan = [];
      this.loanFunds = [];
      this.showCreateForm = false;
      this.showCreateLoanForm = true;
    },
    editLoanFunds() {
    },
    editLoans() {
    },
    logout() {
      // Clear the token in the Vuex store
      this.$store.commit('clearToken');
      this.$router.push('/login');
    },
  },
};
</script>
  
<style>
.delete-button {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 8px;
  text-align: center; 
  font-weight: bold; 
}
.card-actions {
  display: flex;
  justify-content: center; 
  align-items: center; 
  padding: 16px;
}

.actions-center {
  display: flex;
  justify-content: center; 
  align-items: center;
}
  .page-wrapper {
    background-color: #f5f5f5; 
    min-height: 100vh; 
    padding-top: 70px; 
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
  