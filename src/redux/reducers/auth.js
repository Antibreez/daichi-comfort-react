import { SHOW_EMAIL_SING_IN, SHOW_ENTRANCE } from "../actions/actionTypes";


const initialSatate = {
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
    default:
      return state
  }
}