import axios from "axios";
import { localStorageToken, serVer } from "./useVariable";

// fetch user data from DB
export const fetchUser = async () => {
  const token = localStorage.getItem(localStorageToken);

  const response = await axios.get(`${serVer}/user/userObj`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Network response was not ok");
  }

  return response.data;
};

// fetch user data from DB
export const fetchUsers = async () => {
  const token = localStorage.getItem(localStorageToken);

  const response = await axios.get(`${serVer}/admin/getUsers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Network response was not ok");
  }

  return response.data;
};

// fetch random names using randomUser api
export const fetchRandomNames = async () => {
  const response = await axios.get("https://randomuser.me/api/?results=20");

  if (response.status !== 200) {
    throw new Error("Network response was not ok");
  }

  return response.data;
};

// fetch notifications and announcements
export const fetchNotifications = async () => {
  const token = localStorage.getItem(localStorageToken);

  const response = await axios.get(`${serVer}/user/notifications`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Network response was not ok");
  }

  return response.data;
};
