import cl from 'classnames';
import {connect} from 'react-redux';

import s from './Auth.module.scss';
import logo from '../../assets/images/logo-white.svg';
import EntranceControl from '../../conmponents/controls/EntranceControl';
import FormBlock from '../../conmponents/FormBlock/FormBlock';
import { showEmailSingIn, showEntrance } from '../../redux/actions/auth';
import EmailSinginControl from '../../conmponents/controls/EmailSinginControl';
import Loader from '../../conmponents/Loader/Loader';
import EmailSingupControl from '../../conmponents/controls/EmailSingupControl';


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
              { props.isLoading ? <Loader/> : null }


              {console.log(props)}
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
                      title='Вход через Email'
                      desc='Введите пароль вашей учётной записи'
                      hasLogo={false}
                    >
                      <EmailSinginControl />
                    </FormBlock>
                  : null
              }

              {
                props.isSignUp
                  ? <FormBlock
                      title='Регистрация через Email'
                      desc='Введите пароль и подтверждение пароля для регистрации'
                      hasLogo={false}
                    >
                      <EmailSingupControl />
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
  console.log(state);
  return {
    isEntrance: state.auth.isEntrance,
    isEmailSign: state.auth.isEmailSign,
    isSignUp: state.auth.isSignup,
    isLoading: state.auth.isLoading,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showEntrance: () => dispatch(showEntrance()),
    showEmailSingIn: () => dispatch(showEmailSingIn())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);