import './Profile.css'
import { useRef } from 'react';
import { useRef, useEffect, useState } from 'react';
const Profile = (props)=>{

    const nameInputRef = useRef();
    const linkInputRef = useRef();
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
        setuserName(userData[0].displayName)
        setLink(userData[0].photoUrl)


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
    return(
    <form onSubmit={profileDataHandler}>
        <h2>Contact Details</h2>
        <div className='fullName'>
            <label htmlFor='fullName'> Full Name:</label>
            <input type="text" id="fullName" ref={nameInputRef} />
            <input type="text" id="fullName" ref={nameInputRef} defaultValue={userName}  />
        </div>
        <div className='photoUrl'>
            <label htmlFor='photoUrl'> Profile Photo URL:</label>
            <input type="text" id="photoUrl" ref={linkInputRef}/>
            <input type="text" id="photoUrl" ref={linkInputRef} defaultValue={link} />
        </div>
        <button type='submit' className='updateButton'>Update</button>
    </form>)
};
export default Profile;