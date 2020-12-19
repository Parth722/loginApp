import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../Context';
import { NavLink, useHistory } from 'react-router-dom';

const Ul = styled.ul`
  list-style: none;
  display: flex;
  z-index: 1;
  height: 100vh;
  flex-flow: row nowrap;
  a {
    padding: 10px 20px;
    color: #fff;
    border: 1px solid white;
    height: 20px;
    margin: 10px;
    transition: background, color, .2s;
    border-radius: 20px;
  }
  a:hover{
    cursor: pointer;
    background: white;
    color: #2563eb;
  }
  position: relative;
  bottom: 0;
  right: 0;
  font-size: 17px;
  font-family: Montserrat;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #fff;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    height: 100vh;
    width: 100vw;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      padding: 10px;
    }
    a, a:hover {
      color: #272cff;
      cursor: pointer;  
    }
  }
`;

const RightNav = ({ open, setOpen }) => {
  const [userState, dispatch] = useContext(UserContext);
  const history = useHistory();


  const logout = () => {
    dispatch({type: 'LOGOUT'});
    history.push('/login');
  }
  let comp;
  if(localStorage.getItem('token')){
    comp = <li><a onClick={logout}>Logout</a></li>;
  }
  else{
    comp = [<li><NavLink onClick={() => setOpen(!open)} to='login'>Login</NavLink></li>,
            <li><NavLink onClick={() => setOpen(!open)} to='register'>Register</NavLink></li>];
  }
  return (
    <Ul open={open}>
      {comp}
    </Ul>
  )
}

export default RightNav