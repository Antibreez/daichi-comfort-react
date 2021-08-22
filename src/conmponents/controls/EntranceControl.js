import React, {useState} from 'react';

import s from './Controls.module.scss'
import Input from '../Input/Input';
import Button from '../Button/Button';

function EntranceControl(props) {
  const [value, setValue] = useState('')
  const [isFormDisabled, setFormDisable] = useState(true)
  const [isInputValid, setInputValidity] = useState(true)

  function changeHandle(e) {
    setValue(e.target.value);
    isFormDisabled && setFormDisable(false);
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
        />
      </div>
      <div className={s.Controls__btn}>
        <Button
          text='Продолжить'
          disabled={isFormDisabled}
          onClick={props.onClick}
        />
      </div>
    </div>
  )
}

export default EntranceControl;