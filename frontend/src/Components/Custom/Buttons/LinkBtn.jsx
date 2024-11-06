import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./buttons.css";

export const LinkOne = ({ linkDetails }) => {
  LinkOne.propTypes = {
    linkDetails: PropTypes.array.isRequired,
  };

  const { name, url } = linkDetails[0];

  return (
    <Link to={url} className="linkOne">
      {name}
    </Link>
  );
};

export const LinkTwo = ({ linkDetails }) => {
  LinkTwo.propTypes = {
    linkDetails: PropTypes.array.isRequired,
  };

  const { name, url } = linkDetails[0];

  return (
    <Link to={url} className="linkTwo">
      {name}
    </Link>
  );
};
