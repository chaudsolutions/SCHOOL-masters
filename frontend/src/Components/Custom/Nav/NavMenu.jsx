import { IoIosArrowForward } from "react-icons/io";
import useResponsive from "../../Hooks/useResponsive";
import { NavLink } from "react-router-dom";
import { useUserData } from "../../Hooks/useQueryFetch/useQueryData";
import { CiSettings } from "react-icons/ci";

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
  ];

  const navMenuOutput = navMenuArray.map((item, i) => (
    <li key={i}>
      <NavLink activeclassname="active" to={item.link}>
        <div>
          <h4>{item.name}</h4>
          {isMobile && <p>{item.content}</p>}
        </div>

        {isMobile && <IoIosArrowForward />}
      </NavLink>
    </li>
  ));

  return (
    <ul className="nav-menu-ul">
      {navMenuOutput}

      {!isUserDataLoading && role === "admin" && (
        <li>
          <NavLink activeclassname="active" to="/admin">
            <strong>Admin</strong>
            <CiSettings size={20} />
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavMenu;
