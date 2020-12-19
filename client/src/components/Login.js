import React, { useState, useContext } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { UserContext } from './Context';

const LOGIN_QUERY = gql`
    query login($email: String!, $password: String!){
        login(email: $email, password: $password){
            username
            email
            token
        }
    }
`

const Login = (props) => {
    const history = useHistory();
    const [variables, setVariables] = useState({
        email: '',
        password: ''
    });
    const [userState, dispatch] = useContext(UserContext);

    const [loginUser, { data }] = useLazyQuery(LOGIN_QUERY, {
        onCompleted(data){
            dispatch({type: 'LOGIN', payload: data.login})
            history.push('/user');
        },
        onError(err){
            document.querySelector('.errors').style.display = "none";
            document.querySelector('.errors ul').innerHTML = "";
            let li = document.createElement('li');
            li.classList.add('m-1','mx-3');
            li.innerHTML = err.message;
            document.querySelector('.errors ul').appendChild(li);
            document.querySelector('.errors').style.display = "block";
        }
    });

    const validate = () => {
        let err = false;
        document.querySelector('.errors').style.display = "none";
        document.querySelector('.errors').classList.add('p-4');
        document.querySelector('.errors ul').innerHTML = "";
        if (variables.email.trim() === ''){
            let li = document.createElement('li');
            li.classList.add('m-1','mx-3');
            li.innerHTML = 'Email should not be empty.';
            document.querySelector('.errors ul').appendChild(li);
            document.querySelector('.errors').style.display = "block";
            err = true;
        }
        else{
            var reg =  	
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!variables.email.match(reg)){
                let li = document.createElement('li');
                li.classList.add('m-1','mx-3');
                li.innerHTML = 'Email should be valid.';
                document.querySelector('.errors ul').appendChild(li);
                document.querySelector('.errors').style.display = "block";
                err = true;
            }
        }
        if(variables.password.length === 0){
            let li = document.createElement('li');
            li.classList.add('m-1','mx-3');
            li.innerHTML = 'Password should not be empty.';
            document.querySelector('.errors ul').appendChild(li);
            document.querySelector('.errors').style.display = "block";
            err = true;
        }
        return err;
    }
    const submitLogin = (evt) => {
        evt.preventDefault();
        if (!validate(variables)){
            loginUser({variables});
        }
        else{
            console.log('error');
        }
    }
    return (
        <div className="mx-auto my-10 sm:my-20 bg-white bg-opacity-95 py-10 pb-1 lg:w-2/5 md:w-3/5 w-full">
            <form action="/login" onSubmit={submitLogin} className="flex text-center justify-center flex-col">
                <center><span className="text-4xl">
					Login
                    <hr className="mt-7 border-black w-2/5"></hr>
				</span></center>
                <div className="input-field mt-5 sm:mt-10">
                    <input className="bg-gray-200 w-4/5 sm:w-3/5 text-sm sm:text-base placeholder-gray-700 my-3 py-5 px-6 sm:px-10 rounded-full" type="email" 
                           name="name" placeholder="Email" 
                           value={variables.email}
                           onChange={(evt) => {
                               setVariables({
                                   ...variables,
                                   email: evt.target.value
                               })
                           }}
                    />
				</div>
                <div className="input-field sm:mt-5">
                    <input className="bg-gray-200 w-4/5 sm:w-3/5 text-sm sm:text-base placeholder-gray-700 my-3 py-5 px-6 sm:px-10 rounded-full" type="password" 
                           name="password" placeholder="Password" 
                           value={variables.password}
                           onChange={(evt) => {
                            setVariables({
                                ...variables,
                                password: evt.target.value
                            })
                        }}
                    />
				</div>
                <button className="submit py-3 px-5 text-indigo-700 border-indigo-700 text-xl border mt-4 sm:mt-6 mx-auto hover:text-white hover:bg-indigo-700 transition rounded-full p-3">Login</button>
            </form>
            <div className="errors mt-6 sm:mt-10 m-4 mb-10 sm:w-3/5 mx-3 sm:mx-auto bg-red-200 rounded-xl">
                <ul className="list-disc text-sm sm:text-base text-center text-red-700">
                </ul>
            </div>
        </div>
    )
}

export default Login