// Set config defaults when creating the instance
import Axios from "axios";
export default Axios.create({
  baseURL: "https://142.93.173.111/api/",
  withCredentials: true,
});
