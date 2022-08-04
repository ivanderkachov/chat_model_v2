import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { trySignIn } from "./redux/reducers/login";

const StartUp = ({ children }) => {

  const dispatch = useDispatch();
  const token = useSelector((store) => store.login.token);

  useEffect(() => {
    if (token) {
      dispatch(trySignIn());
    }
  }, []);

  return children;
};

export default StartUp;
