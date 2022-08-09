import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { trySignIn, logOut } from "./redux/reducers/login";

const StartUp = ({ children }) => {

  const dispatch = useDispatch();
  const token = useSelector((store) => store.login.token);
  const user = useSelector((store) => store.login.user)

  const [log, setLog] = useState(false)

  useEffect(() => {

    if (token && user.isLogin === true) {
      dispatch(trySignIn());
    } else {
      dispatch(logOut(user._id))
    }
  }, []);

  return children;
};

export default StartUp;
