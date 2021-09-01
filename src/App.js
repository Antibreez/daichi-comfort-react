import { useEffect } from 'react';
import { connect } from 'react-redux';
import Auth from './pages/Auth/Auth';
import { setUserUid } from './redux/actions/auth';
import HomePage from './pages/HomePage/HomePage';
import { useState } from 'react';

function App(props) {
  const [isLoaded, setLoaded] = useState(false)

  useEffect(() => {
    const localUserUid = localStorage.getItem('userUid');
    const userUid = localUserUid ? localUserUid : null;

    props.setUserUid(userUid);
    setLoaded(true);
  }, []);


  return (
    <>
      { 
        isLoaded 
          ? null 
          : <div className="preloader">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div> 
      }

      {
        props.userUid
          ? <HomePage/>
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
