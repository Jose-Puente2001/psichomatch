
import { DELETE_CONTACT, GET_CONTACTS } from "./action-type"
import axios from "../../axios"

export const getContacts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/contacts");
      return dispatch({
        type: GET_CONTACTS,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const deleteContact = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/contact/${id}`);
      return dispatch({
        type: DELETE_CONTACT,
        payload: id,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
