import axios from "axios"

const GET_USERS = "GET_USERS"

const initialState = {
  users: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS: {
      return {
        ...state,
        users: action.users
      }
    }
    default: {
      return state
    }
  }
}

export function getUsers() {
  return (dispatch) => {
    return axios("/api/v1/getusers").then(({ data }) => {
      const users = data.users.reduce((acc, rec) => {
        return {...acc, [rec._id]: rec}
      },{})
      dispatch({
        type: GET_USERS,
        users
      });
    });
  }
}