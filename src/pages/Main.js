import React, {memo, useState, useEffect} from 'react';
import styled from 'styled-components';
import ChatRoom from '../components/ChatRoom';
import { generateRoomRequest } from '../controller/main/createRoom';
import { queryAllRooms } from '../controller/main/queryRoom';
import { Cookies } from 'react-cookie';
import { VideoChatRoom } from '../components/videoChat/videoChatRoom';
import { socket } from '../controller/ws/socketio';
import { VoiceChatRoom } from '../components/voiceChat/voiceChatRoom';

const Main = () => {
  const [isChatRoom1Active, setRoom1State] = useState(false)
  const [roomList, setRoomList] = useState(null);
  const [userId, setUserId] = useState(0);
  const [userName, setUserName] = useState(null);
  const [clickedRoom, setClickedRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openVideoChatRoom, setOpenVideoChatRoom] = useState(false);
  const [openVoiceChatRoom, setOpenVoiceChatRoom] = useState(false);
  const [incomingVideoCall, setIncomingVideoCall] = useState(false);
  const [incomingVoiceCall, setIncomingVoiceCall] = useState(false);
  const [videoSignal, setVideoSignal] = useState(null);
  const [voiceSignal, setVoiceSignal] = useState(null);
  const [callerId, setCallerId] = useState(null); 

  const cookies = new Cookies();

  function switchRoom1State() {
      if (isChatRoom1Active === false)
          setRoom1State(true);
      else
          setRoom1State(false);
  }

  const renewRoomInfo = async () => {
    const res = await queryAllRooms(userId); //TODO Need to give user Id.
    const list = res?.room?.data;
    setRoomList(list);
    setLoading(false);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchUserInfo = async() => {
    //* Get user data from cookie.
    const id = cookies.get('userId');
    const name = cookies.get('userName');

    setUserId(parseInt(id));
    setUserName(name);
  }

  const roomCreate = async () => {
    const newRoom = await generateRoomRequest(1, setRoomList, roomList);
    setRoomList([...roomList, newRoom]); //* React State Update
  }

  const renderRoomList = () => {
    let list = [];

    roomList?.forEach(room => {
      list.push(<RoomButton key={room?.id} onClick={() => {
          setClickedRoom(room);
          setRoom1State(true);
        }}>
        <div>{room?.roomCode}</div>
      </RoomButton>)
    })

    return list;
  }

  useEffect(() => {
    console.log(roomList);
  }, [roomList]);

  useEffect(() => {
    if(userId !== 0){
      renewRoomInfo();
    }
  }, [userId])

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]); //* Executed only once.

  useEffect(() => {
    socket.on("video_chat_call", (data) => {
      if(data?.userToCall === userId){
        // alert("INCOMINGCALL!");
        setIncomingVideoCall(true);
        setVideoSignal(data?.signal);
        setCallerId(data?.from);
        //console.log(vsignal);
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, socket, videoSignal])

  useEffect(() => {
    socket.on("voice_chat_call", (data) => {
      if(data?.userToCall === userId){
        // alert("INCOMINGCALL!");
        setIncomingVoiceCall(true);
        setVoiceSignal(data?.signal);
        setCallerId(data?.from);
        //console.log(vsignal);
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, socket, voiceSignal])

  return (
      loading === true
        ? (<h1>Loading...</h1>)
        : (<Wrapper>
          <LeftWrapper>
              <AbsPosition top="20%">
                  <Profile>{`ID: ${userName}`}</Profile>
              </AbsPosition>
              <div style={{
                display: 'flex',
                flexDirection: 'row'
              }}>
                {incomingVoiceCall 
                ? <button
                  style={{
                    backgroundColor: '#3198FF',
                  }}
                  onClick={() => {
                    setOpenVoiceChatRoom(!openVoiceChatRoom)
                    //setIncomingVoiceCall(!incomingVoiceCall);
                  }}
                >
                  <p>Incoming Voice Call!</p>
                </button>
                : <button
                  onClick={() => setOpenVoiceChatRoom(!openVoiceChatRoom)}
                >
                  <p>Voice call</p>
                </button>}
                {incomingVideoCall 
                ? <button
                  style={{
                    backgroundColor: '#3198FF',
                  }}
                  onClick={() => {
                    setOpenVideoChatRoom(!openVideoChatRoom)
                    //setIncomingVideoCall(!incomingVideoCall)
                  }}
                >
                  <p>Incoming Video Call!</p>
                </button>
                : <button
                  onClick={() => setOpenVideoChatRoom(!openVideoChatRoom)}
                >
                  <p>Video call</p>
                </button>}
              </div>
              <AbsPosition top="50%">
                  <RoomListScroll>
                      {renderRoomList()}
                      <RoomButton
                          onClick = {() => {
                            roomCreate();
                          }}
                      ><div>+ 방 만들기</div></RoomButton>
                  </RoomListScroll>
              </AbsPosition>
          </LeftWrapper>
          <RightWrapper>
              {isChatRoom1Active && <ChatRoom curRoom={clickedRoom} curUserId={userId}/>} 
          </RightWrapper>
          {(!incomingVoiceCall && openVoiceChatRoom) && <VoiceChatRoom 
            recv={false}
            isOpened={openVoiceChatRoom} 
            setIsOpened={setOpenVoiceChatRoom} 
            curUserId={userId}
            setIncomingCallFlag={setIncomingVoiceCall}
            />}
          {(incomingVoiceCall && openVoiceChatRoom) && <VoiceChatRoom 
            recv={true}
            isOpened={openVoiceChatRoom} 
            setIsOpened={setOpenVoiceChatRoom} 
            curUserId={userId}
            callerId={callerId}
            signal={voiceSignal}
            setIncomingCallFlag={setIncomingVoiceCall}
            />}
          {(!incomingVideoCall && openVideoChatRoom) && <VideoChatRoom 
            recv={false}
            isOpened={openVideoChatRoom} 
            setIsOpened={setOpenVideoChatRoom} 
            curUserId={userId}
            setIncomingCallFlag={setIncomingVideoCall}
            />}
          {(incomingVideoCall && openVideoChatRoom) && <VideoChatRoom 
            recv={true}
            isOpened={openVideoChatRoom} 
            setIsOpened={setOpenVideoChatRoom} 
            curUserId={userId}
            callerId={callerId}
            signal={videoSignal}
            setIncomingCallFlag={setIncomingVideoCall}
            />}
      </Wrapper>)
  );
};
//* Need to add chatroom props.

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
  width: 25%;
  height: 100%;
  background: gray;
  
  color: white; // font color
  font-size: 20px;
  font-weight: bold;
`;

const RightWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75%;
  height: 100%;
  background: darkgray;
  
  color: black;
  font-weight: bold;
`;

const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  
  color: black;
  font-size: 50px;
  font-weight: bold;
`;


const Grid = styled.div`
  width: 300px;
  padding: 10px;
`;

const RoomListScroll = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10 0;
  overflow: scroll;
  height: 300px;
  width: 300px;
  border : 1px solid black;
  border-radius: 6px;
  background: azure;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;

const RoomButton = styled.button`
  display: inline-flex;
  align-items: center;
  outline: none;
  border: none;
  color: black;
  cursor: pointer;
  padding: 30px;
  height: 1rem;
  font-size: 20px;
  background: azure;
  text-align: center;

  &:hover {
    font-weight: bold;
  }
  &:active {
    font-weight: bold;
    color: red;
  }
`;

const AbsPosition = styled.div`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  right: ${props => props.right};
`;

export default Main