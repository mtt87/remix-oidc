import { Link, LoaderFunction, useLoaderData } from "remix";
import { getSession } from "~/sessions.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  return {
    ...session.data,
  };
};

export default function Index() {
  const data = useLoaderData();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      {data.access_token ? (
        <Link to="/auth/logout">Logout</Link>
      ) : (
        <Link to="/auth/login">Login</Link>
      )}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
