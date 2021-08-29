import React, {useEffect, useState} from 'react';

import s from './Controls.module.scss'
import Input from '../Input/Input';
import Button from '../Button/Button';
import { connect } from 'react-redux';
import { sendPhoneCode, setFailMessage, signWithPhone } from '../../redux/actions/auth';

function CodeControl(props) {
    const [value, setValue] = useState('')
    const [isFormDisabled, setFormDisable] = useState(true)
    const [isInputValid, setInputValidity] = useState(true)

    function changeHandle(e) {
        setValue(e.target.value);
        e.target.value.length === 6 && setFormDisable(false);
        e.target.value.length !== 6 && !isFormDisabled && setFormDisable(true)
        !isInputValid && setInputValidity(true);
        props.errorMessage && props.setFailMessage('');
    }

    function codeSubmitControl(e) {
        e.preventDefault();
        props.signWithPhone(value);
    }

    function codeRepeatHandle() {
      props.sendPhoneCode(props.phone);
    }

    useEffect(() => {
      props.errorMessage.length > 0 ? setInputValidity(false) : setInputValidity(true)
    }, [props.errorMessage])
  
    useEffect(() => {
      return () => {
        props.setFailMessage('')
      }
    }, [])// eslint-disable-line react-hooks/exhaustive-deps
    
    return (
        <div>
          <div className={s.Controls}>
              <Input
              type='text'
              label='Код подтверждения'
              isValid={isInputValid}
              value={value}
              onChange={changeHandle}
              message={props.errorMessage}
              />
          </div>
          <div className={s.Controls__btn}>
              <Button
                  type='submit'
                  text='Войти'
                  disabled={isFormDisabled}
                  onClick={codeSubmitControl}
              />
          </div>
          <button
            onClick={ codeRepeatHandle }
            disabled={ props.timer ? true : false }
          >
            Получить код повторно
          </button>

          { props.timer ? <span>{ props.timer }</span> : null }
        </div>
    )
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage,
    timer: state.auth.timer,
    phone: state.auth.phone,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setFailMessage: (message) => dispatch(setFailMessage(message)),
    signWithPhone: (code) => dispatch(signWithPhone(code)),
    sendPhoneCode: (phone) => dispatch(sendPhoneCode(phone)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeControl);