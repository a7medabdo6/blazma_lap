// Set config defaults when creating the instance
import Axios from "axios";
export default Axios.create({
  baseURL: "https://api.plasmalabs-eg.com/",
  withCredentials: true,
});
