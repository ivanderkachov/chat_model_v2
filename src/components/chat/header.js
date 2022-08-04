import React from "react";
import { Link } from "react-router-dom";

const Header = ({ room }) => {
  return (
    <form>
      <div className="flex items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-gray-700">
        <div className="block w-80 mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300">
          ROOM {room}
        </div>
        <button
          type="button"
          className="relative w-fit h-fit px-1 py-0.4 text-xs text-white bg-red-500 border-white rounded-full border-black hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          <p>
            <Link to="/rooms">X</Link>
          </p>
        </button>
      </div>
    </form>
  );
}

export default Header