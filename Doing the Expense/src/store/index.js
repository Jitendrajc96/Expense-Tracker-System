import { createSlice, configureStore } from '@reduxjs/toolkit';

import { Store } from 'redux';
import { Provider } from 'react-redux';


const initialAuthState = {
  isAuthenticated: false,
  token:null,
  email:null,
  Expenses:[],
  totalExpense : 0

};

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state,action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.email = action.payload.email;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.email = null;

    },
    initialExpenses(state,action){
        state.Expenses = action.payload
    },
    addExpense(state, action){
        state.Expenses = [...state.Expenses, action.payload]


    },
    deleteExpense(state, action){
        state.Expenses = action.payload

    },
    editExpense(state ,action){
        state.Expenses = action.payload

    },
    totalExpense(state, action){


    }

  },
});

const store = configureStore({
  reducer: authSlice.reducer 
});


export const authActions = authSlice.actions;

export default store;