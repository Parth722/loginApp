import React from 'react';
import styled from 'styled-components';
import Burger from './Burger';


const Nav = styled.nav`
  width: 75%;
  height: 55px;
  margin: 10px auto;
  border-bottom: 1px solid #f1f1f1;
  padding: 10px 5px;
  display: flex;
  justify-content: space-between;
  .logo {
    color: white;
    font-size: 24px;
    font-family: montserrat;
  }
  @media (min-width: 768px) {
    .logo{
      margin-top: -5px;
    }
  }
`

const MenuBar = () => {
  return (
    <Nav>
      <div className="logo">
        WebName
      </div>
      <Burger />
    </Nav>
  )
}

export default MenuBar