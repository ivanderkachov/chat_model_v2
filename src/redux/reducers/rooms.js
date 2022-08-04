import axios from "axios";

const USERS_IN_ROOM = "USERS_IN_ROOM";
const ADD_ROOM = "ADD_ROOM";
const GET_ROOM = "GET_ROOM";
const DEL_ROOM = "DEL_ROOM";
const ADD_MESSAGE = "ADD_MESSAGE"

const initialState = {
  rooms: {},
  // rooms1: {
  //   1: {
  //     name: "1",
  //     users: [],
  //     messages: "",
  //   },
  //   2: {
  //     name: "2",
  //     users: [],
  //     messages: "",
  //   },
  //   3: {
  //     name: "3",
  //     users: [],
  //     messages: "",
  //   },
  //   4: {
  //     name: "4",
  //     users: [],
  //     messages: "",
  //   },
  // },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USERS_IN_ROOM: {
      return {
        ...state,
        rooms: action.rooms,
      };
    }
    case ADD_ROOM: {
      return {
        ...state,
        rooms: action.rooms,
      };
    }
    case GET_ROOM: {
      return {
        ...state,
        rooms: action.rooms,
      };
    }
    case DEL_ROOM: {
      return {
        ...state,
        rooms: action.rooms,
      };
    }
    case ADD_MESSAGE: {
      return {
        ...state,
        rooms: action.rooms,
      };
    }
    default:
      return state;
  }
};

export function getUsersInRoom(roomName, usersInRoom) {
  return (dispatch, getState) => {
    const store = getState().rooms.rooms;
    return axios
      .post(
        "/api/v1/adddata",
        { name: roomName, users: usersInRoom },
        { headers: { "Content-type": "application/json" } }
      )
      .then(({ data }) => {
        // const newRoom = data.roomObj;
        // const rooms = { ...store, [newRoom.name]: newRoom };
        const rooms = data.newRoomObj.reduce((acc, rec) => {
          return { ...acc, [rec.name]: rec };
        }, {});
        dispatch({
          type: USERS_IN_ROOM,
          rooms,
        });
      });
  };
}

export function addMessage(roomName, message) {
  return (dispatch, getState) => {
    const store = getState().rooms.rooms;
    return axios
      .post(
        "/api/v1/addmessage",
        { name: roomName, message },
        { headers: { "Content-type": "application/json" } }
      )
      .then(({ data }) => {
        const rooms = data.newRoomObj.reduce((acc, rec) => {
          return { ...acc, [rec.name]: rec };
        }, {});
        dispatch({
          type: ADD_MESSAGE,
          rooms,
        });
      });
  };
}

export function getRoom() {
  return (dispatch, getState) => {
    return axios("/api/v1/getroom").then(({ data }) => {
      const rooms = data.roomObj.reduce((acc, rec) => {
        return { ...acc, [rec.name]: rec };
      }, {});
      dispatch({
        type: GET_ROOM,
        rooms,
      });
    });
  };
}

export function addRoom(name) {
  return (dispatch, getState) => {
    const store = getState().rooms.rooms;
    return axios
      .post(
        "/api/v1/addroom",
        { name },
        { headers: { "Content-type": "application/json" } }
      )
      .then(({ data }) => {
        // const newRoom = data.roomObj;
        // const rooms = { ...store, [newRoom.name]: newRoom };
        const rooms = data.newRoomObj.reduce((acc, rec) => {
          return { ...acc, [rec.name]: rec };
        }, {});
        dispatch({
          type: ADD_ROOM,
          rooms,
        });
      });
  };
}

export function delRoom(room) {
  return (dispatch, getState) => {
    const store = getState().rooms.rooms;
    return axios
      .post(
        "/api/v1/delroom",
        { name: room },
        { headers: { "Content-type": "application/json" } }
      )
      .then(({ data }) => {
        const rooms = data.roomObj.reduce((acc, rec) => {
          return { ...acc, [rec.name]: rec };
        }, {});
        dispatch({
          type: DEL_ROOM,
          rooms,
        });
      });
  };
}
