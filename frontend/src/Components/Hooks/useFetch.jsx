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
export const fetchUsers = async (userType) => {
  const token = localStorage.getItem(localStorageToken);

  const response = await axios.get(`${serVer}/user/getUsers/${userType}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Network response was not ok");
  }

  return response.data;
};

// endpoint to fetch user by Id
export const fetchUserById = async (userId) => {
  const token = localStorage.getItem(localStorageToken);

  const response = await axios.get(`${serVer}/teacher/userDetails/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

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

// endpoint to fetch surveys
export const fetchSurveys = async () => {
  const token = localStorage.getItem(localStorageToken);

  const response = await axios.get(`${serVer}/user/surveys`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Network response was not ok");
  }

  return response.data;
};

// endpoint to fetch each survey
export const fetchSurvey = async (surveyId) => {
  const token = localStorage.getItem(localStorageToken);

  const response = await axios.get(`${serVer}/user/survey/${surveyId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Network response was not ok");
  }

  return response.data;
};

// hook to fetch resources by role
export const fetchResources = async (role) => {
  const token = localStorage.getItem(localStorageToken);

  const response = await axios.get(`${serVer}/user/resources/${role}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Network response was not ok");
  }

  return response.data;
};

// hook to fetch messages
export const fetchMessages = async () => {
  const token = localStorage.getItem(localStorageToken);

  const response = await axios.get(`${serVer}/user/messages`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Network response was not ok");
  }

  return response.data;
};

// endpoint to fetch assignments
export const fetchAssignments = async () => {
  const token = localStorage.getItem(localStorageToken);

  const response = await axios.get(`${serVer}/user/assignments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Network response was not ok");
  }

  return response.data;
};

// endpoint to fetch assignment by Id
export const fetchAssignmentById = async (assignmentId) => {
  const token = localStorage.getItem(localStorageToken);

  const response = await axios.get(
    `${serVer}/user/assignment/${assignmentId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error("Network response was not ok");
  }

  return response.data;
};
