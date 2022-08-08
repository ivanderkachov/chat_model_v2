import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";

import { getRoom } from "../../redux/reducers/rooms";


import Roomcard from "./roomcard";
import Profile from "./profile";
import Addroom from "./addroom";
import Navigation from "../navigation/navigation";


const Rooms = () => {

  const dispatch = useDispatch()
  const cookies = document.cookie
  console.log(cookies)

  useEffect(() => {
    dispatch(getRoom())
  },[])

  const rooms = useSelector((store) => store.rooms.rooms);

  return (
    <div className="space-y-4">
      <div className="sticky top-0 left-0 right-0">
        <Navigation />
      </div>

      <div className="flex space-x-4 bg-blue-100 h-screen ">
        <Profile />
        <div className="flex  flex-col flex-wrap ">
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
    </div>
  );
};

export default Rooms;
