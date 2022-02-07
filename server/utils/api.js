import axios from "axios";
import { API_ENDPOINT } from "./constants.js";

export async function getProfile(label) {
  try {
    const profile = (
      await axios.get(`${API_ENDPOINT}/profile/${label}`)
    ).data;
    return profile;
  } catch (error) {
    console.log(error);
  }
}