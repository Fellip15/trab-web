import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const baseURL = "http://localhost:5300";

export const authToken = async (userCookie, callbackSucess, callbackError) => {
    await axios.post(baseURL + "/users/token", {
        token: userCookie
    })
    .then(callbackSucess)
    .catch(callbackError);
};