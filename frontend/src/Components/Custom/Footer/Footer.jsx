import { Link } from "react-router-dom";
import logo from "/logo.png";

import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div>
        <img src={logo} alt="logo" />

        <ul>
          <li>
            <Link to="/about">ABOUT</Link>
          </li>
        </ul>
      </div>

      <div>EduNest Copyright © 2024</div>
    </div>
  );
};

export default Footer;
