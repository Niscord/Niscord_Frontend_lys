import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { queryUserIdent } from '../../controller/user/queryUserIdent';
import {queryUserPassword} from '../../controller/user/queryUserPassword';

const Wrapper = styled.div`
    width: 100%;
    height: 80%;
    background: gray;
    color: black;
    font-size: ${props => props.fontSize};
`;

const SearchWindow = styled.div`
    width: 100%;
    height: 3%;
    font-size: ${props => props.fontSize};
`;

const ResultWindow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30%;
    font-size: ${props => props.fontSize};
    color: ${props => props.color};
`;

const FindIdPw = () => {
  const [username ,setUsername] = useState("");
  const [foundIdent, setFoundIdent] = useState("-");
  const [userIdent, setUserIdent] = useState("");
  const [foundPassword, setFoundPassword] = useState("-");

  const handleUsername = (event) => {
    setUsername(event.target.value);
  }

  const handleUserIdent = (event) => {
    setUserIdent(event.target.value);
  }

  const findUserIdent = async() => {
    const res = await queryUserIdent(username);

    if(res === null){
      alert("No Such User!");
    }

    setFoundIdent(res?.ident);
  }

  const findUserPassword = async() => {
    const res = await queryUserPassword(userIdent);

    if(res === null){
      alert("No Such User!");
    }

    setFoundPassword(res?.password);
  }


    return (
        <Wrapper fontSize="25px">
            <div>ㅤ* ID 찾기</div>
            <SearchWindow fontSize="20px">
                ㅤㅤㅤUsername:ㅤ<input 
                placeholder='Enter Username...' 
                onChange={handleUsername}
                />
                <button
                  onClick={async() => {findUserIdent()}}
                >찾기</button>
            </SearchWindow>
            <ResultWindow color="red">{`${foundIdent}`}</ResultWindow>
            <div>ㅤ* 비밀번호 찾기</div>
            <SearchWindow fontSize="20px">
                ㅤㅤㅤㅤㅤㅤID:ㅤ<input 
                  placeholder='Enter ID...' 
                  onChange={handleUserIdent}
                  />
                <button
                  onClick={async() => {findUserPassword()}}
                >찾기</button>
            </SearchWindow>
            <ResultWindow color="red">{`${foundPassword}`}</ResultWindow>
        </Wrapper>
    );
}

export default FindIdPw;