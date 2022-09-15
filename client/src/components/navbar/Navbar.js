import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UidContext } from "../AppContext";
import Logout from "../Log/logout";
import logo from "../../styles/components/logo-icon-navbar.svg";

const Navbar = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer)

  return (
    <div className="navbar">
        <div className="parts_navbar_div_logo">
          <NavLink exact="true" to="/" className="parts_navbar_navlink_logo">
            <img src={logo} width="40" height="40" alt="éther webapp" className="parts_navbar_img_logo"/>
            <p className="parts_navbar_p_logo"><span className="MajGrand24">É</span>THER</p>
          </NavLink>
        </div>
    </div>
  );
};

export default Navbar;
