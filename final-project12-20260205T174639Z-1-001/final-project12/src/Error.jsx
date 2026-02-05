import { useRouteError, Link } from "react-router-dom";
import "./ErrorPage.css";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="error-container">
      <h1>Oops!</h1>
      <p className="message">Something went wrong.</p>
      <p className="error">
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/" className="back-button">
        ← Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
