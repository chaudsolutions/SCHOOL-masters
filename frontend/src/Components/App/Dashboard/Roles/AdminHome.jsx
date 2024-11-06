import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./admin.css";
import { IoMdAnalytics } from "react-icons/io";
import { GrAnnounce } from "react-icons/gr";

const AdminHome = () => {
  const size = 40;

  const features = [
    {
      name: "Users",
      description: "Manage user accounts and permissions",
      icon: <FaUser size={size} />,
      link: "/admin/users",
    },
    {
      name: "Analytics",
      description: "performance, attendance, behavior etc",
      icon: <IoMdAnalytics size={size} />,
      link: "/admin/analytics",
    },
    {
      name: "Announcements",
      description: "Create and send announcements & notifications",
      icon: <GrAnnounce size={size} />,
      link: "/admin/announcements",
    },
  ];

  const featuresList = features.map((feature, i) => (
    <li key={i}>
      <Link to={feature.link}>
        <div>
          <h4>{feature.name}</h4>
          {feature.icon}
        </div>
        <p>{feature.description}</p>
      </Link>
    </li>
  ));

  return <ul className="roles-dashboard">{featuresList}</ul>;
};

export default AdminHome;
