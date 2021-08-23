import React, {useState} from 'react';

import s from './Controls.module.scss'
import Input from '../Input/Input';
import Button from '../Button/Button';
import { connect } from 'react-redux';
import { signIn, setSigninFailMessage } from '../../redux/actions/auth';

function EmailSigninControl(props) {
  const [value, setValue] = useState('')
  const [isFormDisabled, setFormDisable] = useState(true)
  const [isInputValid, setInputValidity] = useState(true)

  function singinHandler(e) {
    e.preventDefault();
    props.signIn(value)
  }

  function changeHandle(e) {
    setValue(e.target.value);
    isFormDisabled && setFormDisable(false);
    // !isInputValid && setInputValidity(true)
    props.signinFailMessage.length > 0 && props.setSigninFailMessage('')
  }

  return (
    <div>
      <div className={s.Controls}>
        { props.signinFailMessage.length > 0 
            ? <Input
                type='password'
                label='Email'
                isValid={false}
                value={value}
                onChange={changeHandle}
                message={props.signinFailMessage}
              />
            : <Input
                type='password'
                label='Email'
                isValid={true}
                value={value}
                onChange={changeHandle}
                message={props.signinFailMessage}
              />
        }

        
      </div>
      <div className={s.Controls__btn}>
        <Button
          text='Войти'
          disabled={isFormDisabled}
          onClick={singinHandler}
        />
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    signinFailMessage: state.auth.signinFailMessage,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signIn: (password) => dispatch(signIn(password)),
    setSigninFailMessage: (message) => dispatch(setSigninFailMessage(message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailSigninControl);