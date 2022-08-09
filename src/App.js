import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Provider } from "react-redux";


import store from "./redux";

import ProtectedRoute from './ProtectedRoute';
import StartUp from './StartUp';
import LoginRoute from './LoginRoute';
import Login from './components/login/login'
import Registration from "./components/registration/registration";
import Rooms from './components/rooms/rooms';
import Chat from "./components/chat/chat";
import Admin from "./components/admin/admin"

import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <StartUp>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <LoginRoute>
                  <Login />
                </LoginRoute>
              }
            />
            <Route exact path="/reg" element={<Registration />} />
            <Route exact path="/admin" element={<Admin />} />
            <Route
              exact
              path="/chat"
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/rooms"
              element={
                <ProtectedRoute>
                  <Rooms />
                </ProtectedRoute>
              }
            />
          </Routes>
        </StartUp>
      </Router>
    </Provider>
  );
}

export default App;
