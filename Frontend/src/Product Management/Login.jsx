import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation
import axios from "axios";
import "../Style/Login.css"; // Import CSS file for Login component

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupStatus, setSignupStatus] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setSignupStatus("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/farms", {
        email,
        password,
      });

      console.log("Response Data:", response.data);

      if (
        response.status === 200 &&
        response.data.message === "Login successful"
      ) {
        console.log("hello");
        navigate("/home"); // Redirect to home page upon successful login
      } else {
        // Check if the error is due to no account
        if (response.data.message === "No account") {
          setSignupStatus("No account found. Please sign up.");
          navigate("/signup"); // Redirect to signup page
        } else {
          setSignupStatus(
            response.data.message || "An error occurred while logging in"
          );
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
      if (error.response && error.response.status === 401) {
        setSignupStatus("Wrong email or password");
      } else {
        setSignupStatus(
          "An error occurred while logging in. Please try again later."
        );
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <form onSubmit={handleLogin} className="login-form">
          <h2 className="login-title">Login</h2>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="Loginbtndiv">
            <button type="submit" className="Loginbtn">Login</button>
          </div>
          <div className="signup-message">
            <p>
              Don't have an account?
              <Link to="/signup" className="signup-link">
                Sign Up
              </Link>
            </p>
          </div>

          {signupStatus && (
            <p
              className={
                signupStatus.includes("error")
                  ? "error-message"
                  : "confirmation-message"
              }
            >
              {signupStatus}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
