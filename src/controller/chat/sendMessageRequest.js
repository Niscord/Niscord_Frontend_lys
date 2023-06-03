import axios from "axios";
import { HOST } from "../../config/config";

export const sendMessageRequest = async(
  senderId,
  roomId,
  message,
) => {
  const res = await axios.post(`${HOST}/chat/send`, {
    senderId,
    roomId,
    payload: message
  });

  return res?.data;
}