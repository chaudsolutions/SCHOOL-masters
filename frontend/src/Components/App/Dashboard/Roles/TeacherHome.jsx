import { MdAssignment, MdManageAccounts } from "react-icons/md";
import { Link } from "react-router-dom";

const TeacherHome = () => {
  const size = 40;

  const features = [
    {
      name: "Overview",
      description: "Classes and Students management dashboard",
      icon: <MdManageAccounts size={size} />,
      link: "/teacher/overview",
    },
    {
      name: "Assignments",
      description: "Create and Grade Assignments",
      icon: <MdAssignment size={size} />,
      link: "/teacher/assignments",
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

export default TeacherHome;
