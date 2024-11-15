import { useEffect } from "react";
import Logout from "../../Custom/Buttons/Logout";
import { UserProfile } from "../../Custom/Nav/NavSlide";
import { useUserData } from "../../Hooks/useQueryFetch/useQueryData";
import PageLoader from "../../Animations/PageLoader";

const Profile = () => {
  useEffect(() => {
    window.scroll(0, 0); // scroll to top on component mount
  }, []);

  const { userData, isUserDataLoading } = useUserData();

  const { role } = userData || {};

  if (isUserDataLoading) {
    return (
      <div className="loader-container">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="manageUsers">
      <div className="profileBox">
        <UserProfile />
      </div>

      <strong>role: {role}</strong>

      <Logout />
    </div>
  );
};

export default Profile;
