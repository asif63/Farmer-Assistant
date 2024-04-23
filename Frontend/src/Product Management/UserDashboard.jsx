import  { useState, useEffect } from "react";
import axios from "axios";
import defaultProfileImage from "../images/person icon.png";
import "./UserDashboard.css"; // Import CSS file for styling

const UserDashboard = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5001/dashboard");
        setUserProfile(response.data);
      } catch (error) {
        setError("Error fetching user profile");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserProfile();
  }, [uploadStatus]); // Fetch user profile whenever uploadStatus changes

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      setUploadStatus("Please select an image file.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      const response = await axios.post(
        "http://localhost:5001/uploadImg",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadStatus(response.data.message);
      // Clear the file input after successful upload
      setImageFile(null);
    } catch (error) {
      setUploadStatus("Error uploading image. Please try again.");
    }
  };

  return (
    <div className="user-dashboard-container">
      <div className="user-dashboard">
        <h1>User Dashboard</h1>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {userProfile && (
          <div>
            <h2 className="welcome-message">
              Welcome, {userProfile.Username}!
            </h2>
            <div className="imgupload">
              <img
                src={
                  userProfile.user_image
                    ? `http://localhost:5001/${userProfile.user_image}`
                    : defaultProfileImage
                }
                alt="Profile"
                className="profile-image"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <button onClick={handleImageUpload}>Upload Image</button>
            </div>
            {uploadStatus && <p className="confirmation">{uploadStatus}</p>}
            <div className="input-container">
              <p className="user-details">Name: {userProfile.Username}</p>
              <p className="user-details">Email: {userProfile.Email}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
