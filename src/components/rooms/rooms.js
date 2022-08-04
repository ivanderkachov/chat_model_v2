import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";

import { getRoom } from "../../redux/reducers/rooms";


import Roomcard from "./roomcard";
import Profile from "./profile";
import Addroom from "./addroom";



const Rooms = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRoom())
  },[])

  const rooms = useSelector((store) => store.rooms.rooms);

  return (
    <div className="flex space-x-4 bg-blue-100 h-screen ">
      <Profile />
      <div className="flex  flex-col flex-wrap">
        {Object.entries(rooms).map((room, index) => {
          return (
            <div className="" key={index}>
              <Roomcard room={room[1].name} users={room[1].users} />
            </div>
          );
        })}
        <Addroom />
      </div>
    </div>
  );
};

export default Rooms;
