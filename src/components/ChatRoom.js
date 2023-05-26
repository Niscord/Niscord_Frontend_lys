import React, {useState} from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';

const BlankGrid = styled.div`
  height: 10px;
  border: none;
  background: none;
`;

const VoiceButton = styled.button`
  background: crimson;
  color: white;
  outline: none;
  padding-left: 1rem;
  padding-right: 1rem;
  
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
`;

const CamButton = styled.button`
  background: blueviolet;
  color: white;
  outline: none;
  padding-left: 1rem;
  padding-right: 1rem;

  font-size: 1rem;
  font-weight: bold;
  text-align: center;
`;

const ContentWindow = styled.div`
  text-align: left;
  width: 1000px;
  height: 550px;
  border: 2px solid black;
  border-radius: 6px;
  background: white;
`;

const ChatBox = styled.input`
  width: 900px;
  height: 50px;
`;

const SendButton = styled.button`
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

const AbsPosition = styled.div`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  right: ${props => props.right};
`;

const Room = () => {
    const [chatMessage, getMessage] = useState('');

    const saveMessage = event => {
        getMessage(event.target.value);
        // console.log(event.target.value);
    };

    return (
        <AbsPosition top="4%">
            <BlankGrid />
            <VoiceButton>Voice</VoiceButton>
            <CamButton>WebCam</CamButton>
            <BlankGrid />
            <ContentWindow />
            <BlankGrid />
            <ChatBox
                className="message"
                type="text"
                placeholder="Enter message here"
                value={chatMessage}
                onChange={saveMessage}
            />
            <SendButton>Send</SendButton>
        </AbsPosition>
    );
}

export default Room