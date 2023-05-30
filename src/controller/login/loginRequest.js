import axios from "axios";
import { HOST } from "../../config/config";

export const loginRequest = async (
  ident,
  password
) => {
  const res = await axios.post(`${HOST}/login`, {
    ident,
    password
  });

  return res?.data;
}