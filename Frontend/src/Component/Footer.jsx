import '../Style/Footer.css'
import SocialMediaIcons from './SocialMediaIcon';

const Footer = () => {
  return (
      <footer className="footer">
          <div><p>&copy; 2024 Farmer Assistant. All rights reserved.</p></div>
          <div>
            <SocialMediaIcons/>
          </div>
      
    </footer>
  );
};

export default Footer;