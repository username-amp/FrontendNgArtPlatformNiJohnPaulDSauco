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

    return token;
  }

  return null;
};

axiosInstance.interceptors.request.use(
  (req) => {
    const token = getTokenFromCookies();

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    } else {
    }

    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
