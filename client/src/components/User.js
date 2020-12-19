import React, {useContext} from 'react';
import {UserContext} from './Context';

const User = () => {
    const [userState, dispatch] = useContext(UserContext);
    let username;
    let email;
    if(userState.user != null){
        username =  userState.user.username;
        email = userState.user.email;
    }
    else{
        username = 'User not signed in';
        email = "";
    }
    return (
        <div className="mx-auto my-10 sm:my-20 bg-white bg-opacity-95 py-5 pb-1 lg:w-2/5 md:w-3/5 w-full">
            <h1 className="text-2xl m-4 my-1">Username:  {username}</h1>
            <h1 className="text-2xl m-4 my-1">Email:  {email}</h1>
        </div>
    )
}

export default User