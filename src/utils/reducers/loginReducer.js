export const initialState = {
  docId: "",
};

export const loginReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, docId: action.payload };

    case "SIGNOUT":
      return { ...state, ...initialState };

    default:
      return state;
  }
};
