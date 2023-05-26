import React, { useState } from 'react';
import styled from 'styled-components';
import LoginButton from '../components/LoginButton';
import TextButton from '../components/TextButton';
import io from 'socket.io-client';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 45rem;
`;

const LeftWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  background: gray;
  
  color: white; // font color
  font-size: 50px;
  font-weight: bold;
`;

const RightWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  background: darkgray;
  
  color: black;
  font-weight: bold;
`;

const AbsPosition = styled.div`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  right: ${props => props.right};
`;

const Login = () => {
    const [idValue, setId] = useState('');
    const [pwValue, setPw] = useState('');

    const saveUserId = event => {
        setId(event.target.value);
        // console.log(event.target.value);
    };

    const saveUserPw = event => {
        setPw(event.target.value);
        // console.log(event.target.value);
    };

    return (
        <Wrapper>
            <LeftWrapper>Niscord</LeftWrapper>
            <RightWrapper>
                <AbsPosition top="30%" right="22%">
                    IDㅤ
                    <input
                        className="login_id"
                        type="text"
                        value={idValue}
                        onChange={saveUserId}
                    />
                </AbsPosition>
                <AbsPosition top="35%" right="22%">
                    PWㅤ
                    <input
                        className="login_pw"
                        type="password"
                        value={pwValue}
                        onChange={saveUserPw}
                    />
                </AbsPosition>
                <AbsPosition top="30%" right="16%">
                    <LoginButton>LogIn</LoginButton>
                </AbsPosition>
                <AbsPosition top="41%" left="67%">
                    <TextButton fontSize="5px">ID 찾기</TextButton>
                </AbsPosition>
                <AbsPosition top="41%" right="26.5%">
                    /
                </AbsPosition>
                <AbsPosition top="41%" right="18%">
                    <TextButton fontSize="5px">비밀번호 찾기</TextButton>
                </AbsPosition>
                <AbsPosition top="91%" right="1%">
                    2023 Niscord Project
                </AbsPosition>
            </RightWrapper>
        </Wrapper>
    );
}

export default Login;