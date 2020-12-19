import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    let text = <p>Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, <br />sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. 
                lore eu <br />fugiat nulla pariatur. Dolore magna aliqua. 
                lore eu fugiat nulla pariatur.</p>
    if(window.innerWidth < 1024){
        text = null;
    }
    return (
        <div className="flex container mt-8 ml-5 sm:mx-auto w-9/12 lg:mt-20">
            <div className="left">
            <div className="px-8 py-4 mt-5">
                <p className="font-sans text-4xl font-extrabold text-white sm:text-6xl">SocialApp.</p>
            </div>
            <div className="text-white text-left ml-9 mr-10 mt-3 sm:text-xl">
                <p>Lorem ipsum dolor sit amet, consectetur
                     adipiscing elit, sed do eiusmod <br />tempor 
                     incididunt ut labore et dolore magna aliqua. 
                     lore eu fugiat nulla pariatur.</p>
                    {text}
            </div>
            <div className="text-white text-xl text-left mt-11 ml-6">
                <NavLink to="login" className="transition p-3 m-2 border-white border rounded-full hover:text-indigo-700 hover:bg-white">
                    Login
                </NavLink>
                <NavLink to="register" className="transition p-3 m-2 border-white border rounded-full hover:text-indigo-700 hover:bg-white">
                    Register
                </NavLink>
            </div>  
            </div>    
        </div>
    )
}

export default Header