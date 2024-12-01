import { useCallback, useEffect, useState } from "react";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);

  const login = useCallback((uid, name, token, userEmail, expirationDate) => {
    setToken(token);
    setUserId(uid);
    setUsername(name);
    setEmail(userEmail);
    const tokenExpiry =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60); // 1 hora
    setTokenExpirationDate(tokenExpiry);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        username: name,
        email: userEmail,
        expiration: tokenExpiry.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setUsername(null);
    setEmail(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.username,
        storedData.token,
        storedData.email,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return { token, login, logout, userId, username, email };
};
