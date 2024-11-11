import { IoIosArrowForward } from "react-icons/io";
import useResponsive from "../../Hooks/useResponsive";
import { NavLink } from "react-router-dom";
import { useUserData } from "../../Hooks/useQueryFetch/useQueryData";
import { LuMessagesSquare } from "react-icons/lu";

const NavMenu = () => {
  const { userData, isUserDataLoading } = useUserData();

  const { role } = userData || {};

  // responsive hook
  const isMobile = useResponsive();

  const navMenuArray = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: !isUserDataLoading && role === "admin" ? "Messages" : "Inbox",
      link: "/messages",
    },
  ];

  const navMenuOutput = navMenuArray.map((item, i) => (
    <li key={i}>
      <NavLink activeclassname="active" to={item.link}>
        <div>
          <h4>{item.name}</h4>
          {isMobile && <p>{item.content}</p>}
        </div>

        {isMobile && item.link === "/messages" ? (
          <LuMessagesSquare />
        ) : (
          <IoIosArrowForward />
        )}
      </NavLink>
    </li>
  ));

  return <ul className="nav-menu-ul">{navMenuOutput}</ul>;
};

export default NavMenu;
