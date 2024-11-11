import Logout from "../../Custom/Buttons/Logout";
import { UserProfile } from "../../Custom/Nav/NavSlide";

const Profile = () => {
  return (
    <div className="manageUsers">
      <div className="profileBox">
        <UserProfile />
      </div>

      <Logout />
    </div>
  );
};

export default Profile;
