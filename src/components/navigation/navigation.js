import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { logOut } from "../../redux/reducers/login";

const Navigation = () => {
  const dispatch = useDispatch()

  const user = useSelector((store) => store.login.user)
  return (
    <nav className="flex justify-between px-5 py-3 items-center bg-white">
      <h1 className="text-xl text-gray-800 font-bold">User login name</h1>
      <div className="flex items-center">
        <button
        className="text-x text-gray-800 font-bold"
        onClick = {()=>{dispatch(logOut(user._id))}}>
          <Link to="/">Sign out</Link>
        </button>
      </div>
    </nav>
  );
}

export default Navigation