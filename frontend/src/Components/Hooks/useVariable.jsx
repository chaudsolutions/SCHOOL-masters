import { useEffect, useState } from "react";

export const localStorageToken = "schoolPlatformUser";

// backend api route
export const serVer = import.meta.env.VITE_API_LIVE;

export const useToken = () => {
  const [token, setToken] = useState(localStorageToken);

  useEffect(() => {
    const token = localStorage.getItem(localStorageToken);

    setToken(token);
  }, []);

  return { token };
};

export const roles = ["teacher", "student", "parent"];
