import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from "../../store";
import './Welcome.css'
import Expenses from "./Expenses";
const Welcome = (props) => {
    dispatch = useDispatch();
    const history  = useHistory();
    function logoutHandler(){
        localStorage.clear();
        dispatch(authActions.logout())

        history.replace('/Login')

    };
    return(
        <>
    <div className="header">
    
    <Link className="profileButton" to='/profile'>PROFILE</Link>
    </div>
    <button className="logoutbtn" onClick={logoutHandler}>Log Out</button>
    <Expenses></Expenses>
    </>
    )
}
 
export default Welcome;