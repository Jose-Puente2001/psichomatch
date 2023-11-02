
import { GET_USERS, GET_USERS2 } from "./action-type"
import axios from "../../axios"

export const getUsers = () => {
    return async (dispatch) => {
      try {
        const { data } = await axios.get("/users");
        return dispatch({
          type: GET_USERS,
          payload: data,
        });
      } catch (error) {
        console.log(error.message);
      }
    };
  };

  export const getUsers2 = () => {
    return async (dispatch) => {
      try {
        const { data } = await axios.get("/users");
        return dispatch({
          type: GET_USERS2,
          payload: data,
        });
      } catch (error) {
        console.log(error.message);
      }
    };
  };