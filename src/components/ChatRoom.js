import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import { MemberListWindow } from './chat/MemberList';
import { inviteUserRequest } from '../controller/main/inviteUserRequest';
import { publishMessage} from '../controller/ws/socketio';
import {sendMessageRequest} from '../controller/chat/sendMessageRequest'
import { readAllMessageRequest } from '../controller/chat/readAllMessageRequest';

const BlankGrid = styled.div`
  height: 10px;
  border: none;
  background: none;
  display: flex;
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

const InviteButton = styled.button`
  background: #343434;
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
  width: 750px;
  height: 550px;
  border: 2px solid black;
  border-radius: 6px;
  background: white;
  overflow-y: scroll;
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

const Room = ({
  curRoom,
  curUserId
}) => {
    const [chatMessage, getMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [inviteUserName, setInviteUserName] = useState('');
    const [room, setRoom] = useState(null);
    const [members, setMembers] = useState([]);
    const [msgList, setMsgList] = useState(null);

    const readAllMessages = async(roomId) => {
      const res = await readAllMessageRequest(
        roomId
      );

      if(res?.ok === true){
        const list = res?.message;
        setMsgList(list);
      }else if(res?.ok === false) {
        setMsgList([]);
      }
    }
    
    const saveMessage = event => {
        getMessage(event.target.value);
        // console.log(event.target.value);
    };

    const handleInviteUserInput = event => {
      setInviteUserName(event.target.value);
    }

    const inviteUser = async() => {
      const res = await inviteUserRequest(
        inviteUserName,
        room?.id
      );

      if(res?.ok === false){
        alert("Invalid User Name!");
      }else{
        const member = res?.member;
        setMembers(member?.member);
        //window.location.reload(false);
      }
    }

    const sendMessage = async () => {

      const res = await sendMessageRequest(
        curUserId,
        room?.id,
        chatMessage
      );

      if(res?.ok){
        publishMessage(
          res?.message
        );
      }

      //* Flush message.
      getMessage('');
    }

    const generateMsgList = () => {
      let list = [];

      msgList.forEach(message => {
        list.push(
        <div key={message?.id} style={{
          padding: 10
        }}>
          <p>{message.payload}</p>
        </div>)
      });

      return list;
    }


    useEffect(() => {
      setRoom(curRoom);
      if(room !== null){
        setMembers(room?.member);
        readAllMessages(room?.id);
        if(msgList !== null) {
          setLoading(false);
        }
      }
    },[curRoom, curRoom.room, msgList, room])

    useEffect(() => {
      // recvMessage(room?.id);
      
    }, []);

    return (
        loading === true
          ? (<h1>Loading...</h1>)
          : (<AbsPosition top="4%">
            <BlankGrid />
            <div style={{
              justifyContent: 'space-between',
              display:'flex',
              alignItems: 'center'
            }}>
              <div>
                <VoiceButton>Voice</VoiceButton>
                <CamButton>WebCam</CamButton>
                <InviteButton
                  onClick={async () => {
                    await inviteUser();
                  }}
                >Invite</InviteButton>
                <input 
                  type='text'
                  value={inviteUserName}
                  onChange={handleInviteUserInput}
                />
              </div>
              <p style={{
                fontSize: 20,
                marginRight: 20,
                padding: 0,
              }}>{`Room Code: ${room?.roomCode}`}</p>
            </div>
            <BlankGrid />
              <div style={{
                display: 'flex',
                flexDirection: 'row',
              }}>
                <ContentWindow >
                  {generateMsgList()}
                </ContentWindow>
                <MemberListWindow members = {members}/>
              </div>
            <BlankGrid />
            <ChatBox
                className="message"
                type="text"
                placeholder="Enter message here"
                value={chatMessage}
                onChange={saveMessage}
            />
            <SendButton
              onClick={async () => {
                await sendMessage();
              }}
            >Send</SendButton>
        </AbsPosition>)
    );
}

export default Room