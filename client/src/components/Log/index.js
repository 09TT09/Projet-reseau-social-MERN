import React, { useState } from "react";
import SignUp from "./signup";
import Login from "./login";
import logo from "../../styles/components/logo-icon.svg";

const Logs = (props) => {
  const [loginModal, setLoginModal] = useState(props.login); // initial = true
  const [signUpModal, setSignUpModal] = useState(props.signup); // initial = false

  const changeActivePage = () => {
    setLoginModal(!loginModal);
    setSignUpModal(!signUpModal);
  };

  const handleModals = (event) => {
    if (event.target.id === "register") {
      setLoginModal(false);
      setSignUpModal(true);
    } else if (event.target.id === "login") {
      setLoginModal(true);
      setSignUpModal(false);
    }
  };

  return (
    <div className="login_page">
      <div className="login_page_flex">
        <div className="div_logo">
          <img src={logo} width="140" height="140" alt="éther webapp"/>
          <p className="app_name"><span className="MajGrand28">É</span>THER</p>
        </div>
        {loginModal && <Login changeActivePage={changeActivePage} />}
        {signUpModal && <SignUp changeActivePage={changeActivePage} />}
      </div>
    </div>
  );
};

export default Logs;
