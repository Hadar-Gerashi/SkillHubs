import React from 'react';
import { FaFacebook, FaTwitter, FaYoutube, FaMedium } from 'react-icons/fa';

import './footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <p style={{color:'white',fontSize:"20px"}}>SkillHub</p>
            {/* <img src="../dist/images/hh.png" alt="hh" width="150px" height="120px" /> */}

            <p className="footer-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              lobortis.
            </p>
            <div className="social-icons">
              <a href="#" className="social-icon">
                <FaFacebook />
              </a>
              <a href="#" className="social-icon">
                <FaTwitter />
              </a>
              <a href="#" className="social-icon">
                <FaYoutube />
              </a>
              <a href="#" className="social-icon">
                <FaMedium />
              </a>
            </div>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Useful Links</h3>
            <ul className="footer-links">
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Pricing</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Terms</h3>
            <ul className="footer-links">
              <li>
                <a href="#">TOS</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Refund Policy</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Support & Help</h3>
            <ul className="footer-links">
              <li>
                <a href="#">Open Support Ticket</a>
              </li>
              <li>
                <a href="#">Terms of Use</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom" style={{ borderTop: '1px solid #ddd', width: "100%" }}>
          <p style={{ marginTop: "20px", textAlign: "center", fontSize: "14px", color: "white" }}>
            <span style={{ display: "inline-flex", alignItems: "center", marginRight: "5px", justifyContent: "center", width: "20px", height: "20px", border: "1px solid white", borderRadius: "50%", fontWeight: "bold", color: "white", backgroundColor: "#333", fontSize: "14px" }}>
              C
            </span>
            All rights reserved to <strong style={{ color: "#4a8fff" }}>SkillHub</strong>
          </p>      </div>
      </div>
      <div className="footer-divider"></div>
    </footer>
  );
}

export default Footer;