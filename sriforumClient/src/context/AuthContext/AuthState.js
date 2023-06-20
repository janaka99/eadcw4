import React, { useEffect, useReducer } from "react";
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
import AuthReducer from "./AuthReducer";
import AuthContext from "./AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthState = (props) => {
  const navigate = useNavigate();

  const initialState = {
    user: null,
    loading: false,
    isAuthenticated: false,
    error: null,
    flashSuccess: null,
    flashError: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const API = axios.create({
    baseURL: "http://localhost:8080/",
    methods: ["GET", "POST", "PUT", "DELETE"],
  });

  API.interceptors.request.use((req) => {
    if (
      localStorage.getItem("sri_forum_user") &&
      localStorage.getItem("sri_forum_user") != null
    ) {
      req.headers.authorization = `Bearer ${JSON.parse(
        localStorage.getItem("sri_forum_user")
      )}`;
    }
    console.log(req.headers);
    return req;
  });

  const login = async (data) => {
    try {
      dispatch({
        type: LOGIN_CALL,
      });
      API.post("user/login", data)
        .then((res) => {
          console.log(res.data.userDetails);

          localStorage.setItem("sri_forum_user", JSON.stringify(res.data.user));
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data.userDetails,
          });
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          dispatch({
            type: LOGIN_FAILURE,
            payload: err.response.data,
          });
        });
    } catch (error) {
      console.log(error);
      //   dispatch({
      //     type: LOGIN_FAILURE,
      //   });
    }
  };

  const register = async (data) => {
    try {
      dispatch({
        type: REGISTER_CALL,
      });
      API.post("user/add-new-user", data)
        .then((res) => {
          localStorage.setItem("srihub_user", JSON.stringify(res.data.token));
          dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
          });
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.response.data);
          dispatch({
            type: REGISTRATION_FAILURE,
            payload: err.response.data,
          });
        });
    } catch (error) {
      // dispatch({
      //   type: LOGIN_FAILURE,
      // });
    }
  };

  const logOut = () => {
    console.log("logOut");
    try {
      if (localStorage.getItem("sri_forum_user")) {
        localStorage.removeItem("sri_forum_user");
        dispatch({
          type: LOGOUT_CALL,
        });
      }
    } catch (error) {
      localStorage.removeItem("sri_forum_user");
      dispatch({
        type: LOGOUT_CALL,
      });
    }
  };

  const checkUser = () => {
    try {
      dispatch({
        type: LOGIN_CALL,
      });
      API.post("user/validate-user")
        .then((res) => {
          dispatch({
            type: LOAD_USER,
            payload: res.data,
          });
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);

          dispatch({
            type: LOAD_USER_FAIL,
          });
        });
    } catch (error) {
      dispatch({
        type: LOAD_USER_FAIL,
      });
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        logOut,
        checkUser,
        error: state.error,
        flashSuccess: state.flashSuccess,
        flashError: state.flashError,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
