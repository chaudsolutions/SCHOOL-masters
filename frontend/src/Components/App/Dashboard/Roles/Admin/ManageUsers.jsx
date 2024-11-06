import { useState } from "react";
import PageLoader from "../../../../Animations/PageLoader";
import { useAllUsersData } from "../../../../Hooks/useQueryFetch/useQueryData";
import { roles, serVer, useToken } from "../../../../Hooks/useVariable";
import toast from "react-hot-toast";
import axios from "axios";

const ManageUsers = () => {
  const [view, setView] = useState("student");
  const [roleLoading, setRoleLoading] = useState(false);

  const { token } = useToken();

  const { allUsersData, isAllUsersDataLoading, refetchAllUsersData } =
    useAllUsersData();

  if (isAllUsersDataLoading) {
    return (
      <div className="loader-container">
        <PageLoader />
      </div>
    );
  }

  // Filter users based on the selected view
  const filteredUsers = allUsersData?.filter(
    (user) => user.role.toLowerCase() === view
  );

  // Render filtered users
  const usersList = filteredUsers?.map((user) => {
    const toggleRole = async (e) => {
      const role = e.target.value;

      if (!role) {
        toast.error("Select a role");
      }

      setRoleLoading(true);

      // Update the user's role in the database
      try {
        const res = await axios.put(
          `${serVer}/admin/updateRole/${user._id}/${role}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const { data } = res;

        await refetchAllUsersData();

        toast.success(data);
      } catch (error) {
        toast.error(error.response.data);
      } finally {
        setRoleLoading(false);
      }
    };

    return (
      <li key={user._id}>
        <h4>Name: {user.name}</h4>
        <p>Role: {roleLoading ? "loading..." : user.role}</p>
        <p>Email: {user.email}</p>
        <select onChange={toggleRole}>
          <option value="">Update role</option>
          {roles.map((role, i) => (
            <option key={i} value={role}>
              {role}
            </option>
          ))}
        </select>
      </li>
    );
  });

  return (
    <div className="manageUsers">
      <div className="toggleBtn">
        <button
          className={`${view === "student" && "activeBtn"}`}
          onClick={() => {
            setView("student");
          }}>
          Students
        </button>
        <button
          className={`${view === "teacher" && "activeBtn"}`}
          onClick={() => {
            setView("teacher");
          }}>
          Teachers
        </button>
        <button
          className={`${view === "parent" && "activeBtn"}`}
          onClick={() => {
            setView("parent");
          }}>
          Parents
        </button>
      </div>

      <ul className="usersList">{usersList}</ul>
    </div>
  );
};

export default ManageUsers;
