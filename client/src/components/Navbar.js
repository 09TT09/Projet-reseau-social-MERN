import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./Log/logout";

const Navbar = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer)

  /*
  return (
    <div className="navbar">
      <div className="logo">
        <NavLink exact="true" to="/">
          <div className="logo">
            <img src="" alt="alex flex" />
            <span>Alex Flex</span>
          </div>
        </NavLink>
      </div>
      {uid ? (
        <ul>
          <li></li>
          <li className="welcome">
            <NavLink exact="true" to="/profil">
              <h5>Bienvenue {userData.pseudo}</h5>
            </NavLink>
          </li>
          <Logout />
        </ul>
      ) : (
        <ul>
          <li></li>
          <li>
            <NavLink exact="true" to="/profil">
              <img src="" alt="login" />
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
  */
};

export default Navbar;
