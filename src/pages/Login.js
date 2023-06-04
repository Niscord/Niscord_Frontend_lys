import React, { useState } from 'react';
import styled from 'styled-components';
import LoginButton from '../components/LoginButton';
import FindIdPw from './components/FindIdPw';
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
    const [isWindowClicked, setClickState] = useState(false);

    const saveUserId = event => {
        setId(event.target.value);
        // console.log(event.target.value);
    };

    const saveUserPw = event => {
        setPw(event.target.value);
        // console.log(event.target.value);
    };

    function switchClickState() {
        if (isWindowClicked === false)
            setClickState(true);
        else
            setClickState(false);
    }

    return (
        <Wrapper>
            <LeftWrapper>
                {isWindowClicked ? <FindIdPw /> : "Niscord"}
            </LeftWrapper>
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
                    <LoginButton
                      ident={idValue}
                      password={pwValue}
                    >LogIn</LoginButton>
                </AbsPosition>
                <AbsPosition top="41%" left="70%">
                    <button 
                        onClick = {switchClickState}
                    >{!isWindowClicked ? "ID / 비밀번호 찾기" : "ㅤㅤㅤ취소ㅤㅤㅤ"}</button>
                </AbsPosition>
                <AbsPosition top="91%" right="1%">
                    2023 Niscord Project
                </AbsPosition>
            </RightWrapper>
        </Wrapper>
    );
}

export default Login;