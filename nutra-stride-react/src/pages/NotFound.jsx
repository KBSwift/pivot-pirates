import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <h2>Page not found!</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
        totam numquam, natus, nihil pariatur dignissimos laboriosam sequi
        aliquam tempora modi velit praesentium! Aliquid alias illo excepturi
        ipsam voluptate similique nam.
      </p>

      <p>
        Go to the <Link to="/">Homepage</Link>.
      </p>
    </div>
  );
}
