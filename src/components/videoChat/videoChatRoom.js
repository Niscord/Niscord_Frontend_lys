import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import SimplePeer from 'simple-peer';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { socket } from '../../controller/ws/socketio';
import { queryUserId } from '../../controller/user/queryUserId';

export const VideoChatRoom = ({
  recv,
  isOpened,
  setIsOpened,
  curUserId,
  callerId,
  signal,
  setIncomingCallFlag
}) => {
  //const [curUser, setCurUser] = useState();
  const [stream, setStream] = useState();
  const [loaded, setLoaded] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const [userToCall, setUserToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  const callUser = async () => {
    //* Create New Peer
    const peer = new SimplePeer({
      initiator: true,
      trickle: false,
      stream
    });
    
    const res = await queryUserId(userToCall);

    if(res === null){
      alert("No Such User!");
    }else{
       peer.on('signal', (data) => {
         socket.emit("video_chat_call", {
           userToCall: res?.id,
           signalData: data,
           from: curUserId,
           name
         })
       });
  
       peer.on("stream", (stream) => {
         if(userVideo.current !== undefined){
           userVideo.current.srcObject = stream; 
         }
       });
  
       socket.on("video_chat_accept", (data) => {
        console.log(data);
         if(data?.from === curUserId){
          setCallAccepted(true);
          peer.signal(data?.signal);
         }
       }) 
  
       connectionRef.current = peer;
    }
  }

  const answerVideoCall = () => {
    if(callAccepted === false){
      setCallAccepted(true);
  
      const peer = new SimplePeer({
        initiator: false, //* Not a initator,
        trickle: false,
        stream
      });

      peer.on('signal', (data) => {
        socket.emit("video_chat_recv", {signal: data, from: callerId});
      });

      peer.on("stream", (stream) => {
        if(userVideo.current !== undefined){
          userVideo.current.srcObject = stream;
        }
      });

      //console.log(signal);
      peer.signal(signal);

      connectionRef.current = peer;
    }
  }

  const leaveCall = () => {
    setCallEnded(true);
    setCallAccepted(false);
    connectionRef.current.destroy(); //* Kill Connection Ref & Connection 

    socket.emit('video_call_end', {from: callerId});
  }

  const exitIfConnectionEnd = () => {
    socket.on('video_call_end', (data) => {
      if(data?.from === curUserId) {
        setCallEnded(true);
        setCallAccepted(false);
        connectionRef.current.destroy(); //* Kill Connection Ref & Connection 
      }
    })
  }

  const getUserCamera = () => {
    navigator.mediaDevices.getUserMedia({video: true, audio: true})
      .then((stream) => {
        setStream(stream); //* Pass webcam stream
        setTimeout(() => { //* Force await
          if(myVideo.current !== undefined){
            myVideo.current.srcObject = stream;
          }
          setLoaded(true);
        }, 100)
      })
  }

  const handleUserName = event => {
    setUserToCall(event.target.value);
  }

  useEffect(() => {
    getUserCamera();
    if(recv && loaded){
      answerVideoCall();
    }
    exitIfConnectionEnd();
  }, [loaded]); 

  return (
    <div style={{
      width: '90%',
      height: '90%',
      position: 'absolute',
      top: '2%',
      left: '5%',
      border: '1 solid black',
      borderRadius: 25,
      zIndex: 10,
      backgroundColor: '#CCCCCC',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        width: '100%',
        display: 'flex'
      }}>
        <button style={{
          background: 'transparent',
          border: 0,
          marginLeft: 10
        }}
        onClick={() => {
          setIncomingCallFlag(false);
          setIsOpened(!isOpened)
        }}>
           <p style={{
            fontSize: 20,
           }}>Close</p>
        </button>  
      </div>
      <div style={{
        width: '100%',
        display: 'flex'
      }}>
        <p style={{
            fontSize: 25,
            width: '100%',
            textAlign: 'center',
            padding: 0,
            margin: 0,
           }}>Video Chat</p> 
      </div>
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'space-around',
        marginTop: 100,
      }}>
        {stream ? 
          <video playsInline muted ref={myVideo} autoPlay 
            style={{
              height: 250,
              width: 300,
            }}
          />
          : <EmptyCell />}
        {(callAccepted && !callEnded)
          ? <video playsInline ref={userVideo} autoPlay
            style={{
              height: 250,
              width: 300,
            }}
          />
          : <EmptyCell/>}
      </div>
      {(callAccepted === true) 
      ? <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 50,
      }}>
        <button
         style={{
          width: 100,
         }}
         onClick={() => leaveCall()}
       >End Call</button>
      </div>
      : <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 50,
      }}>
       <p
        style={{
          margin: 0,
        }}
       >{`Enter User Nickname to call.`}</p>
       <input style={{
        marginLeft: 10,
        marginRight: 10,
       }}
        onChange={handleUserName}
       />
       <button
         onClick={() => callUser()}
       >Call</button>
      </div>}
    </div>
  )
}

const EmptyCell = styled.div`
  display: flex;
  height: 250px;
  width: 300px;
  background-color: #555555;
`