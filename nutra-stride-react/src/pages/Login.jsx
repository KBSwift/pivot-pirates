import { useState } from "react";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
        // Make an API request to the login endpoint
        axios.post("/login", { username: loginemail, loginpassword })
          .then(response => {
            // Handle successful login
            console.log("User logged in successfully");
          })
          // Handle login error, update UI accordingly
          .catch(error => {
            console.error("Login failed:", error.response.data);
          });
  };

  const handleRegister = () => {
      // Make an API request to the register endpoint
      axios.post("/register", { username: registeremail, registerpassword })
        .then(response => {
          // Handle successful registration
          console.log("User registered successfully");
        })
        .catch(error => {
          // Handle registration error, update UI accordingly
          console.error("Registration failed:", error.response.data);
        });
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
          <button type="submit" onClick={handleLogin}>
            Register
          </button>
        </form>
      </div>
    );
  }
