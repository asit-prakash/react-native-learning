import { SIGNIN, SIGNUP, SIGNOUT } from "../../actions/authActions/authActions";

const initialState = {
  token: null,
  userId: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN:
      return {
        token: action.token,
        userId: action.userId,
      };
    case SIGNUP:
      return {
        token: action.token,
        userId: action.userId,
      };

    case SIGNOUT:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
