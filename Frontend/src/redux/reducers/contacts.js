import { DELETE_CONTACT, GET_CONTACTS } from "../actions/action-type";
const initialState = {
  contacts: [],
};

const contact = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: payload,
      };
    case DELETE_CONTACT: 
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== payload)
      }
    default:
      return state;
  }
};

export default contact;
