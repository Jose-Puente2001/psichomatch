import { GET_COUNTRIES, SELECTED_COUNTRY } from "../actions/action-type";
const initialState = {
    countries: [],
    selectedCountry: ""
};

const country = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: payload,
      };

      case SELECTED_COUNTRY:
      return {
        ...state,
        selectedCountry: payload,
      };
    
    default:
      return state;
  }
};

export default country;
