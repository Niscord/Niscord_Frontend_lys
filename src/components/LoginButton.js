import React from 'react';
import styled from 'styled-components';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { loginRequest } from '../controller/login/loginRequest';

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  // font-style: normal;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  
  height: 4rem;
  font-size: 1rem;
  text-align: center;
  
  background: #228be6;
  &:hover {
    background: #339af0;
  }
  &:active {
    background: #1c7de6;
  }
  
  & + & {
    margin-left: 1rem;
  }
`;

const LoginButton = ({ 
  children,
  ident,
  password
}) => {

  const cookies = new Cookies();
  const navigate = useNavigate();


  const handleLoginRequest = async() => {
    const res = await loginRequest(ident, password);

    if(res?.ok === false){
      //* Login Failed.
      alert('Login Failed. Wrong ID or password.');
    } else {
      //* Proceed Login
      //* Set userId and username in cookie.
      //! This is just an promotion. JWT is necessary in production.
      cookies.set('userId', res?.userId);
      cookies.set('userName', res?.userName);
      navigate('/main');
    }
  
  }
    return <StyledButton
        onClick = {async () => {
            await handleLoginRequest();
        }}
    >{children}</StyledButton>;
}

export default LoginButton;