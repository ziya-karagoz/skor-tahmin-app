import LoginScreen from "../../screens/LoginScreen";
import { LOGIN, LOGOUT } from "../constants/constants";

export const initialState = {
  docId: "",
  isLogin: false,
};

export const loginReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, docId: action.payload, isLogin: true };

    case LOGOUT:
      return { ...state, ...initialState, isLogin: false };

    default:
      return state;
  }
};

export default loginReducer;
