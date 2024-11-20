import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";

const ParentHome = () => {
  const size = 40;

  const features = [
    {
      name: "Overview",
      description: "View and manage your children's information",
      link: "/parent/overview",
      icon: <MdDashboard size={size} />,
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

export default ParentHome;
