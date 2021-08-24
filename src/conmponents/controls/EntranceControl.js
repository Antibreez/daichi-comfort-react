import React, {useEffect, useState} from 'react';

import s from './Controls.module.scss'
import Input from '../Input/Input';
import Button from '../Button/Button';
import { connect } from 'react-redux';
import { entranceCheck, setEmail, setFailMessage } from '../../redux/actions/auth';

function EntranceControl(props) {
  const [value, setValue] = useState('')
  const [isFormDisabled, setFormDisable] = useState(true)
  const [isInputValid, setInputValidity] = useState(true)

  function entranceHandler(e) {
    e.preventDefault();
    if (value.match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/) === null) {
      setInputValidity(false)
    } else {
      //props.showEmailSingIn();
      props.entranceCheck(value, '111')
      //props.setEmail(value)
    }
  }

  function changeHandle(e) {
    setValue(e.target.value);
    isFormDisabled && setFormDisable(false);
    !isInputValid && setInputValidity(true);
    props.errorMessage && props.setFailMessage('');
  }

  useEffect(() => {
    props.errorMessage.length > 0 ? setInputValidity(false) : setInputValidity(true)
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
          type='text'
          label='Email или номер телефона'
          isValid={isInputValid}
          value={value}
          onChange={changeHandle}
          message={props.errorMessage.length > 0 ? props.errorMessage : 'Некорректный формат адреса Email или номера телефона'}
        />
      </div>
      <div className={s.Controls__btn}>
        <Button
          text='Продолжить'
          disabled={isFormDisabled}
          onClick={entranceHandler}
        />
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    email: state.auth.email,
    errorMessage: state.auth.errorMessage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    entranceCheck: (value, password) => dispatch(entranceCheck(value, password)),
    setEmail: (value) => dispatch(setEmail(value)),
    setFailMessage: (message) => dispatch(setFailMessage(message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntranceControl);