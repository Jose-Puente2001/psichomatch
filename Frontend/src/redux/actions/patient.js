import { VALIDATE_PATIENT, INSERT_PATIENT } from "./action-type";
import axios from "../../axios";

export const insertPatient = (patient) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/patient", patient);
      return dispatch({
        type: INSERT_PATIENT,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const validatePatient = (patient) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/patient/login", patient);
      return dispatch({
        type: VALIDATE_PATIENT,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
