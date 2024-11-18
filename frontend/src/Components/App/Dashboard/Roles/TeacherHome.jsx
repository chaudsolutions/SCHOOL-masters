import { FaPeopleRoof } from "react-icons/fa6";
import { MdAssignment, MdManageAccounts } from "react-icons/md";
import { PiExam } from "react-icons/pi";
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
    {
      name: "Individuals",
      description: "Students and Parents",
      icon: <FaPeopleRoof size={size} />,
      link: "/teacher/individuals",
    },
    {
      name: "Exams",
      description: "Create and set exams date",
      icon: <PiExam size={size} />,
      link: "/teacher/exams",
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
