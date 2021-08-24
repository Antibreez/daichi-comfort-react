import React, {useState} from 'react';

import s from './Controls.module.scss'
import Input from '../Input/Input';
import Button from '../Button/Button';
import { connect } from 'react-redux';
import { setFailMessage, signUp } from '../../redux/actions/auth';
import { useEffect } from 'react';

function EmailSignupControl(props) {
  const [values, setValues] = useState({
    value1: '',
    value2: ''
  })
  const [isFirstInputValid, setFirstInputValidity] = useState(true)
  const [isSecondInputValid, setSecondInputValidity] = useState(true)
  const [isFormDisabled, setFormDisable] = useState(true)

  function singinHandler(e) {
    e.preventDefault();
    if (values.value1.length < 5) {
      setFirstInputValidity(false);
      return
    }

    if (values.value1 !== values.value2) {
      setSecondInputValidity(false);
      return
    }

    props.signUp(values.value2)
  }

  function changeHandle(e, control) {
    
    const newValues = {...values};
    newValues[control] = e.target.value;
    setValues(newValues)
    
    isFormDisabled && setFormDisable(false);
    !isFirstInputValid && setFirstInputValidity(true);
    !isSecondInputValid && setSecondInputValidity(true);
    props.errorMessage && props.setFailMessage('');
  }

  useEffect(() => {
    props.errorMessage.length > 0 ? setSecondInputValidity(false) : setSecondInputValidity(true)
  }, [props.errorMessage])

  useEffect(() => {
    return () => {
      props.setFailMessage('')
    }
  }, [])

  return (
    <div>
      <div className={s.Controls}> 
        <Input
          type='password'
          label='Пароль'
          isValid={isFirstInputValid}
          value={values.value1}
          onChange={(e) => changeHandle(e, 'value1')}
          message={'Пароль должен содержать не менее 5 символов'}
        />
        <Input
          type='password'
          label='Подтверждение пароля'
          isValid={isSecondInputValid}
          value={values.value2}
          onChange={(e) => changeHandle(e, 'value2')}
          message={props.errorMessage.length > 0 ? props.errorMessage : 'Пароли не совпадают'}
        />
      </div>
      <div className={s.Controls__btn}>
        <Button
          text='Зарегистрироваться'
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
    signUp: (password) => dispatch(signUp(password)),
    setFailMessage: (message) => dispatch(setFailMessage(message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailSignupControl);