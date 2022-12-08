import { Link } from "react-router-dom";
import './Welcome.css'
const Welcome = (props) => {
    return(
    <div style={{fontFamily:"sans-serif", fontSize:"large", border:"1px solid black",fontStyle:"italic" }}>
        <p>Welcome to Expense Tracker!!!</p>
        <>
    <div className="header">
    <div className="welcomeContent" >
        Welcome to Expense Tracker!!!
    </div>
    <div className="profileButton">Your Profile is Incomplete <Link to='/profile'>Complete Now?</Link></div>
    </div>
    </>
    )
}

export default Welcome;