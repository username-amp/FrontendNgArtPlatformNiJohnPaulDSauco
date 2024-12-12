import { createStore } from "redux";

const initialState = {
  user: {
    username: "",
    firstName: "",
    profilePicture: null,
  },
};

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

const store = createStore(userReducer);

export default store;
