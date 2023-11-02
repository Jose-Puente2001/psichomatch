import { GET_USERS } from "../actions/action-type";
const initialState = {
  users: [],
};

const user = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: payload,
      };
    default:
      return state;
  }
};

export default user;
