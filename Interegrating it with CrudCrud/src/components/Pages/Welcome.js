import { Link, useHistory } from "react-router-dom";
import './Welcome.css'
import Expenses from "./Expenses";
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
    <Expenses></Expenses>

    </>
    )
}
 
export default Welcome;