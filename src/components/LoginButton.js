import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

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

const loginReq = async (ident, password)=> {
    const res = await axios.post('http://localhost:9091/login',{
        ident: ident,
        password: password,
    }).catch((e)=> {
        console.log(e.message);
    })

    console.log(res.data);
}

const LoginButton = ({ children, ...rest }) => {
    return <StyledButton
        onClick = {async () => {
            await loginReq('mycheesepasta', 'test1234');
        }}
    >{children}</StyledButton>;
}

export default LoginButton;