import { NavLink, Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="root-layout">
      <header>
        <nav>
          <h1>NutraStride+WeatherFit</h1>
          <NavLink to="/">Home</NavLink>
          <NavLink to="nutralog">NutraLog</NavLink>
          <NavLink to="goals">Goals</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
