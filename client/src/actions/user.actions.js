import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";

export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
      .then((response) => {
        dispatch({ type: GET_USER, payload: response.data });
      })
      .catch((error) => console.log(error));
  };
};

export const uploadPicture = (data, id) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
      .then((response) => {
        return axios.get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
        .then((response) => {
          dispatch({
            type: UPLOAD_PICTURE,
            payload: response.data.picture
          })
        })
      })
      .catch((error) => console.log(error));
  }
}

export const updateBio = (userId, bio) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/${userId}`,
      data: {bio}
    })
    .then((response) => {
      dispatch({ type: UPDATE_BIO, payload:bio })
    })
    .catch((error) => console.log(error))
  }
}