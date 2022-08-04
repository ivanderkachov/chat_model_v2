const SET_USER_NAME= 'SET_USER_NAME'
const SET_USER_ROOM = "SET_USER_ROOM";

const initialState = {
  name: 'User',
  room: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_NAME: {
      return {
        ...state,
        name: action.name,
      };
    }
    case SET_USER_ROOM: {
      return {
        ...state,
        room: action.room,
      };
    }
    default:
      return state;
  }
}

export function setUserName(name) {
  return {type: SET_USER_NAME, name}
}
export function setUserRoom(room) {
  return { type: SET_USER_ROOM, room };
}