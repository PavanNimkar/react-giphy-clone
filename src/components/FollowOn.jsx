import React from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faSquareLinkedin } from "@fortawesome/free-brands-svg-icons";

const FollowOn = () => {
  return (
    <div className="faded-text pt-2">
      <span>Follow On</span>
      <div className="flex pt-3 gap-2">
        <a href="https://www.linkedin.com/in/pavan-nimkar/" target="_blank">
          <FontAwesomeIcon icon={faSquareLinkedin} size="lg" />
        </a>
        <a href="https://www.github.com/PavanNimkar" target="_blank">
          <FontAwesomeIcon icon={faGithub} size="lg" />
        </a>
      </div>
    </div>
  );
};

export default FollowOn;
