import axios from "axios";
import { HOST } from "../../config/config";

export const queryUserId = async (
  username
) => {
  const res = await axios.post(`${HOST}/user/queryId`, {
    username
  });

  if(res.data.ok === false){
    return null;
  }

  return res?.data?.userId;
}