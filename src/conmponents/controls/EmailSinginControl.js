import React, {useState} from 'react';

import s from './Controls.module.scss'
import Input from '../Input/Input';
import Button from '../Button/Button';
import { connect } from 'react-redux';
import { signIn, setFailMessage } from '../../redux/actions/auth';
import { useEffect } from 'react';

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
    !isInputValid && setInputValidity(true);
    setFailMessage('');
  }

  useEffect(() => {
    props.errorMessage.length > 0 ? setInputValidity(false) : setInputValidity(true)
  }, [props.errorMessage])

  return (
    <div>
      <div className={s.Controls}> 
        <Input
          type='password'
          label='Пароль'
          isValid={isInputValid}
          value={value}
          onChange={changeHandle}
          message={props.errorMessage}
        />
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
    errorMessage: state.auth.errorMessage,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signIn: (password) => dispatch(signIn(password)),
    setFailMessage: (message) => dispatch(setFailMessage(message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailSigninControl);