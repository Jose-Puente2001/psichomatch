import {GET_COUNTRIES, SELECTED_COUNTRY} from "./action-type";
import axios from "../../axios";

export const getCountries = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `/country`
      );
      return dispatch({
        type: GET_COUNTRIES,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export function selectedCountry(status) {
    return {
      type: SELECTED_COUNTRY,
      payload: status,
    };
  }