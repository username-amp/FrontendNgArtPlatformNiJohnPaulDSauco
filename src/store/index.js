// src/store/index.js
import { createStore } from "redux";

// Initial state
const initialState = {
  user: {
    username: "",
    firstName: "",
    profilePicture: null,
  },
};

// Reducer function to update the user state
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

// Create the Redux store
const store = createStore(userReducer);

export default store;
