import React, { useState } from 'react';
import styled from 'styled-components';
import RightNav from './RightNav';

const StyledBurger = styled.div`
  width: 2rem;
  height: 2rem;
  position: relative;
  top: 5px;
  right: 5px;
  z-index: 2;
  display: none;
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }
  :hover{
    cursor: pointer;
  }
  div {
    width: 2rem;
    height: 0.25rem;
    background-color: #fff;
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.15s linear;
    &:nth-child(1) {
      background-color: ${({ open }) => open ? '#272cff' : '#fff'};
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }
    &:nth-child(2) {
      background-color: ${({ open }) => open ? '#272cff' : '#fff'};
      opacity: ${({ open }) => open ? 0 : 1};
    }
    &:nth-child(3) {
      background-color: ${({ open }) => open ? '#272cff' : '#fff'};
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;

const Burger = () => {
  const [open, setOpen] = useState(false)
  
  return (
    <>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>
      <RightNav open={open} setOpen={setOpen}/>
    </>
  )
}
export default Burger