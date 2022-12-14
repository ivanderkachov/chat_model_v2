import axios from "axios";
import Cookies from "universal-cookie";


const REG_USER = "REG_USER";
const LOG_USER = "LOG_USER"
const LOG_OUT_USER = "LOG_OUT_USER"

const cookies = new Cookies()

const initialState = {
  email: "",
  password: "",
  token: cookies.get('token'),
  user: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REG_USER: {
      return {
        ...state,
        email: action.email,
        password: action.password,
      };
    }
    case LOG_USER: {
      return {
        ...state,
        email: "",
        password: "",
        token: action.token,
        user: action.user,
      };
    }
    case LOG_OUT_USER: {
      return {
        ...state,
        email: "",
        password: "",
        token: "",
        user: ""
      };
    }
    default:
      return state;
  }
};

export function trySignIn() {
  return (dispatch) => {
    return axios("/api/v1/auth")
      .then(({ data }) => {
        dispatch({
          type: LOG_USER,
          token: data.token,
          user: data.user
        });
      });
  };
}

export function regUser(form) {
  return (dispatch) => {
    return axios
      .post(
        "/api/v1/users",
        { ...form },
        { headers: { "Content-type": "application/json" } }
      )
      .then((res) => {
        console.log(res);
        dispatch({
          type: REG_USER,
          email: form.email,
          password: form.password,
        });
      })
  };
}

export function logUser(form) {

  return (dispatch) => {
    return axios
      .post(
        "/api/v1/login",
        { ...form },
        { headers: { "Content-type": "application/json" } }
      )
      .then(({ data }) => {
        dispatch({
          type: LOG_USER,
          token: data.token,
          user: data.user
        });

      });
  };
}

export function logOut(_id) {
  return (dispatch) => {
    return axios
      .post(
        "/api/v1/logout",
        { _id },
        { headers: { "Content-type": "application/json" } }
      )
      .then(({ data }) => {
        dispatch({
          type: LOG_OUT_USER,
          data
        });
      });
  };
}
