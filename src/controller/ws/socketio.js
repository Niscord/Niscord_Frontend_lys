import { io } from "socket.io-client";
import { WS } from "../../config/config";

export const socket = io(`${WS}`, {transports: ["websocket"]});

export const initSocketConnection = () => {
  if(socket) return;
  socket.connect();
}

export const publishMessage = (message) => {

  if(socket === null || socket.connected === false){
    initSocketConnection();
  }
  socket.emit("message", {
    message
  });
}

export const recvMessage = (roomId) => {
  if(socket === null || socket.connected === false){
    initSocketConnection();
  }

  socket.on('recv_message', (msg) => {
    console.log("Receive Outside");
    const message = msg.message;
    if(message?.roomID === roomId){
      console.log("RECEIVE! Inside");
      return message;
    }
  })
  return null;
}