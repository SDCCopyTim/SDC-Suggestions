import React from 'react';

const Footer = (props) => (
  <footer>
    <div className="footer-container">
      <div className="footer-container-header footer-section">
        <div className="footer-logo">
          <img src="https://timcamp-image-storage.s3-us-west-1.amazonaws.com/logos/TimCamp_Logo-01.png" alt="Logo" />
        </div>
      </div>
      <div className="footer-container-body footer-section">
        <div className="hipcamp-info-section">
          <div className="hipcamp-info-lists">
            <div className="hipcamp-about footer-list-wrapper">
              <h2 className="footer-title">About us</h2>
              <ul className="footer-list">
                <li><a>Careers</a></li>
                <li><a>Journal</a></li>
                <li><a>Gift Cards</a></li>
                <li><a>Contact</a></li>
                <li><a>Timcamper FAQ</a></li>
              </ul>
            </div>
            <div className="hipcamp-hosting footer-list-wrapper">
              <h2 className="footer-title">Hosting</h2>
              <ul className="footer-list">
                <li><a>Becoming a Host</a></li>
                <li><a>is my land a fit?</a></li>
                <li><a>Insurance</a></li>
                <li><a>Standards</a></li>
                <li><a>Hosting FAQ</a></li>
              </ul>
            </div>
          </div>
          <div className="app-container-cta">
            <h4>Download the Timcamp App</h4>
            <div className="img-container">
              <img src="https://djqvcbmmgpti5.cloudfront.net/assets/common/app-store-badge-3553eca9076e63b62db956dc4d32396e673b265e3f4bf8727629d92b0121ee30.svg" alt="App store badge" />
              <img src="https://djqvcbmmgpti5.cloudfront.net/assets/common/google-play-badge-3ff7eaebdea562984672c83155d68c46df3b208b0f15f9f6ca2df81625760f71.svg" alt="Google play badge" />
            </div>
          </div>
        </div>
        <div className="dynamic-footer-section">
          <div className="footer-home-body">
            <h2 className="footer-title">Timcamp is the most comprehensive resource for unique outdoor stays.</h2>
            <p className="footer-home-body-copy">
              Discover and book tent camping, RV parks, cabins, treehouses, and glamping—everywhere from national parks to blueberry farms.
            </p>
          </div>
        </div>
      </div>
      <div className="footer-container-footer footer-section">
        <div className="footer-legal-info">
          <span>© 2020 Timcamp, Inc. All rights reserved.</span>
          <a className="terms">Terms of Service</a>
          <a className="privacy">Privacy Policy</a>
        </div>
        <ul className="hipcamp-social-icons">
          <li><span className="icon fa fa-instagram" /></li>
          <li><span className="icon fa fa-facebook-official" /></li>
          <li><span className="icon fa fa-twitter" /></li>
          <li><span className="icon fa fa-pinterest-p" /></li>
          <li><span className="icon fa fa-youtube" /></li>
          <li><span className="icon fa fa-spotify" /></li>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
