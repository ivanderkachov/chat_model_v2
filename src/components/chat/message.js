import React from "react";


const Message = ({ message, name }) => {
let isSentByCurrentUser = false;

if (message.user === name) {
  isSentByCurrentUser = true;
}
return isSentByCurrentUser ? (
  <div className="messageContainer justifyEnd">
    <p className="sentText pr-10">{name}</p>
    <div className="messageBox backgroundBlue">
      <p className="messageText colorWhite">{message.text}</p>
    </div>
  </div>
) : (
  <div className="messageContainer justifyStart">
    <div className="messageBox backgroundLight">
      <p className="messageText colorDark ">{message.text}</p>
    </div>
    <p className="sentText pl-10">{message.user}</p>
  </div>
);
}

export default Message