import React, {useEffect, useRef, useState} from 'react';
import SimplePeer from 'simple-peer';
import styled from 'styled-components';
import { queryUserId } from '../../controller/user/queryUserId';
import { socket } from '../../controller/ws/socketio';

export const VoiceChatRoom = ({
  recv,
  isOpened,
  setIsOpened,
  curUserId,
  callerId,
  signal,
  setIncomingCallFlag
}) => {
  const [stream, setStream] = useState();
  const [loaded, setLoaded] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const [userToCall, setUserToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");

  const myAudio = useRef();
  const userAudio = useRef();
  const connectionRef = useRef();
  
  const handleUserName = event => {
    setUserToCall(event.target.value);
  }

  const callUser = async() => {

    const peer = new SimplePeer({
      initiator: true,
      trickle: false,
      stream
    });

    const res = await queryUserId(userToCall);

    if(res == null){
      alert("No Such User!");
    }else {
      peer.on('signal', (data) => {
        socket.emit("voice_chat_call", {
          userToCall: res?.id,
          signalData: data,
          from: curUserId,
          name
        });
      });

      peer.on('stream', (stream) => {
        if(userAudio.current !== undefined) {
          userAudio.current.srcObject = stream;
        }
      })

      socket.on("voice_chat_accept", (data) => {
        if(data?.from === curUserId){
          setCallAccepted(true);
          peer.signal(data?.signal);
        }
      });

      connectionRef.current = peer;
    }
  }

  const answerVoiceCall = () => {
    if(callAccepted === false){
      setCallAccepted(true);

      const peer = new SimplePeer({
        initiator: false,
        trickle: false,
        stream
      });

      peer.on("signal", (data) => {
        socket.emit("voice_chat_recv", {
          signal: data,
          from: callerId
        });
      });

      peer.on('stream', (stream) => {
        if(userAudio.current !== undefined) {
          userAudio.current.srcObject = stream;
        }
      });

      peer.signal(signal);

      connectionRef.current = peer;
    }
  }

  const leaveCall = () => {
    setCallEnded(true);
    setCallAccepted(false);
    connectionRef.current.destroy();
    socket.emit('voice_call_end', {from: callerId});
  }

  const exitIfConnectionEnd = () => {
    socket.on('voice_call_end', (data) => {
      if(data?.from === curUserId) {
        setCallEnded(true);
        setCallAccepted(false);
        connectionRef.current.destroy(); //* Kill Connection Ref & Connection 
      }
    })
  }

  const getUserMic = () => {
    navigator.mediaDevices.getUserMedia({audio: true})
      .then((stream) => {
        setStream(stream);
        setTimeout(() => {
          if(myAudio.current !== undefined){
            myAudio.current.srcObject = stream;
          }
          setLoaded(true);
        }, 100);
      })
  }

  useEffect(() => {
    getUserMic();
    if(recv && loaded) { 
      answerVoiceCall();
    }
    exitIfConnectionEnd();
  }, [loaded])

  return (
    <div style={{
      width: '90%',
      height: '90%',
      position: 'absolute',
      top: 0,
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
          margin: 10,
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
           }}>Voice Chat</p> 
      </div>
      <div style={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        columnGap: 10,
        rowGap: 10,
      }}>
        <Cell />
        {stream && <audio ref={myAudio} muted autoPlay playsInline/>}
        {(callAccepted) && <Cell />}
        {(callAccepted && !callEnded) && <audio ref={userAudio} autoPlay playsInline/>}
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

const Cell = styled.div`
  display: flex;
  height: 250px;
  background-color: #555555;
`