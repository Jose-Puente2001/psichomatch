
import { GET_USERS2 } from "../actions/action-type"
const initialState = {
    users2: [],
};

const user2 = (state = initialState, { type, payload }) => {


    switch (type) {
        case GET_USERS2:
            return {
                ...state,
                users2: payload
            };


        default:
            return state;
    }
}

export default user2;