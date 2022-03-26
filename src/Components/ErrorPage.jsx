import { Link } from "react-router-dom";

export default function ErrorPage({ error }) {
  return (
    <div className="mx-2 mt-5">
      {error ? (
        <>
          <h2>Oh no... Something went wrong</h2>
          <p>
            {error.response.status} - {error.response.data.msg}
          </p>
          <Link className="no-styling" to="/">
            return home
          </Link>
        </>
      ) : (
        <>
          <h2>Something went wrong</h2>
          <Link className="no-styling" to="/">
            return home
          </Link>
        </>
      )}
    </div>
  );
}
