import { Link } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";
import './Welcome.css'
const Welcome = (props) => {
    const history  = useHistory();
    function logoutHandler(){
        localStorage.clear();
        history.replace('/Login')

    };
    return(
        <>
    <div className="header">
    <div className="welcomeContent" >
        Welcome to Expense Tracker!!!
    </div>
    <div className="profileButton">Your Profile is Incomplete <Link to='/profile'>Complete Now?</Link></div>
    </div>
    <button onClick={logoutHandler}>Log Out</button>
    </>
    )
}
 
export default Welcome;