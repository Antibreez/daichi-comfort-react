

import { 
  HAS_LOADING, 
  NO_LOADING, 
  SET_EMAIL, 
  SET_FAIL_MESSAGE, 
  SHOW_CODE_SENDING, 
  SHOW_EMAIL_SENT, 
  SHOW_EMAIL_SING_IN, 
  SHOW_EMAIL_SING_UP, 
  SHOW_ENTRANCE 
} from "./actionTypes";

import Firebase from "../../services/firebase";

const firebase = new Firebase();
let confRes;

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
  return async dispatch => {
    dispatch(addLoader());
    window.recaptchaVerifier = firebase.getRecaptcha();

    const appVerifier = window.recaptchaVerifier;
    firebase.auth.signInWithPhoneNumber(phone, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          confRes = confirmationResult;
          console.log(confRes);
          dispatch(removeLoader());
          dispatch(showCodeSending());
          // ...
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
      // User signed in successfully.
      console.log(result.user);
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
      console.log(error);
    });
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
