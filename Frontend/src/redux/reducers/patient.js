import { VALIDATE_PATIENT, INSERT_PATIENT } from "../actions/action-type";
const initialState = {
  patient: {},
  patientInserted: {}
};

const patient = (state = initialState, { type, payload }) => {
  switch (type) {
    case VALIDATE_PATIENT:
      return {
        ...state,
        patient: payload,
      };
    case INSERT_PATIENT: 
      return {
        ...state,
        patientInserted: payload
      }
    default:
      return state;
  }
};

export default patient;
