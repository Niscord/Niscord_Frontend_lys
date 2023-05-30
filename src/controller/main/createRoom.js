import axios from "axios";
import { HOST } from "../../config/config";

export const generateRoomRequest = async (
  userId,
  setRoomList,
  roomList
) => {
  const res = await axios.post(`${HOST}/room/create`, {
    hostId: userId,
  });

  if(res.data?.ok === true){
    return res?.data?.room
  };
  
  return null;
}