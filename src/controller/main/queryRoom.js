import axios from "axios";
import {HOST} from '../../config/config'

//* Query All Rooms
export const queryAllRooms = async (
  userId
) => {
  const res = await axios.post(`${HOST}/room/query`, {
    hostId: userId
  });

  if(res.ok === false){
    return null;
  }

  return {
    room: res?.data
  }
}