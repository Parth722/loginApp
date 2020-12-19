import React, { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

const UserContext = createContext();
let user = null;
const token = localStorage.getItem('token');
if(token){
    const decodedToken = jwtDecode(token);
    const exipresAt = new Date(decodedToken.exp * 1000);
    if(new Date() > exipresAt){
        localStorage.removeItem('token');
    }else{
        user = decodedToken;
    }
}


const UserReducer = (state, action) => {
    switch (action.type){
        case 'LOGIN':
            localStorage.setItem('token', action.payload.token);
            return{
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            localStorage.removeItem('token');
            return{
                ...state,
                user: null
            }
        default:
            return state;
    }
}

const UserProvider = (props) => {
    const [userState, dispatch] = useReducer(UserReducer, {
        user
    });

    return (
        <UserContext.Provider value={[userState, dispatch]}>
            {props.children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider}