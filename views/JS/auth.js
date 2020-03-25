import { isLoggedin } from "./login1.js";
import { userInfo } from "./login1.js";

let token;
let expiresIn;
let fullName;
let isAuth;
export function getIsAuthenticated() {
  if (localStorage.getItem("token")) {
    isAuth = true;
  } else {
    isAuth = false;
  }
  return isAuth;
}

export function getUserInfo() {
  if (isLoggedin) {
    token = userInfo.fullName;
    fullName = userInfo.fullName;
    expiresIn = userInfo.expiresIn;
    const now = new Date();
    expiresIn = new Date(now.getTime() + expireIn * 1000);
  }
}

// function setAuthData(token, fullName, expiresIn) {
//   localStorage.setItem("token", token);
//   localStorage.setItem("fullName", fullName);
//   localStorage.setItem("expiresIn", expiresIn);
// }

export function getAuthData() {
  return {
    token: localStorage.getItem("token"),
    fullName: localStorage.getItem("fullName"),
    expiresIn: localStorage.getItem("expiresIn")
  };
}

// function clearAuthData() {
//   localStorage.removeItem("token");
//   localStorage.removeItem("fullName");
//   localStorage.removeItem("expiresIn");
// }

export function logout() {
  token = localStorage.removeItem("token");
  if (!token) {
    isLoggedin = false;
  }
}
