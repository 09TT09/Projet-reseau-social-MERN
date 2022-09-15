import React, { useState, useEffect } from "react";
import axios from "axios";
import Login from "./login";

const SignUp = ({changeActivePage}) => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  useEffect(() => {
    document.getElementById("pseudo").addEventListener("keydown", checkEmptyPseudo);
    document.getElementById("pseudo").addEventListener("keyup", placeholderPseudo);
    document.getElementById("pseudo").addEventListener("click", clickPlaceholderPseudo);

    document.getElementById("email").addEventListener("keydown", checkEmptyEmail);
    document.getElementById("email").addEventListener("keyup", placeholderEmail);
    document.getElementById("email").addEventListener("click", clickPlaceholderEmail);

    document.getElementById("password").addEventListener("keydown", checkEmptyPassword);
    document.getElementById("password").addEventListener("keyup", placeholderPassword);
    document.getElementById("password").addEventListener("click", clickPlaceholderPassword);

    document.getElementById("password-conf").addEventListener("keydown", checkEmptyPasswordConf);
    document.getElementById("password-conf").addEventListener("keyup", placeholderPasswordConf);
    document.getElementById("password-conf").addEventListener("click", clickPlaceholderPasswordConf);

    document.addEventListener("click", clickBrowser);

    const pseudo = document.getElementById("pseudo")
    const pseudoHolder = document.getElementById("placeholder_pseudo")
    const email = document.getElementById("email")
    const emailHolder = document.getElementById("placeholder_email")
    const password = document.getElementById("password")
    const passwordHolder = document.getElementById("placeholder_password")
    const passwordConf = document.getElementById("password-conf")
    const passwordConfHolder = document.getElementById("placeholder_password_conf")

    // BROWSER
    function clickBrowser(){
      if (pseudo != document.activeElement && pseudo.value === "")
        pseudoHolder.classList.remove("display_none")
      if (email != document.activeElement && email.value === "")
        emailHolder.classList.remove("display_none")
      if (password != document.activeElement && password.value === "")
        passwordHolder.classList.remove("display_none")
      if (passwordConf != document.activeElement && passwordConf.value === "")
        passwordConfHolder.classList.remove("display_none")
    }

    // PSEUDO
    function clickPlaceholderPseudo(){
      if (pseudo === document.activeElement) 
        pseudoHolder.classList.add("display_none")
    }

    function checkEmptyPseudo(){
      if (pseudo != "") 
        pseudoHolder.classList.add("display_none")
    }

    function placeholderPseudo(){
      if (pseudo.value === "")
        pseudoHolder.classList.remove("display_none")
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

    // PASSWORD CONFIRMED
    function clickPlaceholderPasswordConf(){
      if (passwordConf === document.activeElement) 
        passwordConfHolder.classList.add("display_none")
    }

    function checkEmptyPasswordConf(){
      if (passwordConf != "")
        passwordConfHolder.classList.add("display_none")
    }

    function placeholderPasswordConf(){
      if (passwordConf.value === "")
        passwordConfHolder.classList.remove("display_none")
    }

    return () => {
      document.removeEventListener("keydown", checkEmptyPseudo);
      document.removeEventListener("keyup", placeholderPseudo);
      document.removeEventListener("click", clickPlaceholderPseudo);
      document.removeEventListener("keydown", checkEmptyEmail);
      document.removeEventListener("keyup", placeholderEmail);
      document.removeEventListener("click", clickPlaceholderEmail);
      document.removeEventListener("keydown", checkEmptyPassword);
      document.removeEventListener("keyup", placeholderPassword);
      document.removeEventListener("click", clickPlaceholderPassword);
      document.removeEventListener("keydown", checkEmptyPasswordConf);
      document.removeEventListener("keyup", placeholderPasswordConf);
      document.removeEventListener("click", clickPlaceholderPasswordConf);
      document.removeEventListener("click", clickBrowser);
    }

  }, []);

  const handleRegister = async (event) => {
    event.preventDefault();
    const terms = document.getElementById("terms");
    const pseudoError = document.querySelector(".pseudo.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );
    const termsError = document.querySelector(".terms.error");

    passwordConfirmError.innerHTML = "";
    termsError.innerHTML = "";

    if (password != controlPassword || !terms.checked) {
      if (password != controlPassword)
        passwordConfirmError.innerHTML =
          "Les mots de passe ne correspondent pas";
      if (!terms.checked)
        termsError.innerHTML =
          "Les conditions générales d'utilisation n'ont pas été acceptées";
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          pseudo,
          email,
          password,
        },
      })
        .then((response) => {
          console.log(response);
          if (response.data.errors) {
            pseudoError.innerHTML = response.data.errors.pseudo;
            emailError.innerHTML = response.data.errors.email;
            passwordError.innerHTML = response.data.errors.password;
          } else {
            setFormSubmit(true);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <Login />
          <span></span>
          <h4 className="success">Enregistrement réussi, veuillez vous connecter</h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form" className="log_form">
          <div>
            <div className="login_form_input_box">
              <label htmlFor="pseudo" className="label_form">Pseudo</label><br />
              <div className="placeholder_input" id="placeholder_pseudo"><span className="MajGrand20">P</span>SEUDO</div>
              <input type="text" name="pseudo" id="pseudo" className="login_form_input" onChange={(event) => setPseudo(event.target.value)} value={pseudo} />
              <div className="pseudo error"></div>
            </div>

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
              <div className="password error"></div>
            </div>

            <div className="login_form_input_box">
              <label htmlFor="password-conf" className="label_form">Confirmer le mot de passe</label><br />
              <div className="placeholder_input" id="placeholder_password_conf"><span className="MajGrand20">C</span>ONFIRMER MOT DE PASSE</div>
              <input type="password" name="password-conf" id="password-conf" className="login_form_input" onChange={(event) => setControlPassword(event.target.value)} value={controlPassword} />
              <div className="password-confirm error"></div><br />
            </div>

            <input type="checkbox" id="terms" />
            <label htmlFor="terms">J'accepte les{" "}<a href="/" target="_blank" rel="noopener noreferrer">{" "}conditions générales</a></label>
            <div className="terms error"></div><br />
          </div>

          <button type="submit" className="log_submit"><span className="MajGrand24">I</span>nscription</button><br /><br />

          <p onClick={changeActivePage}><span className="MajGrand24">S</span>E CONNECTER</p>
        </form>
      )}
    </>
  );
}

export default SignUp;
