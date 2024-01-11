import { NavLink, Outlet } from "react-router-dom";

export default function GoalsLayout() {
  return (
    <span className="goals-layout">
      <h2>Personal Goals</h2>
      <p>
        Calculate your TDEE &#40;Total Daily Energy Expenditure&#41; by filling
        out the form under Calculate your Caloric Requirements. This form uses
        the Harris-Benedict algorithm to determine your caloric needs based on
        your input. Please be sure to be as accurate as possible with your
        entries. Make sure to adhere to the recommendation. You can view your
        progress under the View your progress tab.{" "}
      </p>

      <nav>
        <NavLink to="calculate">Calculate your Caloric Requirements</NavLink>
        <NavLink to="track">View your Progress</NavLink>
      </nav>

      <Outlet />
    </span>
  );
}
