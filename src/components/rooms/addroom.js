import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addRoom } from "../../redux/reducers/rooms";

const Addroom = () => {
  const [button, setButton] = useState('untoggled')
  const [roomName, setRoomName] = useState('')
  const dispatch = useDispatch()

  return (
    <div className="mx-auto lg:max-w-7xl mt-3 ">
      <div className="max-w-7xl mx-auto px-5 mb-3">
        <div className="">
          <div className="max-w-xl bg-grey-800 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="p-5">
              {button === "untoggled" && (
                <div className="flex flex-col">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Add room
                  </h5>
                  <button
                    className="items-center py-3 px-3 text-xl font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                    onClick={() => {
                      setButton("toggled");
                    }}
                  >
                    +
                  </button>
                </div>
              )}
              {button === "toggled" && (
                <div className="flex flex-col items-center space-y-3">
                  <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Set name
                  </h4>
                  <input
                    type="text"
                    className="w-24 rounded-lg border border-gray-200 shadow-md"
                    value={roomName}
                    placeholder="Type here..."
                    onChange={(e) => {
                      setRoomName(e.target.value);
                    }}
                  />
                  <button
                    className="items-center shadow-md py-3 px-3 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                    onClick={() => {
                      setButton("untoggled")
                      dispatch(addRoom(roomName));
                      setRoomName("");
                    }}
                  >
                    Add room
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addroom;
