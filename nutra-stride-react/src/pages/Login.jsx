import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Register Email:", loginEmail);
    console.log("Register Password:", loginPassword);

    // Validation
    if (!loginEmail || !loginPassword) {
      setLoginError("Email and password are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: loginEmail,
          password: loginPassword,
        }),
        credentials: "include",
      });

      if (response.ok) {
        console.log("Login successful");
      } else {
        const data = await response.text();
        setLoginError(data.message);
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      setLoginError("An unexpected error occurred.");
      console.error("Error during login:", error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Register Email:", registerEmail);
    console.log("Register Password:", registerPassword);

    // Validation
    if (!registerEmail || !registerPassword) {
      setRegisterError("Email and password are required.");
      return;
    }

    // Email format validation
    if (!isValidEmail(registerEmail)) {
      setRegisterError("Invalid email format.");
      return;
    }

    // Password length validation
    if (registerPassword.length < 8) {
      setRegisterError("Password must be at least 8 characters.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: registerEmail,
          password: registerPassword,
          verifyPassword: registerPassword,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json();
        console.error("Registration failed:", data.message);
        setRegisterError(data.message);
      } else {
        console.log("Registration successful");
        navigate("/");
      }
    } catch (error) {
      setRegisterError("An unexpected error occurred.");
      console.error("Error during registration:", error);
    }
  };

  const isValidEmail = (email) => {
    // Simple email format check
    return email.includes("@") && email.includes(".");
  };

  const handleLoginUserChange = (e) => {
    setLoginEmail(e.target.value);
  };

  const handleLoginPasswordChange = (e) => {
    setLoginPassword(e.target.value);
  };

  const handleRegisterUserChange = (e) => {
    setRegisterEmail(e.target.value);
  };

  const handleRegisterPasswordChange = (e) => {
    setRegisterPassword(e.target.value);
  };

  return (
    <div className="login">
      <h1>NutraStride+WeatherFit</h1>
      <br />
      <br />

      <section id="loginsection">
      <h2>Login</h2>
      <form>
        <label htmlFor="loginemail">Email: </label>
        <input
          id="loginemail"
          type="email"
          value={loginEmail}
          required
          onChange={handleLoginUserChange}
        />
        <label htmlFor="loginpassword">Password: </label>
        <input
          id="loginpassword"
          type="password"
          value={loginPassword}
          required
          onChange={handleLoginPasswordChange}
        />
        {loginError && <p style={{ color: "red" }}>{loginError}</p>}
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
      </form>
      </section>
      

      <br />
      <br />

    <section id="registersection">
      <h2 id="signup">No account with us yet? Register now:</h2>
      <form onSubmit={handleRegister}>
        <label htmlFor="registeremail">Email: </label>
        <input
          id="registeremail"
          type="email"
          value={registerEmail}
          required
          onChange={handleRegisterUserChange}
        />
        <label htmlFor="registerpassword">Password: </label>
        <input
          id="registerpassword"
          type="password"
          value={registerPassword}
          required
          onChange={handleRegisterPasswordChange}
        />
        {registerError && <p style={{ color: "red" }}>{registerError}</p>}
        <button type="submit" onClick={handleRegister}>
          Register
        </button>
      </form>
      </section>
    </div>
  );
}
