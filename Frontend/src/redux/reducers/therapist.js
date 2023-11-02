import { GET_THERAPIST_BY_ID, GET_THERAPIST_PER_PAGE, FILTER_STATUS, SEARCH_STATUS, FILTER_THERAPIST, SEARCH_THERAPIST, SEARCH_VALUE, INSERT_THERAPIST, LOGIN_THERAPIST, UPDATE_THERAPIST } from "../actions/action-type";
const initialState = {
  therapists: [],
  therapist: {},
  filterTherapists: [],
  filterStatus: false,
  searchStatus: false,
  search: "",
  login: "",
  created:{},
  updated:{}
};

const therapist = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_THERAPIST_BY_ID:
      return {
        ...state,
        therapist: payload,
      };
    case GET_THERAPIST_PER_PAGE: 
      return {
        ...state,
        therapists: payload
      }
      case FILTER_STATUS:
        return{
            ...state,
            filterStatus: payload
        }

        case SEARCH_STATUS:
        return{
            ...state,
            searchStatus: payload
        }

        case FILTER_THERAPIST:
            return{
                ...state,
                therapists: payload
            }

        case SEARCH_THERAPIST:
          return{
            ...state,
            therapists: payload
          }

          case SEARCH_VALUE:
            return{
              ...state,
              search: payload

            }

            case INSERT_THERAPIST:
              return{
                ...state,
                created: payload
              }

              case LOGIN_THERAPIST:
                return{
                  ...state,
                  login: payload
                }
                case UPDATE_THERAPIST:
                  return{
                    ...state,
                    updated: payload
                  }
    default:
      return state;
  }
};

export default therapist;
