import axios from "axios";

export const GET_USERS = "GET_USERS";

export const getUsers = () => {
    return (dispatch) => {
        return axios
        .get(`${process.env.REACT_APP_API_URL}api/user`)
        .then((response) => {
            dispatch({ type: GET_USERS, payload: response.data });
        })
        .catch((error) => console.log(error));
    };
};