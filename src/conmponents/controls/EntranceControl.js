import React, {useState} from 'react';

import s from './Controls.module.scss'
import Input from '../Input/Input';
import Button from '../Button/Button';
import { connect } from 'react-redux';
import { showEntrance, showEmailSingIn, entranceCheck, setEmail } from '../../redux/actions/auth';

function EntranceControl(props) {
  const [value, setValue] = useState('')
  const [isFormDisabled, setFormDisable] = useState(true)
  const [isInputValid, setInputValidity] = useState(true)

  function entranceHandler(e) {
    e.preventDefault();
    if (value.match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/) === null) {
      setInputValidity(false)
    } else {
      props.showEmailSingIn();
      props.entranceCheck(value, '12345')
      props.setEmail(value)
    }
  }

  function changeHandle(e) {
    setValue(e.target.value);
    isFormDisabled && setFormDisable(false);
    !isInputValid && setInputValidity(true)
  }

  return (
    <div>
      <div className={s.Controls}>
        <Input
          type='text'
          label='Email или номер телефона'
          isValid={isInputValid}
          value={value}
          onChange={changeHandle}
          message='Некорректный формат адреса Email или номера телефона'
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
    isEntrance: state.auth.isEntrance,
    isEmailSign: state.auth.isEmailSign,
    email: state.auth.email
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showEntrance: () => dispatch(showEntrance()),
    showEmailSingIn: () => dispatch(showEmailSingIn()),
    entranceCheck: (value, password) => dispatch(entranceCheck(value, password)),
    setEmail: (value) => dispatch(setEmail(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntranceControl);