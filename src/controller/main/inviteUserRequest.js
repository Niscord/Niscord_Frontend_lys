import axios from "axios";
import { HOST } from "../../config/config";

export const inviteUserRequest = async (
  username,
  inviteRoom
) => {
  const res = await axios.post(`${HOST}/room/invite`, {
    username,
    roomId: inviteRoom
  });

  return res?.data;
}