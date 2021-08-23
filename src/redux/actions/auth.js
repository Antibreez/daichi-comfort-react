import { SET_EMAIL, SET_SIGNIN_FAIL_MESSAGE, SHOW_EMAIL_SING_IN, SHOW_ENTRANCE } from "./actionTypes";
import Firebase from "../../services/firebase";

const firebase = new Firebase();

export function entranceCheck(email, password) {
  return async dispatch => {
    firebase.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res);
      }).catch(e => {
        console.log('auth/user-not-found: ',e.code === 'auth/user-not-found');
        console.log('auth/wrong-password: ',e.code === 'auth/wrong-password');
      })
  }
}

export function signIn(password) {
  return async (dispatch, getState) => {
    const { email } = getState().auth;

    firebase.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res);
      }).catch(e => {
        const message = e.code === 'auth/wrong-password'
          ? 'Введён неверный пароль'
          : e.code === 'auth/too-many-requests'
          ? 'Слишком много неудачных попыток. Повторите позже'
          : 'Произошла ошибка'
        dispatch(setSigninFailMessage(message))
        console.log(e);
      })

  }
}

export function setSigninFailMessage(message) {
  return {
    type: SET_SIGNIN_FAIL_MESSAGE,
    payload: message
  }
}

export function showEmailSingIn() {
  return {
    type: SHOW_EMAIL_SING_IN
  }
}

export function showEntrance() {
  return {
    type: SHOW_ENTRANCE
  }
}

export function setEmail(value) {
  return {
    type: SET_EMAIL,
    payload: value
  }
}