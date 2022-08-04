import React from "react";

const Userlist = ({ roomData }) => {

  return (
    <div className="container3 bg-gray-50 ">
      Users online:
      {roomData.map((it, index) => {
        return (
          <div className="text-gray-400 underline" key={index}>
            {it.name}
          </div>
        );
      })}
    </div>
  );
}

export default Userlist