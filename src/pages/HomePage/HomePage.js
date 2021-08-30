import { connect } from "react-redux"
import { setUserUid } from "../../redux/actions/auth";
import firebase from '../../services/firebase';

function HomePage(props) {

    const { setUserUid } = props;

    function logOutHandle() {
        setUserUid(null);
        localStorage.removeItem('userUid');
        firebase.signOut();
    }

    return (
        <>
            <button onClick={logOutHandle}>Log Out</button>
        </>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        setUserUid: (value) => dispatch(setUserUid(value)),
    }
}

export default connect(null, mapDispatchToProps)(HomePage);