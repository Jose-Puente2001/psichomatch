import { GET_CATEGORIES, SELECTED_CATEGORY } from "../actions/action-type";
const initialState = {
  categories: [],
  selectedCategory: ""
};

const category = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload,
      };

      case SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: payload,
      };
    
    default:
      return state;
  }
};



export default category;
