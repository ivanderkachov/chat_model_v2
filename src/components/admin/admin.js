import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getUsers } from "../../redux/reducers/admin";
import Usercard from "./usercard";


const Admin = () => {
  const dispatch = useDispatch()
  const users = useSelector((store) => store.admin.users)

  useEffect(() => {
    dispatch(getUsers())
  },[users])

  return (
    <div>
      {Object.entries(users).map((it) => {
        return (
          <div key={it[0]}> <Usercard user={it[1]}/></div>
        )
      })}

    </div>
  )
}

export default Admin