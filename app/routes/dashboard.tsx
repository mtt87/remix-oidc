import { LoaderFunction } from "@remix-run/server-runtime";
import { Link, useLoaderData } from "remix";
import { getSession } from "~/sessions.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  return {
    ...session.data,
  };
};

export default function Dashboard() {
  const data = useLoaderData();
  return (
    <div>
      Hello
      <div>
        <Link to="/auth/logout">Logout</Link>
      </div>
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}
