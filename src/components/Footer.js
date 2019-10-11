import React from "react";
import "../style/Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-links">
        <a href="https://github.com/mibrah42">
          <i className="fab fa-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/mohamed-ibrahim42/">
          <i className="fab fa-linkedin"></i>
        </a>
      </div>
      <div className="footer-copyright">
        This app is made with <i className="fas fa-heart"></i> by Mohamed
        Ibrahim. For other projects, please visit{" "}
        <a href="http://mohamedibrahim.ca/">mohamedibrahim.ca</a>.
      </div>
    </div>
  );
}
