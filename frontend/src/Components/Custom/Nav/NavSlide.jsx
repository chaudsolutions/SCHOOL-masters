import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import NavMenu from "./NavMenu";
import Logout from "../Buttons/Logout";
import { IoIosArrowForward } from "react-icons/io";
import { useAuthContext } from "../../Context/AuthContext";
import { useUserData } from "../../Hooks/useQueryFetch/useQueryData";
import { FaUserCircle } from "react-icons/fa";
import { LinkOne, LinkTwo } from "../Buttons/LinkBtn";
import useResponsive from "../../Hooks/useResponsive";

const NavSlide = ({ navFunc }) => {
  const { isNavActive } = navFunc[0];

  const { user } = useAuthContext();

  return (
    <div className={`navSlide ${isNavActive ? "activeNav" : ""}`}>
      {user && (
        <div className="profile-link">
          <UserProfile />
        </div>
      )}
      {user && <NavMenu />}

      <AuthContainer userProp={[user]} />
    </div>
  );
};

export const AuthContainer = ({ userProp }) => {
  const user = userProp[0];

  return (
    <>
      <div className="auth-btn">
        {user ? (
          <Logout />
        ) : (
          <>
            <LinkOne linkDetails={[{ name: "Register", url: "/register" }]} />
            <LinkTwo linkDetails={[{ name: "Login", url: "/login" }]} />
          </>
        )}
      </div>
    </>
  );
};

export const UserProfile = () => {
  // responsive hook
  const isMobile = useResponsive();

  const profileLink = window.location.pathname === "/profile";

  const { userData, isUserDataLoading } = useUserData();

  const { name } = userData || {};

  return (
    <div className="profile-DP">
      <FaUserCircle size={isMobile ? 70 : 40} />

      {profileLink ? (
        <strong>{isUserDataLoading ? "" : name}</strong>
      ) : (
        <Link to="/profile">
          <span>My Profile</span>
          <IoIosArrowForward size={20} />
        </Link>
      )}
    </div>
  );
};

UserProfile.propTypes = {
  userProp: PropTypes.array,
};

AuthContainer.propTypes = {
  userProp: PropTypes.array,
};

NavSlide.propTypes = {
  navFunc: PropTypes.array.isRequired,
};

export default NavSlide;
