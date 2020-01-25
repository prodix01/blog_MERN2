import {GET_ERRORS, SET_CURRENT_USER} from "./Types";
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

export const registerUser = (userData, history) => dispatch => {
    axios
        .post("/users/register", userData)
        .then(res => history.push("/login"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const loginUser = (userData, history) => dispatch => {
    axios
        .post("/users/login", userData)
        .then(res => {
            //토큰 상수화
            const {token} = res.data;
            //Set token to ls
            localStorage.setItem("jwtToken", token);
            //Set token to auth header
            setAuthToken(token);

            //Decode token to get user data
            const decode = jwt_decode(token);

            //set current user
            dispatch(SET_CURRENT_USER(decode));

        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

//Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};


//log user out
export const logoutUser = () => dispatch => {
    //remove token from localStorage
    localStorage.removeItem("jwtToken");

    setAuthToken(false);

    dispatch(setCurrentUser({}));
};