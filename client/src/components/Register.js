import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

const REGISTER_USER = gql`
    mutation register($email: String!, $username: String!, $password: String!, $confirmPassword: String!){
        register(email: $email, username: $username, password: $password, confirmPassword: $confirmPassword){
            username
            email
        }
    }
`

const Register = (props) => {
    const history = useHistory();
    const [variables, setVariables] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [registerUser, { loading, error }] = useMutation(REGISTER_USER, {
        update(_, res){
            history.push('/login');
        },
        onError(err){
            document.querySelector('.errors').style.display = "none";
            document.querySelector('.errors').classList.add('p-4');
            document.querySelector('.errors ul').innerHTML = "";
            if(err.graphQLErrors[0].message.includes('username')){
                let li = document.createElement('li');
                li.classList.add('m-1','mx-3');
                li.innerHTML = 'Username is already taken.';
                document.querySelector('.errors ul').appendChild(li);
                document.querySelector('.errors').style.display = "block";
            }
            else if(err.graphQLErrors[0].message.includes('email')){
                let li = document.createElement('li');
                li.classList.add('m-1','mx-3');
                li.innerHTML = 'Email is already registerd.';
                document.querySelector('.errors ul').appendChild(li);
                document.querySelector('.errors').style.display = "block";
            }
        }
    });
   
    const submitRegistration = (evt) => {
        evt.preventDefault();
        if(!validate()){
            registerUser({ variables });
        }
        else{
            console.log('error');
        }
    }
    const validate = () => {
        let err = false;
        document.querySelector('.errors').style.display = "none";
        document.querySelector('.errors').classList.add('p-4');
        document.querySelector('.errors ul').innerHTML = "";
        if (variables.username.trim() === ''){
            let li = document.createElement('li');
            li.classList.add('m-1','mx-3');
            li.innerHTML = 'Username should not be empty.';
            document.querySelector('.errors ul').appendChild(li);
            document.querySelector('.errors').style.display = "block";
            err = true;
        }
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
            li.innerHTML = 'Password should not be empty.';
            document.querySelector('.errors ul').appendChild(li);
            document.querySelector('.errors').style.display = "block";
            err = true;
        }
        if(variables.confirmPassword.length === 0){
            let li = document.createElement('li');
            li.classList.add('m-1','mx-3');
            li.innerHTML = 'Confirm Password should not be empty.';
            document.querySelector('.errors ul').appendChild(li);
            document.querySelector('.errors').style.display = "block";
            err = true;
        }
        if(variables.password !== variables.confirmPassword){
            let li = document.createElement('li');
            li.classList.add('m-1','mx-3');
            li.innerHTML = 'Passwords don\'t match.';
            document.querySelector('.errors ul').appendChild(li);
            document.querySelector('.errors').style.display = "block";
            err = true;
        }
        return err;
    }

    return (
        <div className="mx-auto my-10 sm:my-20 bg-white bg-opacity-95 py-10 pb-1 lg:w-2/5 md:w-3/5 w-full">
        <form action="/register" onSubmit={submitRegistration} className="flex text-center justify-center flex-col">
            <center><span className="text-4xl">
                Register
                <hr className="mt-7 border-black w-2/5"></hr>
            </span></center>
            <div className="input-field mt-5 sm:mt-10">
                <input className="bg-gray-200 w-4/5 sm:w-3/5 text-sm sm:text-base placeholder-gray-700 my-3 py-5 px-6 sm:px-10 rounded-full" 
                       type="text" 
                       name="name" placeholder="Username" 
                       value={variables.username}
                       onChange={(evt) => {
                           setVariables({
                               ...variables,
                               username: evt.target.value
                           })
                       }}
                />
            </div>
            <div className="input-field sm:mt-5">
                <input className="bg-gray-200 w-4/5 sm:w-3/5 text-sm sm:text-base placeholder-gray-700 my-3 py-5 px-6 sm:px-10 rounded-full" 
                       type="email" 
                       name="email" placeholder="Email" 
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
                <input className="bg-gray-200 w-4/5 sm:w-3/5 text-sm sm:text-base placeholder-gray-700 my-3 py-5 px-6 sm:px-10 rounded-full" 
                       type="password" 
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
            <div className="input-field sm:mt-5">
                <input className="bg-gray-200 w-4/5 sm:w-3/5 text-sm sm:text-base placeholder-gray-700 my-3 py-5 px-6 sm:px-10 rounded-full" 
                       type="password" 
                       name="password" placeholder="Confirm Password" 
                       value={variables.confirmPassword}
                       onChange={(evt) => {
                        setVariables({
                            ...variables,
                            confirmPassword: evt.target.value
                        })
                    }}
                />
            </div>
            <button className="submit py-3 px-5 text-indigo-700 border-indigo-700 text-xl border mt-4 sm:mt-6 mx-auto hover:text-white hover:bg-indigo-700 transition rounded-full p-3">Register</button>
        </form>
        <div className="errors mt-6 sm:mt-5 m-4 mb-10 sm:w-3/5 mx-3 sm:mx-auto bg-red-200 rounded-xl">
            <ul className="list-disc text-sm sm:text-base text-center text-red-700">
            </ul>
        </div>
    </div>
    )
}

export default Register