import { IoIosArrowForward } from "react-icons/io";
import useResponsive from "../../Hooks/useResponsive";
import { NavLink } from "react-router-dom";
import { useUserData } from "../../Hooks/useQueryFetch/useQueryData";
import { LuMessagesSquare } from "react-icons/lu";

const NavMenu = () => {
  const { userData, isUserDataLoading } = useUserData();

  const { _id, role } = userData || {};

  // responsive hook
  const isMobile = useResponsive();

  const navMenuArray = [
    {
      name: "Home",
      link: "/",
    },
  ];

  const navMenuOutput = navMenuArray.map((item, i) => (
    <li key={i}>
      <NavLink activeclassname="active" to={item.link}>
        <div>
          <h4>{item.name}</h4>
        </div>

        {isMobile && <IoIosArrowForward />}
      </NavLink>
    </li>
  ));

  return (
    <ul className="nav-menu-ul">
      {navMenuOutput}
      {(role === "admin" || role === "teacher") && (
        <li>
          <NavLink activeclassname="active" to="/messages">
            <div>
              <h4>
                {!isUserDataLoading && role === "admin" ? "Messages" : "Inbox"}
              </h4>
            </div>

            <LuMessagesSquare />
          </NavLink>
        </li>
      )}
      {(role === "student" || role === "parent") && (
        <li>
          <NavLink activeclassname="active" to={`/teacher/message/${_id}`}>
            <div>
              <h4>Chat with Teacher</h4>
            </div>

            <LuMessagesSquare />
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavMenu;
