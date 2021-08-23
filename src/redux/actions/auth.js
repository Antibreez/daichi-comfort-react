import { HAS_LOADING, NO_LOADING, SET_EMAIL, SET_FAIL_MESSAGE, SHOW_EMAIL_SING_IN, SHOW_ENTRANCE } from "./actionTypes";
import Firebase from "../../services/firebase";

const firebase = new Firebase();

function getErrorMessage(error) {
  return error.code === 'auth/wrong-password'
    ? 'Введён неверный пароль'
    : error.code === 'auth/too-many-requests'
    ? 'Слишком много неудачных попыток. Повторите позже'
    : 'Произошла ошибка'
}

export function entranceCheck(email, password) {
  return async (dispatch, getState) => {
    dispatch(addLoader());

    firebase.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res);
      }).catch(e => {
        console.log(e);
        if (e.code === 'auth/wrong-password') {
          dispatch(showEmailSingIn());
          dispatch(setEmail(email));
        } else if (e.code === 'auth/too-many-requests') {
          dispatch(setFailMessage(getErrorMessage(e)))
        } else {
          dispatch(setFailMessage('Произошла ошибка'))
        }

        // console.log('auth/user-not-found: ',e.code === 'auth/user-not-found');
        // console.log('auth/wrong-password: ',e.code === 'auth/wrong-password');
        dispatch(removeLoader());
      })
  }
}

export function signIn(password) {
  return async (dispatch, getState) => {
    const { email } = getState().auth;
    dispatch(addLoader());

    firebase.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res);
        dispatch(removeLoader());
      }).catch(e => {
        const message = e.code === 'auth/wrong-password'
          ? 'Введён неверный пароль'
          : e.code === 'auth/too-many-requests'
          ? 'Слишком много неудачных попыток. Повторите позже'
          : 'Произошла ошибка'
        dispatch(setFailMessage(message))
        dispatch(removeLoader());
        console.log(e);
      })

  }
}

export function setFailMessage(message) {
  return {
    type: SET_FAIL_MESSAGE,
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

export function addLoader() {
  return {
    type: HAS_LOADING
  }
}

export function removeLoader() {
  return {
    type: NO_LOADING
  }
}