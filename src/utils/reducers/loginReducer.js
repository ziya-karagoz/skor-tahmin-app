const initialLoginState = {
  isLoading: true,
  username: null,
  userToken: null,
};

const loginReducer = (prevState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...prevState,
        username: action.id,
        userToken: action.token,
        isLoading: false,
      };
    case "LOGOUT":
      return {
        ...prevState,
        username: null,
        userToken: null,
        isLoading: false,
      };
    case "REGISTER":
      return {
        ...prevState,
        username: action.id,
        userToken: action.token,
        isLoading: false,
      };
  }
};

export { initialLoginState, loginReducer };
