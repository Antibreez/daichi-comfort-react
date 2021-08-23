import { SET_EMAIL, SET_SIGNIN_FAIL_MESSAGE, SHOW_EMAIL_SING_IN, SHOW_ENTRANCE } from "../actions/actionTypes";

const initialSatate = {
  email: null,
  password: null,
  signinFailMessage: '',
  isEntrance: true,
  isEmailSign: false
}

export default function auth(state = initialSatate, action) {
  switch (action.type) {
    case SHOW_EMAIL_SING_IN:
      return {
        ...state,
        isEntrance: false,
        isEmailSign: true
      }
    case SHOW_ENTRANCE:
      return {
        ...state,
        isEntrance: true,
        isEmailSign: false
      }
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload
      }
    case SET_SIGNIN_FAIL_MESSAGE:
      return {
        ...state,
        signinFailMessage: action.payload
      }
    default:
      return state
  }
}