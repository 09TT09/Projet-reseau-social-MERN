import React from "react";
import axios from "axios";
import cookie from "js-cookie";
import logout_icon from "../../styles/components/logout-icon.svg";


const Logout = () => {
  const removeCookie = (key) => {
      if (window !== "undefined"){
        cookie.remove(key, { expires: 1 });
      }
  };

  const logout = async() => {
      await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}api/user/logout`,
        withCredentials: true,
    })
    .then(() => removeCookie('jwt'))
    .catch((error) => console.log(error))

    window.location = "/";
  }

  return (
    <div onClick={logout} className="pages_home_logout pages_home_app">
      <div className="pages_home_div_logo">
          <img src={logout_icon} width="60" height="60" alt="logout" className="parts_navbar_img_logo"/>
      </div>
      <div className="pages_home_div_text">
          <p className="pages_home_div_p"><span className="MajGrand20">D</span>ÉCONNEXION</p>
      </div>
    </div>     
  );
};

export default Logout;
