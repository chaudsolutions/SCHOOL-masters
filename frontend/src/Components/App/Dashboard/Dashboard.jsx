import PageLoader from "../../Animations/PageLoader";
import { useUserData } from "../../Hooks/useQueryFetch/useQueryData";
import AdminHome from "./Roles/AdminHome";
import ParentHome from "./Roles/ParentHome";
import "./roles.css";
import StudentHome from "./Roles/StudentHome";
import TeacherHome from "./Roles/TeacherHome";
import { MdNotificationsNone } from "react-icons/md";
import { Link } from "react-router-dom";
import { FcSurvey } from "react-icons/fc";
import { GrAnnounce } from "react-icons/gr";

const Dashboard = () => {
  const { userData, isUserDataLoading } = useUserData();

  const { role } = userData || {};

  if (isUserDataLoading) {
    return (
      <div className="loader-container">
        <PageLoader />
      </div>
    );
  }

  const size = 40;

  const features = [
    {
      name: "Notifications",
      description:
        role !== "admin"
          ? "Stay updated to notifications and announcements"
          : "Manage notifications and announcements",
      icon: <MdNotificationsNone size={size} />,
      link: "/notifications",
    },
    {
      name: "Surveys",
      description:
        role === "admin"
          ? "Create Surveys to gather feedbacks"
          : "Answers surveys and provide feedbacks",
      icon: <FcSurvey size={size} />,
      link: role === "admin" ? "/admin/surveys" : "/surveys",
    },
    {
      name: role === "admin" ? "Resources Mgt" : "Resources",
      description:
        role === "admin"
          ? "School learning resources, guidelines, handbooks"
          : "Find the resources available to you",
      icon: <GrAnnounce size={size} />,
      link:
        role === "admin" ? "/admin/resources-management" : `/${role}/resources`,
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

  return (
    <>
      <ul className="roles-dashboard">{featuresList}</ul>

      {role === "admin" && <AdminHome />}
      {role === "teacher" && <TeacherHome />}
      {role === "student" && <StudentHome />}
      {role === "parent" && <ParentHome />}
    </>
  );
};

export default Dashboard;
