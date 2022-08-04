import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setUserName } from "../../redux/reducers/user";

const Profile = () => {
  const dispatch = useDispatch()
  const userName = useSelector((store) => store.user.name);
  const [name, setName] = useState(userName)
  const [buttonEdit, setButtonEdit] = useState('untoggled')


  return (
    <div className="flex items-center justify-center  ">
      <div className="bg-white rounded-2xl border shadow-md p-8 max-w-lg">
        <div className="flex flex-wrap flex-col items-center space-y-5">
          <h1 className="font-bold text-2xl text-gray-700 w-4/6 text-center">
            Profile
          </h1>
          <p className="text-sm text-gray-500 text-center w-5/6">
            Please enter your chat name
          </p>
          {buttonEdit === "toggled" && (
            <div className="flex flex-col space-y-5 w-full">
              <input
                type="text"
                value={name}
                placeholder="Name"
                className="border-2 rounded-lg h-8 w-full px-4 "
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <button
                className="bg-blue-700 text-white rounded-md hover:bg-blue-800 font-semibold px-4 py-3 w-full focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                onClick={() => {
                  setButtonEdit("untoggled");
                  dispatch(setUserName(name));
                }}
              >
                Save
              </button>
            </div>
          )}
          {buttonEdit === "untoggled" && (
            <div className="flex flex-col space-y-5 w-full">
              <h3 className="font-bold w-full text-2xl text-gray-700 text-sm ">
                {name}
              </h3>
              <button
                className="bg-blue-700 text-white rounded-md hover:bg-blue-800 font-semibold px-4 py-3 w-full focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                onClick={() => {
                  setButtonEdit("toggled");
                }}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile