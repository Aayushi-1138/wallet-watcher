import React from "react";
import "./header.css";
import watcherLogo from "../../assets/images/watcher.png";

const Header = () => {
  return (
    <div className="header-container">
      <div className="header">
        <div
          className="header-logo"
          style={{ textAlign: "left", fontWeight: "bold" }}
        >
          <img src={watcherLogo} alt="watcher" className="watcher-logo" />
          Wallet Watcher
          <i className="fi-rr-credit-card" />
        </div>
        <div className="header-button">
          <a
            href="https://github.com/Aayushi-1138"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="devicon-github-original colored" />
            DEV
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
