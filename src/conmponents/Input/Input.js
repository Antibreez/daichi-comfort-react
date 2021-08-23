import React, {useState} from 'react';
import cl from 'classnames';

import s from './Input.module.scss';

function Input(props) {
  const [isFocused, setFocuse] = useState(false);

  const inputType = props.type || 'text';
  const htmlFor = `${inputType}-${Math.random()}`;
  const errorMessage = props.message || 'Введите верное значение'

  return (
    <div className={ cl(s.Input, {[s.invalid] : !props.isValid})}>
      <label className={ cl({[s.isEmpty] : !isFocused}) } htmlFor={htmlFor}>{ props.label }</label>
      <input 
        type={inputType}
        id={htmlFor}
        onChange={props.onChange}
        onFocus={() => setFocuse(true)}
        onBlur={() => props.value.trim() === '' && setFocuse(false)}
        value={props.value}
      />

      { !props.isValid ? <p className={s.Input__message}>{ errorMessage }</p> : null }
    </div>
  )
}

export default Input;