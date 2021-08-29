import { 
  COUNTDOWN_TIMER,
  HAS_LOADING, 
  NO_LOADING, 
  SET_EMAIL, 
  SET_FAIL_MESSAGE, 
  SET_PHONE, 
  SET_TIMER, 
  SET_USERUID, 
  SHOW_CODE_SENDING, 
  SHOW_EMAIL_SENT, 
  SHOW_EMAIL_SING_IN, 
  SHOW_EMAIL_SING_UP, 
  SHOW_ENTRANCE 
} from "../actions/actionTypes";

const initialSatate = {
  userUid: null,
  email: null,
  password: null,
  errorMessage: '',
  phone: null,
  timer: null,
  isLoading: false,
  isEntrance: true,
  isEmailSign: false,
  isSignup: false,
  isEmailSent: false,
  isCodeSending: false,
}

export default function auth(state = initialSatate, action) {
  switch (action.type) {
    case SHOW_EMAIL_SING_IN:
      return {
        ...state,
        isEntrance: false,
        isEmailSign: true,
        isSignup: false,
        isEmailSent: false,
        isCodeSending: false,
      }
    case SHOW_EMAIL_SING_UP:
      return {
        ...state,
        isEntrance: false,
        isEmailSign: false,
        isSignup: true,
        isEmailSent: false,
        isCodeSending: false,
      }
    case SHOW_ENTRANCE:
      return {
        ...state,
        isEntrance: true,
        isEmailSign: false,
        isSignup: false,
        isEmailSent: false,
        isCodeSending: false,
      }
    case SHOW_EMAIL_SENT:
      return {
        ...state,
        isEntrance: false,
        isEmailSign: false,
        isSignup: false,
        isEmailSent: true,
        isCodeSending: false,
      }
    case SHOW_CODE_SENDING:
      return {
        ...state,
        isEntrance: false,
        isEmailSign: false,
        isSignup: false,
        isEmailSent: false,
        isCodeSending: true,
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
    case SET_PHONE:
      return {
        ...state,
        phone: action.payload
      }
    case SET_USERUID:
      return {
        ...state,
        userUid: action.payload,
        email: null,
        password: null,
        errorMessage: '',
        phone: null,
        timer: null,
        isLoading: false,
        isEntrance: true,
        isEmailSign: false,
        isSignup: false,
        isEmailSent: false,
        isCodeSending: false,
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
    case COUNTDOWN_TIMER:
      return {
        ...state,
        timer: state.timer--
      }
    case SET_TIMER:
      return {
        ...state,
        timer: action.payload
      }
    default:
      return state
  }
}