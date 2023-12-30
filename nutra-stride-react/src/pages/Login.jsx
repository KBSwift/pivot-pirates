import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://backend-url/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      if (response.ok) {
        console.log("Login successful");
        navigate("/home");
      } else {
        const data = await response.json();
        setLoginError(data.message);
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      setLoginError("An unexpected error occurred.");
      console.error("Error during login:", error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("http://backend-url/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      if (response.ok) {
        console.log("Registration successful");
        navigate("/home");
      } else {
        const data = await response.json();
        setRegisterError(data.message);
        console.error("Registration failed:", data.message);
      }
    } catch (error) {
      setRegisterError("An unexpected error occurred during registration.");
      console.error("Registration error:", error);
    }
  };

  const handleUserChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login">
      <h1>NutraStride+WeatherFit</h1>
      <br />
      <br />

      <h2>Login</h2>
      <form>
        <label htmlFor="loginemail">Email: </label>
        <input
          id="loginemail"
          type="email"
          value={email}
          required
          onChange={handleUserChange}
        />
        <label htmlFor="loginpassword">Password: </label>
        <input
          id="loginpassword"
          type="password"
          value={password}
          required
          onChange={handlePasswordChange}
        />
        {loginError && <p style={{ color: "red" }}>{loginError}</p>}
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
      </form>

      <br />
      <br />

      <h2 id="signup">No account with us yet? Register now:</h2>
      <form>
        <label htmlFor="registeremail">Email: </label>
        <input
          id="registeremail"
          type="email"
          value={email}
          required
          onChange={handleUserChange}
        />
        <label htmlFor="registerpassword">Password: </label>
        <input
          id="registerpassword"
          type="password"
          value={password}
          required
          onChange={handlePasswordChange}
        />
        {registerError && <p style={{ color: "red" }}>{registerError}</p>}
        <button type="submit" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
}
