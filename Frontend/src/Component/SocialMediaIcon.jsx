import { IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import '../Style/SocialMediaIcon.css'; // Import the CSS file

// Define an array of social media links with corresponding icons and URLs
const socialMediaLinks = [
  { icon: <FacebookIcon className="icon facebook-icon" />, url: 'https://www.facebook.com/' },
  { icon: <InstagramIcon className="icon instagram-icon" />, url: 'https://www.instagram.com/' },
  { icon: <LinkedInIcon className="icon linkedin-icon" />, url: 'https://www.linkedin.com/' },
  { icon: <GitHubIcon className="icon github-icon" />, url: 'https://github.com/' },
];

// Define the SocialMediaIcons functional component
const SocialMediaIcons = () => {
  // Render the social media icons and links
  return (
    <div className="social-media-icons">
      {socialMediaLinks.map((item, index) => (
        // Map through the socialMediaLinks array and create IconButton components for each link
        <IconButton key={index} href={item.url} target="_blank" rel="noopener noreferrer">
          {item.icon}
        </IconButton>
      ))}
    </div>
  );
};

// Export the SocialMediaIcons component for use in other files
export default SocialMediaIcons;






{/*
import { IconButton, Tooltip } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import './SocialMediaIcon.css'; // Import the CSS file

const SocialMediaIcons = () => {
  const socialMediaLinks = [
    { icon: <FacebookIcon className="icon facebook-icon" />, url: 'https://www.facebook.com/' },
    { icon: <InstagramIcon className="icon instagram-icon" />, url: 'https://www.instagram.com/' },
    { icon: <LinkedInIcon className="icon linkedin-icon" />, url: 'https://www.linkedin.com/' },
    { icon: <GitHubIcon className="icon github-icon" />, url: 'https://github.com/' },
  ];

  return (
    <div className="social-media-icons">
      {socialMediaLinks.map((item, index) => (
        <Tooltip title={item.url} key={index}>
          <IconButton href={item.url} target="_blank" rel="noopener noreferrer">
            {item.icon}
          </IconButton>
        </Tooltip>
      ))}
    </div>
  );
};

export default SocialMediaIcons;
*/}
// Import necessary components and icons from Material-UI