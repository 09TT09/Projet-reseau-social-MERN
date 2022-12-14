import React, { useState } from "react";
import LeftNav from "../LeftNav";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./uploadImg";
import { updateBio } from "../../actions/user.actions";
import { dateParser } from "../Utils";

const UpdateProfil = () => {
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();
  const [followingPopup, setFollowingPopup] = useState(false);
  const [followersPopup, setFollowersPopup] = useState(false);

  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio));
    setUpdateForm(false);
  };

  return (
    <div className="profil-container">
      <LeftNav />
      <h1> Profil de {userData.pseudo}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img
            src={userData.picture}
            width="200"
            height="200"
            alt="user-profil"
          />
          <UploadImg />
        </div>
        <div>
          <div>
            <h3>Bio</h3>
            {updateForm === false && (
              <>
                <p onClick={() => setUpdateForm(!updateForm)}></p>
                <button onClick={() => setUpdateForm(!updateForm)}>
                  Modifier Bio
                </button>
              </>
            )}
            {updateForm && (
              <>
                <textarea
                  type="text"
                  defaultValue={userData.bio}
                  onChange={(event) => setBio(event.target.value)}
                ></textarea>
                <button onClick={handleUpdate}>Valider modifications</button>
              </>
            )}
          </div>
          <h4>Membre depuis le : {dateParser(userData.createdAt)}</h4>
          <h5 onClick={() => setFollowingPopup(true)}>
            Abonnements : {userData.following ? userData.following.length : ""}
          </h5>
          <h5 onClick={() => setFollowersPopup(true)}>
            Abonn??es : {userData.followers ? userData.followers.length : ""}
          </h5>
        </div>
      </div>
      {followingPopup && (
        <div className="popup-profil-container">
          <div>
            <h3>Abonnements</h3>
            <span className="cross" onClick={() => setFollowingPopup(false)}>
              &#10005;
            </span>
          </div>
          <span>
            {usersData.map((user) => {
              for (let i = 0; i < userData.following.length; i++) {
                if (user._id === userData.following[i]) {
                  return (
                    <li key={user._id}>
                      <img src={user.picture} alt={user.pseudo} />
                      <h4>{user.pseudo}</h4>
                      <h1>FOLLOW HANDLER</h1>
                    </li>
                  );
                }
              }
            })}
          </span>
        </div>
      )}

{followersPopup && (
        <div className="popup-profil-container">
          <div>
            <h3>Abonn??es</h3>
            <span className="cross" onClick={() => setFollowersPopup(false)}>
              &#10005;
            </span>
          </div>
          <span>
            {usersData.map((user) => {
              for (let i = 0; i < userData.followers.length; i++) {
                if (user._id === userData.followers[i]) {
                  return (
                    <li key={user._id}>
                      <img src={user.picture} alt={user.pseudo} />
                      <h4>{user.pseudo}</h4>
                      <h1>FOLLOW HANDLER</h1>
                    </li>
                  );
                }
              }
            })}
          </span>
        </div>
      )}
    </div>
  );
};

export default UpdateProfil;
