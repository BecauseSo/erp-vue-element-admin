import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const InfoKey = 'User-Info'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserInfo(){
  let info = Cookies.get(InfoKey);
  if (info == null){
    return null;
  }
  let infoObj = JSON.parse(info);
  return infoObj;
}

export function setUserInfo(info) {
  return Cookies.set(InfoKey, info)
}

export function removeUserInfo(){
  return Cookies.remove(InfoKey);
}
