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
import Button from '../../conmponents/Button/Button';
import CodeControl from '../../conmponents/controls/CodeControl';


function Auth(props) {

  return (
    <div className={s.Auth}>
      <div className={ cl(s.Auth__wrapper, 'wrapper') }>
        <header className={s.Auth__header}>
          <img src={logo} alt="Daichi Comfort" />
        </header>
        <main className={s.Auth__main}>
          <div className={s.Auth__formBlockOuter}>

            { props.isEmailSign || props.isSignUp || props.isCodeSending
                ? <button 
                    className={s.Auth__goBack} aria-label='Перейти назад'
                    onClick={() => props.showEntrance()}
                  >
                  </button> 
                : null 
            }

            <div className={s.Auth__formBlockInner}>
              <div id="recaptcha-container"></div>
              { props.isLoading ? <Loader/> : null }

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

              {
                props.isEmailSent
                  ? <FormBlock
                      title='На ваш Email отправлено письмо с подтверждением'
                      desc='Следуйте инструкциям из письма, чтобы подтвердить адрес Email'
                      hasLogo={false}
                    >
                      <Button text='Вернуться к авторизации' onClick={() => props.showEntrance()}/>
                    </FormBlock>
                  : null
              }

              {
                props.isCodeSending
                  ? <FormBlock
                      title='Вход по номеру телефона'
                      desc='Мы отправили код подтверждения на номер 
                      +7 985 256-32-39'
                      hasLogo={false}
                    >
                      <CodeControl />
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
    isEmailSign: state.auth.isEmailSign,
    isSignUp: state.auth.isSignup,
    isLoading: state.auth.isLoading,
    isEmailSent: state.auth.isEmailSent,
    isCodeSending: state.auth.isCodeSending,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showEntrance: () => dispatch(showEntrance()),
    showEmailSingIn: () => dispatch(showEmailSingIn()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);