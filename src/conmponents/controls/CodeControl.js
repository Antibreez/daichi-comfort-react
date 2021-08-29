import React, {useEffect, useState} from 'react';

import s from './Controls.module.scss'
import Input from '../Input/Input';
import Button from '../Button/Button';
import { connect } from 'react-redux';
import { setFailMessage, signWithPhone } from '../../redux/actions/auth';

function CodeControl(props) {
    const [value, setValue] = useState('')
    const [isFormDisabled, setFormDisable] = useState(true)
    const [isInputValid, setInputValidity] = useState(true)

    function changeHandle(e) {
        console.log(e.target.value);
        setValue(e.target.value);
        console.log(value.length);
        e.target.value.length === 6 && setFormDisable(false);
        e.target.value.length !== 6 && !isFormDisabled && setFormDisable(true)
        !isInputValid && setInputValidity(true);
        props.errorMessage && props.setFailMessage('');
    }

    function codeSubmitControl(e) {
        e.preventDefault();
        props.signWithPhone(value);
    }
    
    return (
        <div>
        <div className={s.Controls}>
            <Input
            type='text'
            label='Код подтверждения'
            isValid={isInputValid}
            value={value}
            onChange={changeHandle}
            message={''}
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
        </div>
    )
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setFailMessage: (message) => dispatch(setFailMessage(message)),
    signWithPhone: (code) => dispatch(signWithPhone(code))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeControl);