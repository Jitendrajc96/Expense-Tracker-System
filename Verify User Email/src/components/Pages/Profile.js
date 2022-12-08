import './Profile.css'
import { useRef, useEffect, useState } from 'react';
const Profile = (props)=>{

    const nameInputRef = useRef();
    const linkInputRef = useRef();
    const  [notVerified, setNotVerified] = useState(true);
    const  [userName,setuserName] = useState('')
    const [link, setLink]  = useState('');

    async function getBackData(){
        console.log('Async Function')
        const response =  await  fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyA5WUH7hlBnwtKk_F6ck8WxS3FGYsJbonU',
        {
            method:'POST',
            body:JSON.stringify({
                idToken:localStorage.getItem('token') 
            })
        })

        const data = await response.json()
        const userData = data.users;
        console.log(userData)
        console.log(data)
        setuserName(userData[0].displayName)
        setLink(userData[0].photoUrl)
        userData[0].emailVerified && setNotVerified(false)



    } 
    useEffect(()=>{
        getBackData()
    },[])





    const profileDataHandler = (event)=>{
        event.preventDefault();
        console.log('Clicked')
        const enteredName = nameInputRef.current.value;
        const enteredLink  = linkInputRef.current.value;
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA5WUH7hlBnwtKk_F6ck8WxS3FGYsJbonU',
        {
            method:'POST',
            body:JSON.stringify({
                idToken: localStorage.getItem('token'),
                displayName:enteredName,
                photoUrl:enteredLink,
                returnSecureToken:true
            })
        }).then(res=>{console.log(res)}).then(()=>{
            fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyA5WUH7hlBnwtKk_F6ck8WxS3FGYsJbonU',
            {
                method:'POST',
                body:JSON.stringify({
                    idToken:localStorage.getItem('token') 
                })
            }).then(res=>{console.log(res.json())})
        })


    };

    const verifyEmailHandler =()=>{
        const response = fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA5WUH7hlBnwtKk_F6ck8WxS3FGYsJbonU',
        {
            method:'POST',
            body: JSON.stringify({
                requestType: "VERIFY_EMAIL",
                idToken: localStorage.getItem('token'),

            })
        }).then(res=>{
            if(res.ok){
                alert('Email ID Verified')


            }else{
                throw new Error;
            }
        }).catch(
            err=>{
                console.log(err.message)

            }
        )
    };
    return(
    <form onSubmit={profileDataHandler}>
        <h2>Contact Details</h2>
        <div className='fullName'>
            <label htmlFor='fullName'> Full Name:</label>
            <input type="text" id="fullName" ref={nameInputRef} defaultValue={userName}  />
        </div>
        <div className='photoUrl'>
            <label htmlFor='photoUrl'> Profile Photo URL:</label>
            <input type="text" id="photoUrl" ref={linkInputRef} defaultValue={link} />
        </div>
        <button type='submit' className='updateButton'>Update</button>
        {notVerified && <button onClick={verifyEmailHandler}>Verify Email</button>}
    </form>)
};

export default Profile;