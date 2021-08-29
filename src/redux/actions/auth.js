

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
} from "./actionTypes";

import firebase from "../../services/firebase";

//const firebase = new Firebase();
let confRes;
let timer;

function getErrorMessage(error) {
  return error.code === 'auth/wrong-password'
    ? 'Введён неверный пароль'
    : error.code === 'auth/too-many-requests'
    ? 'Слишком много неудачных попыток. Повторите позже'
    : error.code === 'auth/invalid-verification-code'
    ? 'Введён неверный код'
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
        } else if (e.code === 'auth/user-not-found') {
          dispatch(showEmailSingUp())
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
        console.log(firebase.auth.currentUser.emailVerified);
        if (firebase.auth.currentUser.emailVerified) {
          // SUCCESS !!!!!!!!!!!!!!!!!
      
          removeTimer();
          dispatch(setTimer(null));
          localStorage.removeItem('codeTimer');

          const uid = firebase.auth.currentUser.uid;

          dispatch(setUserUid(uid));
          localStorage.setItem('userUid', uid);
        } else {
          firebase.auth.signOut();
          dispatch(setFailMessage('Подтвердите адрес электронной почты'))
        }
        dispatch(removeLoader());
      }).catch(e => {
        const message = getErrorMessage(e)
        dispatch(setFailMessage(message))
        dispatch(removeLoader());
        console.log(e);
      })

  }
}

export function signUp(password) {
  return async (dispatch, getState) => {
    const { email } = getState().auth;
    dispatch(addLoader());

    firebase.auth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res);

        firebase.auth.currentUser.sendEmailVerification()
          .then(() => {
            firebase.auth.signOut();
            dispatch(removeLoader());
            dispatch(showEmailSent());
          });

      }).catch(e => {
        const message = getErrorMessage(e)
        dispatch(setFailMessage(message))
        dispatch(removeLoader());
        console.log(e);
      })
  }
}

export function sendPhoneCode(phone) {
  return async (dispatch, getState) => {

    dispatch(addLoader());
    window.recaptchaVerifier = firebase.getRecaptcha();

    const appVerifier = window.recaptchaVerifier;
    firebase.auth.signInWithPhoneNumber(phone, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          confRes = confirmationResult;
          dispatch(removeLoader());
          dispatch(showCodeSending());
          dispatch(setPhone(phone));
          localStorage.setItem('phone', phone);
        }).catch((error) => {
          // Error; SMS not sent
          // ...
          console.log(error);
          dispatch(removeLoader());
        });
  }
}

export function signWithPhone(code) {
  return async dispatch => {
    confRes.confirm(code).then((result) => {
      // SUCCESS
      console.log(firebase.auth.currentUser);
      
      removeTimer();
      dispatch(setTimer(null));
      localStorage.removeItem('codeTimer');

      const uid = firebase.auth.currentUser.uid;

      dispatch(setUserUid(uid));
      localStorage.setItem('userUid', uid);

    }).catch((error) => {
      const message = getErrorMessage(error);
      // User couldn't sign in (bad verification code?)
      // ...
      dispatch(setFailMessage(message))
    });
  }

}

export function makeTimer() {
  return async (dispatch, getState) => {
    if (localStorage.getItem('codeTimer')) {
      dispatch(setTimer(+localStorage.getItem('codeTimer')))
      console.log(getState().auth.timer);
  
      timer = setInterval(() => {
        let current = +localStorage.getItem('codeTimer');
        current--;
        localStorage.setItem('codeTimer', current);
        console.log(current);
  
        if (current < 0) {
          clearInterval(timer);
          localStorage.removeItem('codeTimer');
          dispatch(setTimer(null));
        } else {
          dispatch(setTimer(current))
        }
      }, 1000)
    }
  }
}

export function removeTimer() {
  return () => {
    clearInterval(timer);
  }
}

export function countDownTimer() {
  return {
    type: COUNTDOWN_TIMER
  }
}

export function setTimer(value) {
  return {
    type: SET_TIMER,
    payload: value
  }
}

export function setFailMessage(message) {
  return {
    type: SET_FAIL_MESSAGE,
    payload: message
  }
}

export function setEmail(value) {
  return {
    type: SET_EMAIL,
    payload: value
  }
}

export function setPhone(value) {
  return {
    type: SET_PHONE,
    payload: value
  }
}

export function setUserUid(value) {
  return {
    type: SET_USERUID,
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

export function showEmailSingIn() {
  return {
    type: SHOW_EMAIL_SING_IN
  }
}

export function showEmailSingUp() {
  return {
    type: SHOW_EMAIL_SING_UP
  }
}

export function showEntrance() {
  return {
    type: SHOW_ENTRANCE
  }
}

export function showEmailSent() {
  return {
    type: SHOW_EMAIL_SENT
  }
}

export function showCodeSending() {
  return {
    type: SHOW_CODE_SENDING
  }
}
