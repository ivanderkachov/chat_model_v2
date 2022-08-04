import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setUserRoom } from "../../redux/reducers/user";
import { delRoom } from "../../redux/reducers/rooms";



const Roomcard = ({ room, users }) => {
  const dispatch = useDispatch()


  return (
    <div className="mx-auto lg:max-w-7xl mt-3 ">
      <div className="max-w-7xl mx-auto px-5 mb-3">
        <div className="">
          <div className="max-w-xl bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Room {room}
              </h5>
              <div className="text-xs font-bold uppercase text-teal-700 mt-1 mb-2">
                Room {room}
              </div>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Online users {users.length}
              </p>
              <div className="flex space-x-1">
                <button
                  type="button"
                  onClick={() => {
                    dispatch(setUserRoom(room));
                  }}
                >
                  <Link
                    to="/chat"
                    className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Join
                    <svg
                      className="ml-2 -mr-1 w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </Link>
                </button>
                <button
                  type="button"
                  className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  onClick={() => {dispatch(delRoom(room))}}
                >
                  Delete X
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Roomcard