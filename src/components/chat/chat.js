import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

import "./chat.css";

import Header from "./header";
import Input from "./input";
import MsgArea from "./msgarea";
import Userlist from "./userlist"
import Navigation from "../navigation/navigation";
import { getUsersInRoom, addMessage } from "../../redux/reducers/rooms";

let socket;

const Chat = () => {
  const { name, room } = useSelector((store) => store.user);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomData, setRoomData] = useState([]);

  const ENDPOINT = "localhost:8090";

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("join", { name, room }, (error) => {
      if (error) {
        navigate('/rooms')
        return alert(error);
      }

    });
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [ENDPOINT, name, room]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
      dispatch(addMessage(room, message))
    });
    socket.on("roomData", (data) => {
      setRoomData([...data.users])
      dispatch(getUsersInRoom(room, data.users))
    });
  }, [messages,roomData]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  console.log(messages);

  return (
    <div>
      <div className="sticky top-0 left-0 right-0">
        <Navigation />
      </div>
      <div className="outerContainer bg-blue-100  ">
        <div className="container border-slate-500 shadow-md">
          <Header room={room} />
          <div className="container2">
            <Userlist roomData={roomData} />
            <MsgArea messages={messages} name={name} />
          </div>
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
