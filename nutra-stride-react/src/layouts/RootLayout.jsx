import { NavLink, Outlet, useLocation } from "react-router-dom";

export default function RootLayout() {
  const location = useLocation();

  // Check if the current route is /login
  const isLoginPage = location.pathname === "/login";

  // Conditionally render the navbar/header
  const renderNavbar = () => {
    if (!isLoginPage) {
      return (
        <nav>
          <h1>NutraStride+WeatherFit</h1>
          <NavLink to="/">Home</NavLink>
          <NavLink to="nutralog">NutraLog</NavLink>
          <NavLink to="stridelog">StrideLog</NavLink>
          <NavLink to="goals">Goals</NavLink>
          <NavLink to="login">Login</NavLink>
        </nav>
      );
    }
    return null;
  };

  return (
    <div className="root-layout">
      <header>
        {renderNavbar()}
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
