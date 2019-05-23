import React from "react";
import "./style.scss";

const Footer = () => (
  <footer>
    <div className="container">
      <div className="columns">
        <div className="column is-4 is-offset-4 footer-nav">
          <a href="/">Home</a> | <a href="/about">About</a> |{" "}
          <a href="/blog">Blog</a> | <a href="/contact">Contact</a>
        </div>
        <div className="column social">
          {/* <a href="https://www.facebook.com/dave.denes" target="_blank" rel="noopener noreferrer">
                <img src="/themes/default/img/icons/facebook-white.png" height="20" width="13" alt="FB"/>
              </a>
              <a href="http://www.twitter.com/chachidenes" target="_blank" rel="noopener noreferrer">
                <img src="/themes/default/img/icons/twitter-white.png" height="20" width="19" alt="Twitter" />
              </a>
              <a href="http://www.linkedin.com/in/chachidenes" target="_blank" rel="noopener noreferrer">
                <img src="/themes/default/img/icons/linkedin-white.png" height="20" width="20" alt="LinkedIn"/>
              </a>
              <a href="http://instagram.com/chachidenes" target="_blank" rel="noopener noreferrer">
                <img src="/themes/default/img/icons/instagram-white.png" height="20" width="20" alt="Instagram"/>
              </a> */}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
