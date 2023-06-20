import {
  LOGIN_CALL,
  LOGOUT_CALL,
  REGISTER_CALL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  LOGIN_FAILURE,
  REGISTRATION_FAILURE,
  LOAD_USER,
  LOAD_USER_FAIL,
} from "./AuthActions";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_CALL:
    case REGISTER_CALL:
      return {
        ...state,
        user: null,
        loading: true,
        isAuthenticated: false,
        error: null,
        flashSuccess: null,
        flashError: null,
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        isAuthenticated: true,
        error: null,
        flashSuccess: action.payload.flashSuccess,
        flashError: null,
      };
    case LOAD_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
        isAuthenticated: true,
        error: null,
        flashSuccess: null,
        flashError: null,
      };

    case LOAD_USER_FAIL:
      return {
        ...state,
        user: false,
        loading: false,
        isAuthenticated: false,
        error: null,
        flashSuccess: null,
        flashError: null,
      };

    case LOGIN_FAILURE:
    case REGISTRATION_FAILURE:
      return {
        ...state,
        user: null,
        loading: false,
        isAuthenticated: false,
        error: action.payload.error,
        flashSuccess: null,
        flashError: action.payload.flashError,
      };

    case LOGOUT_CALL:
      return {
        ...state,
        user: null,
        loading: false,
        isAuthenticated: false,
        error: null,
        flashSuccess: null,
        flashError: null,
      };
    default:
      return {
        ...state,
      };
  }
};

export default AuthReducer;
