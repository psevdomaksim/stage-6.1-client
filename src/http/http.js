import axios from "axios";

const $host = axios.create({
  baseURL: "https://stage-6-1-server.vercel.app",
});

export { $host };
