import { useEffect } from 'react';
import { connect } from 'react-redux';
import Auth from './pages/Auth/Auth';
import { setUserUid } from './redux/actions/auth';

function App(props) {
  useEffect(() => {
    const localUserUid = localStorage.getItem('userUid');
    const userUid = localUserUid ? localUserUid : null;

    setUserUid(userUid);
  }, []);


  return (
    <>
      {
        props.userUid
          ? null
          : <Auth/>
      }
    </>
  );
}

function mapStateToProps(state) {
  return {
    userUid: state.auth.userUid,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setUserUid: (value) => dispatch(setUserUid(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
