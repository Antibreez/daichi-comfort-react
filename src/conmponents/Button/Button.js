import s from './Button.module.scss'

function Button(props) {
  return (
    <button
      className={s.Button}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      { props.text }
    </button>
  )
}

export default Button;