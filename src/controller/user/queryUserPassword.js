import axios from "axios";
import { HOST } from "../../config/config";

export const queryUserPassword = async(
  ident
) => {
  const res = await axios.post(
    `${HOST}/user/queryPassword`,
    {ident}
  );
  
  if(res?.data?.ok === false){
    return null;
  }

  return res?.data?.password;
}