import { Link } from "react-router-dom";

import "./Footer.scss";
import logo from "../../assets/images/footerLogo.svg";
import twitter from "../../assets/images/twitter-icon.svg";
import discord from "../../assets/images/discord-icon.svg";
import youtube from "../../assets/images/youtube-icon.svg";

const Footer = () => {
  return (
    <>
      <div className="footer-background">
        <hr className="endbar" />
        <div className="footer">
          <img src={logo} alt="logo" />
          <div className="footer__link">
            <Link to="">Terms of Service</Link>
            <Link to="">Privacy Policy</Link>
            <Link to="">Refund Policy</Link>
          </div>
          <div className="social-box">
            <Link to="">
              <img src={twitter} alt="twitter" />
            </Link>
            <Link to="">
              <img src={discord} alt="discord" />
            </Link>
            <Link to="">
              <img src={youtube} alt="youtube" />
            </Link>
          </div>
        </div>
        <p className="copyright">COPYRIGHT 2023 KOZMO. ALL RIGHTS RESERVED.</p>
      </div>
    </>
  );
};

export default Footer;
