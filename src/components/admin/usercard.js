import React from "react";
import { useDispatch } from "react-redux";


import { logOut } from "../../redux/reducers/login";

const Usercard = ({user}) => {
  const  isLogin = user.isLogin
  const dispatch = useDispatch()


  return (
    <div>
      <div className="mx-auto lg:max-w-7xl mt-3 ">
        <div className="max-w-7xl mx-auto px-5 mb-3">
          <div className="">
            <div className="max-w-xl bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  id: {user._id}
                </h5>
                <div className="text-xs font-bold uppercase text-teal-700 mt-1 mb-2">
                  email: {user.email}
                </div>
                {isLogin === true && (<div>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Online
                  </p>
                  <div className="flex space-x-1">

                      <button
                        type="button"
                        className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        onClick={()=>{dispatch(logOut(user._id))}}
                      >
                        Sign Out
                      </button>
                  </div>
                </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Usercard