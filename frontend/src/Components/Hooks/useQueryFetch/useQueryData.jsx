import { useQuery } from "@tanstack/react-query";
import {
  fetchNotifications,
  fetchRandomNames,
  fetchUser,
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
export const useAllUsersData = () => {
  const { user } = useAuthContext();

  const {
    data: allUsersData,
    isLoading: isAllUsersDataLoading,
    isError: isAllUsersDataError,
    refetch: refetchAllUsersData,
  } = useQuery({
    queryKey: ["allUsers"], // Use the new object-based syntax
    queryFn: fetchUsers,
    enabled: !!user,
  });

  return {
    allUsersData,
    isAllUsersDataLoading,
    isAllUsersDataError,
    refetchAllUsersData,
  };
};

// use random users details
export const useRandomUsersData = () => {
  const { user } = useAuthContext();

  const {
    data: randomUsersData,
    isLoading: isRandomUsersDataLoading,
    isError: isRandomUsersDataError,
    refetch: refetchRandomUsersData,
  } = useQuery({
    queryKey: ["randomUsers"], // Use the new object-based syntax
    queryFn: fetchRandomNames,
    enabled: !!user,
  });

  return {
    randomUsersData,
    isRandomUsersDataLoading,
    isRandomUsersDataError,
    refetchRandomUsersData,
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
