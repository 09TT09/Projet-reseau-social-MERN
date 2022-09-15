import React from "react";
import { NavLink } from 'react-router-dom';

const LeftNav = () => {
  return(
    <div className="left-nav-container">
        <div className="icons">
            <div className="icons-bis">
                <NavLink to='/' exact="true" activeClassName="active-left-nav">
                    <img src="" alt="home" />
                </NavLink>

                <NavLink to='/trendings' exact="true" activeClassName="active-left-nav">
                    <img src="" alt="rocket" />
                </NavLink>

                <NavLink to='/profil' exact="true" activeClassName="active-left-nav">
                    <img src="" alt="profil" />
                </NavLink>
                <br />
            </div>
        </div>
    </div>
  );
};

export default LeftNav;