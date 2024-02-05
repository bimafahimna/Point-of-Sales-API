import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export const register = (user) => {
  return instance.post("/register", user);
};

export const login = (credentials) => {
  return instance.post("/login", credentials);
};

export const logout = () => {
  return instance.post("/logout");
};
