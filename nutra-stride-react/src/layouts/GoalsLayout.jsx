import { NavLink, Outlet } from "react-router-dom";

export default function GoalsLayout() {
  return (
    <span className="goals-layout">
      <h2>Personal Goals</h2>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro officia
        sapiente tempora ea velit nesciunt beatae voluptates laboriosam
        necessitatibus culpa, expedita vero non enim incidunt. Nam veniam
        laudantium totam sequi.
      </p>

      <nav>
        <NavLink to="calculate">Calculate your Caloric Requirements</NavLink>
        <NavLink to="track">View your Progress</NavLink>
      </nav>

      <Outlet />
    </span>
  );
}
