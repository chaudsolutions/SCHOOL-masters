import { MdAssignment, MdDashboard } from "react-icons/md";
import { GiStairsGoal } from "react-icons/gi";
import { Link } from "react-router-dom";
import { IoIosChatboxes } from "react-icons/io";

const StudentHome = () => {
  const size = 40;

  const features = [
    {
      name: "Assignments",
      description: "View and complete available assignments",
      icon: <MdAssignment size={size} />,
      link: "/student/assignments",
    },
    {
      name: "Dashboard",
      description: "Overview of grades, performance, upcoming exams, etc",
      icon: <MdDashboard size={size} />,
      link: "/student/personalized-dashboard",
    },
    {
      name: "Goals",
      description: "Set academic goals and track progress",
      icon: <GiStairsGoal size={size} />,
      link: "/student/goals",
    },
    {
      name: "ChatRoom",
      description: "Group Chat and ask your peers academic questions",
      icon: <IoIosChatboxes size={size} />,
      link: "/student/chatroom",
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

export default StudentHome;
