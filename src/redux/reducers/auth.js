import { HAS_LOADING, NO_LOADING, SET_EMAIL, SET_FAIL_MESSAGE, SHOW_EMAIL_SING_IN, SHOW_EMAIL_SING_UP, SHOW_ENTRANCE } from "../actions/actionTypes";

const initialSatate = {
  email: null,
  password: null,
  errorMessage: '',
  isLoading: false,
  isEntrance: true,
  isEmailSign: false,
  isSignup: false,
}

export default function auth(state = initialSatate, action) {
  switch (action.type) {
    case SHOW_EMAIL_SING_IN:
      return {
        ...state,
        isEntrance: false,
        isEmailSign: true,
        isSignup: false,
      }
    case SHOW_EMAIL_SING_UP:
      return {
        ...state,
        isEntrance: false,
        isEmailSign: false,
        isSignup: true,
      }
    case SHOW_ENTRANCE:
      return {
        ...state,
        isEntrance: true,
        isEmailSign: false,
        isSignup: false,
      }
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload
      }
    case SET_FAIL_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload
      }
    case HAS_LOADING:
      return {
        ...state,
        isLoading: true
      }
      case NO_LOADING:
        return {
          ...state,
          isLoading: false
        }
    default:
      return state
  }
}