import { Link } from "react-router-dom";

export default function Error() {
  return (
    <main className="Missing">
      <h2>Page Not Found!</h2>
      <p>Well, that's disappointing</p>
      <p>
        <Link to="/">Visit Our Homepage</Link>
      </p>
    </main>
  );
}
