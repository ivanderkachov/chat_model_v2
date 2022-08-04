import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logUser } from "../../redux/reducers/login";

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: '',
    password: '',
    isReg: false
  })


  return (
    <div className="bg-white h-screen w-screen flex justify-center items-center">
      <div className="px-6 py-3 rounded border w-64">
        <div className="flex flex-col items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <h2 className="text-2xl font-bold">Login</h2>
        </div>
        <div>
          <div className="flex flex-col my-2">
            <label className="text-xs text-gray-400">Username</label>
            <div className="text-xs text-red-400 flex justify-between items-center"></div>
            <input
              className="border rounded px-3 py-1 mt-2"
              type="text"
              name="email"
              placeholder="email"
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, [e.target.name]: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col my-2">
            <label className="text-xs text-gray-400">Password</label>
            <input
              className="border rounded px-3 py-1 mt-2"
              type="password"
              name="password"
              value={form.password}
              placeholder="password"
              onChange={(e) => {
                setForm({ ...form, [e.target.name]: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col items-center justify-center my-3">
            <button
              type="button"
              className="my-3 py-1 w-full rounded bg-blue-600 text-blue-200"
              onClick={() => {
                dispatch(logUser(form));
                setForm({ ...form, email: "", password: "" });
                navigate('/rooms')
              }}
            >
              Log In
            </button>
            <Link to="/reg" className="text-xs text-gray-500">
              Registration
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
