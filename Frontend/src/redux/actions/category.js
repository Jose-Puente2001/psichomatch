import {GET_CATEGORIES, SELECTED_CATEGORY} from "./action-type";
import axios from "../../axios";

export const getCategories = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `/category`
      );
      return dispatch({
        type: GET_CATEGORIES,
        payload: data,
      });
    } catch (error) {
      console.log("testestse")
      console.log(error.message);
    }
  };
};


export function selectedCategory(status) {
    return {
      type: SELECTED_CATEGORY,
      payload: status,
    };
  }


