import { useState } from "react";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    //implementation of logic
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