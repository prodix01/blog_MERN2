import {TEST_DISPATCH} from "./Types";

export const registerUser = userData => {
    return {
        type: TEST_DISPATCH,
        payload: userData
    }
};