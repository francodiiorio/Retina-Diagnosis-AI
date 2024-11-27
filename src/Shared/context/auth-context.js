import { createContext } from "react";

export const AuthContext = createContext({
  isLogged: false,
  userId: null,
  username: null,
  email: null,
  token: null,
  login: () => { },
  logout: () => { }
});
