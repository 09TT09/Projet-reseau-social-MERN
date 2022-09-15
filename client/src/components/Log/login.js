import React, { useState, useEffect } from "react";
import axios from "axios";

const Login = ({ changeActivePage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.getElementById("email").addEventListener("keydown", checkEmptyEmail);
    document.getElementById("email").addEventListener("keyup", placeholderEmail);
    document.getElementById("email").addEventListener("click", clickPlaceholderEmail);
    document.getElementById("password").addEventListener("keydown", checkEmptyPassword);
    document.getElementById("password").addEventListener("keyup", placeholderPassword);
    document.getElementById("password").addEventListener("click", clickPlaceholderPassword);
    document.addEventListener("click", clickBrowser);

    const email = document.getElementById("email")
    const emailHolder = document.getElementById("placeholder_email")
    const password = document.getElementById("password")
    const passwordHolder = document.getElementById("placeholder_password")

    // BROWSER
    function clickBrowser(){
      if (email != document.activeElement && email.value === "")
        emailHolder.classList.remove("display_none")
      if (password != document.activeElement && password.value === "")
        passwordHolder.classList.remove("display_none")
    }

    // EMAIL
    function clickPlaceholderEmail(){
      if (email === document.activeElement) 
        emailHolder.classList.add("display_none")
    }

    function checkEmptyEmail(){
      if (email != "") 
        emailHolder.classList.add("display_none")
    }

    function placeholderEmail(){
      if (email.value === "")
        emailHolder.classList.remove("display_none")
    }

    // PASSWORD
    function clickPlaceholderPassword(){
      if (password === document.activeElement) 
        passwordHolder.classList.add("display_none")
    }

    function checkEmptyPassword(){
      if (password != "")
        passwordHolder.classList.add("display_none")
    }

    function placeholderPassword(){
      if (password.value === "")
        passwordHolder.classList.remove("display_none")
    }

    return () => {
      document.removeEventListener("keydown", checkEmptyEmail);
      document.removeEventListener("keyup", placeholderEmail);
      document.removeEventListener("click", clickPlaceholderEmail);
      document.removeEventListener("keydown", checkEmptyPassword);
      document.removeEventListener("keyup", placeholderPassword);
      document.removeEventListener("click", clickPlaceholderPassword);
      document.removeEventListener("click", clickBrowser);
    }
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email: email,
        password: password,
      },
    })
      .then((response) => {
        if (response.data.errors) {
          emailError.innerHTML = response.data.errors.email;
          passwordError.innerHTML = response.data.errors.password;
        } else {
          window.location = "/";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
      <>
        <form action="" onSubmit={handleLogin} id="login-form" className="log_form" ><br /><br />
          <div>

            <div className="login_form_input_box">
              <label htmlFor="email" className="label_form">Email</label><br />
              <div className="placeholder_input" id="placeholder_email"><span className="MajGrand20">E</span>MAIL</div>
              <input type="email" name="email" id="email" className="login_form_input" onChange={(event) => setEmail(event.target.value)} value={email} />
              <div className="email error"></div>
            </div>

            <div className="login_form_input_box">
              <label htmlFor="password" className="label_form">Mot de passe</label><br />
              <div className="placeholder_input" id="placeholder_password"><span className="MajGrand20">M</span>OT DE PASSE</div>
              <input type="password" name="password" id="password" className="login_form_input" onChange={(event) => setPassword(event.target.value)} value={password} />
              <div className="password error"></div><br />
            </div>
          </div>
          
            <p><span className="MajGrand20">M</span>OT DE PASSE OUBLIÉ</p><br />

            <button type="submit" className="log_submit"><span className="MajGrand24">C</span>onnexion</button><br /><br />

            <p onClick={changeActivePage}><span className="MajGrand24">C</span>RÉER UN COMPTE</p>
        </form>
      </>
  );
}

export default Login;
