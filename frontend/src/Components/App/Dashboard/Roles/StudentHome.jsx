import { MdAssignment } from "react-icons/md";
import { Link } from "react-router-dom";

const StudentHome = () => {
  const size = 40;

  const features = [
    {
      name: "Assignments",
      description: "View and complete available assignments",
      icon: <MdAssignment size={size} />,
      link: "/student/assignments",
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
