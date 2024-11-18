import { useQuery } from "@tanstack/react-query";
import {
  fetchAssignmentById,
  fetchAssignments,
  fetchExams,
  fetchMessages,
  fetchNotifications,
  fetchResources,
  fetchStudentsGroupChatMessages,
  fetchSurvey,
  fetchSurveys,
  fetchUser,
  fetchUserById,
  fetchUsers,
} from "../useFetch";
import { useAuthContext } from "../../Context/AuthContext";

// fetch user details
export const useUserData = () => {
  const { user } = useAuthContext();

  const {
    data: userData,
    isLoading: isUserDataLoading,
    isError: isUserDataError,
    refetch: refetchUserData,
  } = useQuery({
    queryKey: ["user"], // Use the new object-based syntax
    queryFn: fetchUser,
    enabled: !!user,
  });

  return { userData, isUserDataLoading, isUserDataError, refetchUserData };
};

// fetch all users details
export const useAllUsersData = (userType) => {
  const { user } = useAuthContext();

  const {
    data: allUsersData,
    isLoading: isAllUsersDataLoading,
    isError: isAllUsersDataError,
    refetch: refetchAllUsersData,
  } = useQuery({
    queryKey: ["allUsers"], // Use the new object-based syntax
    queryFn: () => fetchUsers(userType),
    enabled: !!user,
  });

  return {
    allUsersData,
    isAllUsersDataLoading,
    isAllUsersDataError,
    refetchAllUsersData,
  };
};

// use get user by ID data
export const useUserByIdData = (userId) => {
  const { user } = useAuthContext();

  const {
    data: userByIdData,
    isLoading: isUserByIdDataLoading,
    isError: isUserByIdDataError,
    refetch: refetchUserById,
  } = useQuery({
    queryKey: ["userId", userId],
    queryFn: () => fetchUserById(userId),
    enabled: !!user,
  });

  return {
    userByIdData,
    isUserByIdDataLoading,
    isUserByIdDataError,
    refetchUserById,
  };
};

// use get notifications data
export const useNotificationsData = () => {
  const { user } = useAuthContext();

  const {
    data: notificationsData,
    isLoading: isNotificationsDataLoading,
    isError: isNotificationsDataError,
    refetch: refetchNotificationsData,
  } = useQuery({
    queryKey: ["notifications"], // Use the new object-based syntax
    queryFn: fetchNotifications,
    enabled: !!user,
  });

  return {
    notificationsData,
    isNotificationsDataLoading,
    isNotificationsDataError,
    refetchNotificationsData,
  };
};

// use get surveys data
export const useSurveyData = () => {
  const { user } = useAuthContext();

  const {
    data: surveyData,
    isLoading: isSurveyDataLoading,
    isError: isSurveyDataError,
    refetch: refetchSurveyData,
  } = useQuery({
    queryKey: ["survey"], // Use the new object-based syntax
    queryFn: fetchSurveys,
    enabled: !!user,
  });

  return {
    surveyData,
    isSurveyDataLoading,
    isSurveyDataError,
    refetchSurveyData,
  };
};

// use get surveyId data
export const useSurveyIdData = (surveyId) => {
  const { user } = useAuthContext();

  const {
    data: surveyIdData,
    isLoading: isSurveyIdDataLoading,
    isError: isSurveyIdDataError,
    refetch: refetchSurveyIdData,
  } = useQuery({
    queryKey: ["surveyId", surveyId], // Use the new object-based syntax
    queryFn: () => fetchSurvey(surveyId),
    enabled: !!user,
  });

  return {
    surveyIdData,
    isSurveyIdDataLoading,
    isSurveyIdDataError,
    refetchSurveyIdData,
  };
};

// use get resources by role data
export const useResourcesByRoleData = (role) => {
  const { user } = useAuthContext();

  const {
    data: resourcesByRoleData,
    isLoading: isResourcesByRoleDataLoading,
    isError: isResourcesByRoleDataError,
    refetch: refetchResourcesByRoleData,
  } = useQuery({
    queryKey: ["resourcesByRole", role], // Use the new object-based syntax
    queryFn: () => fetchResources(role),
    enabled: !!user,
  });

  return {
    resourcesByRoleData,
    isResourcesByRoleDataLoading,
    isResourcesByRoleDataError,
    refetchResourcesByRoleData,
  };
};

// use get messages data
export const useMessagesData = () => {
  const { user } = useAuthContext();

  const {
    data: messagesData,
    isLoading: isMessagesDataLoading,
    isError: isMessagesDataError,
    refetch: refetchMessages,
  } = useQuery({
    queryKey: ["messages"],
    queryFn: fetchMessages,
    enabled: !!user,
  });

  return {
    messagesData,
    isMessagesDataLoading,
    isMessagesDataError,
    refetchMessages,
  };
};

// use get students group chat messages data
export const useStudentsGroupChatMessagesData = () => {
  const { user } = useAuthContext();

  const {
    data: studentsGroupChatMessagesData,
    isLoading: isStudentsGroupChatMessagesDataLoading,
    isError: isStudentsGroupChatMessagesDataError,
    refetch: refetchStudentsGroupChatMessages,
  } = useQuery({
    queryKey: ["studentsGroupChatMessages"],
    queryFn: fetchStudentsGroupChatMessages,
    enabled: !!user,
  });

  return {
    studentsGroupChatMessagesData,
    isStudentsGroupChatMessagesDataLoading,
    isStudentsGroupChatMessagesDataError,
    refetchStudentsGroupChatMessages,
  };
};

// use get assignments data
export const useAssignmentsData = () => {
  const { user } = useAuthContext();

  const {
    data: assignmentsData,
    isLoading: isAssignmentsDataLoading,
    isError: isAssignmentsDataError,
    refetch: refetchAssignments,
  } = useQuery({
    queryKey: ["assignments"],
    queryFn: fetchAssignments,
    enabled: !!user,
  });

  return {
    assignmentsData,
    isAssignmentsDataLoading,
    isAssignmentsDataError,
    refetchAssignments,
  };
};

// use get assignments by ID data
export const useAssignmentsByIdData = (assignmentId) => {
  const { user } = useAuthContext();

  const {
    data: assignmentByIdData,
    isLoading: isAssignmentByIdDataLoading,
    isError: isAssignmentByIdDataError,
    refetch: refetchAssignmentById,
  } = useQuery({
    queryKey: ["assignment", assignmentId],
    queryFn: () => fetchAssignmentById(assignmentId),
    enabled: !!user,
  });

  return {
    assignmentByIdData,
    isAssignmentByIdDataLoading,
    isAssignmentByIdDataError,
    refetchAssignmentById,
  };
};

// use get exams data
export const useExamsData = () => {
  const { user } = useAuthContext();

  const {
    data: examsData,
    isLoading: isExamsDataLoading,
    isError: isExamsDataError,
    refetch: refetchExams,
  } = useQuery({
    queryKey: ["exams"],
    queryFn: fetchExams,
    enabled: !!user,
  });

  return {
    examsData,
    isExamsDataLoading,
    isExamsDataError,
    refetchExams,
  };
};
