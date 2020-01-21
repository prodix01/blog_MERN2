import {GET_ERRORS} from "./Types";
import axios from "axios";

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