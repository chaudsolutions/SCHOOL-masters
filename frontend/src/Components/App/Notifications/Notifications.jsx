import toast from "react-hot-toast";
import PageLoader from "../../Animations/PageLoader";
import {
  useNotificationsData,
  useUserData,
} from "../../Hooks/useQueryFetch/useQueryData";
import axios from "axios";
import { serVer, useToken } from "../../Hooks/useVariable";
import { useState } from "react";

const Notifications = () => {
  const [deleteBtn, setDeleteBtn] = useState(false);
  const { userData, isUserDataLoading } = useUserData();

  const { token } = useToken();

  const {
    notificationsData,
    isNotificationsDataLoading,
    refetchNotificationsData,
  } = useNotificationsData();

  if (isNotificationsDataLoading || isUserDataLoading) {
    return (
      <div className="loader-container">
        <PageLoader />
      </div>
    );
  }

  const { role } = userData || {};

  const notificationsList = notificationsData?.map((notification) => {
    const deleteNotification = async () => {
      const userConfirm = confirm(`Are you sure you want to delete`);

      if (userConfirm) {
        setDeleteBtn(true);
        try {
          const res = await axios.delete(
            `${serVer}/admin/deleteAnnouncement/${notification._id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          await refetchNotificationsData();

          toast.success(res.data);
        } catch (error) {
          toast.error(error.response.data);
        } finally {
          setDeleteBtn(false);
        }
      }
    };

    return (
      <li key={notification._id}>
        <h4>{notification.subject}</h4>
        <p>{notification.announcement}</p>
        <p>created at {new Date(notification.createdAt).toLocaleString()}</p>
        {role === "admin" && (
          <button onClick={deleteNotification}>
            {deleteBtn ? "wait..." : "Delete"}
          </button>
        )}
      </li>
    );
  });

  return (
    <div className="manageUsers">
      <h2>Notifications</h2>

      {notificationsData.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        <ul className="usersList">{notificationsList}</ul>
      )}
    </div>
  );
};

export default Notifications;
