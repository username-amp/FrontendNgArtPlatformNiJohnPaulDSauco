
import axios from "axios";


const axiosInstance = axios.create({
  baseURL: "http://localhost:8002/api/v2",
  withCredentials: true,
});

const getTokenFromCookies = () => {
  const cookie = document.cookie
    .split(";")
    .find((cookie) => cookie.trim().startsWith("token="));

  if (cookie) {
    const token = cookie.split("=")[1];
    console.log("Token found in cookies:", token);
    return token;
  }

  console.log("Token not found in cookies");
  return null;
};

axiosInstance.interceptors.request.use(
  (req) => {
    const token = getTokenFromCookies();
    console.log("Token added to request:", token);

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log("No token available");
    }

    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
