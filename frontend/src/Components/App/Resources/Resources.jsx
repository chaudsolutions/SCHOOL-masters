import { useParams } from "react-router-dom";
import { useResourcesByRoleData } from "../../Hooks/useQueryFetch/useQueryData";
import PageLoader from "../../Animations/PageLoader";
import { useEffect } from "react";

const Resources = () => {
  useEffect(() => {
    window.scroll(0, 0); // scroll to top on component mount
  }, []);

  const { role } = useParams();

  const { resourcesByRoleData, isResourcesByRoleDataLoading } =
    useResourcesByRoleData(role);

  if (isResourcesByRoleDataLoading) {
    return (
      <div className="loader-container">
        <PageLoader />
      </div>
    );
  }

  const { resources } = resourcesByRoleData || {};

  const resourcesList = resources?.map((resource) => (
    <li key={resource._id}>
      <h4>{resource.resourcesTitle}</h4>
      <p>{resource.resourcesDescription}</p>

      <p>{new Date(resource.createdAt).toDateString()}</p>
    </li>
  ));

  return (
    <div className="manageUsers">
      <h2>
        Hy! These are the resources available for you as a{" "}
        {role.toLocaleUpperCase()}
      </h2>

      {resourcesList?.length === 0 ? (
        <p>No resources available yet</p>
      ) : (
        <ul className="usersList">{resourcesList}</ul>
      )}
    </div>
  );
};

export default Resources;
