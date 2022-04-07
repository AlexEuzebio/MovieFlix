import jwtDecode from "jwt-decode"
import { getAuthData } from "./storage"

export type Role = "ROLE_VISITOR" | "ROLE_MEMBER";

export type AccessTokenData = {
  exp: number;
  user_name: string;
  authorities: Role[];
}

export const getAccessTokenData = () : AccessTokenData | undefined => {
  try {
    return jwtDecode(getAuthData().access_token) as AccessTokenData;
  } catch {
    return undefined;
  }
}

export const isAuthenticated = () => {
  const accessTokenData = getAccessTokenData();
  return (accessTokenData && ((accessTokenData.exp * 1000) > Date.now())) ? true : false;
}

export const hasAnyHoles = (roles: Role[]) => {

  if (roles.length === 0) {
    return true;
  }
  const accessTokenData = getAccessTokenData(); 
  if (accessTokenData !== undefined) {
    const authorities = accessTokenData.authorities;
    return roles.some( role => authorities.includes(role) );
  } else {
    return false;
  }
  
}