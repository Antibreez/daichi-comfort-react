import cl from 'classnames';
import {connect} from 'react-redux';

import s from './Auth.module.scss';
import logo from '../../assets/images/logo-white.svg';
import EntranceControl from '../../conmponents/controls/EntranceControl';
import FormBlock from '../../conmponents/FormBlock/FormBlock';
import { showEmailSingIn, showEntrance } from '../../redux/actions/auth';
import EmailSinginControl from '../../conmponents/controls/EmailSinginControl';


function Auth(props) {

  return (
    <div className={s.Auth}>
      <div className={ cl(s.Auth__wrapper, 'wrapper') }>
        <header className={s.Auth__header}>
          <img src={logo} alt="Daichi Comfort" />
        </header>
        <main className={s.Auth__main}>
          <div className={s.Auth__formBlockOuter}>

            { false ? <button>go back</button> : null }

            <div className={s.Auth__formBlockInner}>
              {
                props.isEntrance
                  ? <FormBlock
                      title='Войдите или зарегистрируйтесь'
                      desc='Укажите E-mail или номер телефона для входа в аккаунт или регистрации в приложении'
                      hasLogo={true}
                    >
                      <EntranceControl />
                    </FormBlock>
                  : null
              }

              {
                props.isEmailSign
                  ? <FormBlock
                      title='Введите email'
                      desc='Введите пароль вашей учётной записи'
                      hasLogo={false}
                    >
                      <EmailSinginControl />
                    </FormBlock>
                  : null
              }

            </div>
          </div>
        </main>
        <footer className={s.Auth__footer}>
          <span>© Daichi 2021. Все права защищены.</span>
          <a href="#" className={s.Auth__footerRoolsLink}>Правила и условия</a>
        </footer>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    isEntrance: state.auth.isEntrance,
    isEmailSign: state.auth.isEmailSign
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showEntrance: () => dispatch(showEntrance()),
    showEmailSingIn: () => dispatch(showEmailSingIn())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);