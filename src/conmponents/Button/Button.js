import s from './Button.module.scss'

function Button(props) {
  return (
    <button
      className={s.Button}
      onClick={props.onClick}
      disabled={props.disabled}
      type={props.type || 'button'}
    >
      { props.text }
    </button>
  )
}

export default Button;