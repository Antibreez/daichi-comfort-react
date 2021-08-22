import s from './FormBlock.module.scss';
import logo from '../../assets/images/app-icon.svg';

function FormBlock(props) {
  return (
    <div className={s.FormBlock} >
      <form>
        { props.hasLogo ? <img className={s.FormBlock__icon} src={logo} alt="Daichi Comfort" /> : null }
        <h2 className={s.FormBlock__title}>{ props.title }</h2>
        <p className={s.FormBlock__desc}>{ props.desc }</p>
        <div>
          { props.children }
        </div>
      </form>
    </div>
  )
}

export default FormBlock;