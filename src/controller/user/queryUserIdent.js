import axios from "axios";
import { HOST } from "../../config/config";

export const queryUserIdent = async(
  username
) => {
  const res = await axios.post(
    `${HOST}/user/queryIdent`,
    {username}
  );

  if(res?.data?.ok === false){
    return null;
  }

  return res?.data?.ident;
}