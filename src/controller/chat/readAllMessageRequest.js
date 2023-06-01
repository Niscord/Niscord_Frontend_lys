import axios from "axios";
import { HOST } from "../../config/config";

export const readAllMessageRequest = async (
  roomId
) => {
  const res = await axios.post(`${HOST}/chat/read`, {
    roomId
  });

  return res.data;
}