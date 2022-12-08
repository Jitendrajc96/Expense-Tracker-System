import classes from './ForgotPassword.module.css'
import { useRef, useState} from 'react';
import { useHistory } from 'react-router-dom';
const ForgotPassword = (props)=>{
    const [isLoading, setIsLoading] = useState(false);
    const emialInputRef  = useRef();
    const history = useHistory();
    const submitHandler = (event)=>{
        event.preventDefault();
        const enteredEmail = emialInputRef.current.value;
        setIsLoading(true);
        const response = fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA5WUH7hlBnwtKk_F6ck8WxS3FGYsJbonU',
        {
            method:'POST',
            body:JSON.stringify({
                requestType: "PASSWORD_RESET",
                email: enteredEmail
            })
        }).then(res=>{
            setIsLoading(false)
            if(res.ok){
                alert(`Reset link has been sent to ${enteredEmail}`)
                history.replace('/Login')
            }else{
                throw new Error;

            }
        }).catch(err=>{
            alert('Something Went Wrong Try Again')
            history.replace('/Login')
        }

        )

    }
    return(
        <section className={classes.auth}>
      <h1>Forgot Password</h1>

      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emialInputRef}/>
        </div>
        <div className={classes.actions}>
          <button>Change Password</button>
          {isLoading && <p> Sending Request...!</p>}
        </div>
      </form>
    </section>
    )
};
export default ForgotPassword;