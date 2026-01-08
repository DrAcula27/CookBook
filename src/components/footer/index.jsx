import React from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer>
      <p>
        © {new Date().getFullYear()}{" "}
        <span>
          Crafted with <FontAwesomeIcon icon={faHeart} /> by{" "}
        </span>
        DrAcula27
      </p>
      <p>
        <a href="https://github.com/DrAcula27" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faGithub} />
        </a>{" "}
        <a
          href="https://www.linkedin.com/in/daniellerandrews/"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
      </p>
    </footer>
  );
};

export default Footer;
