import { DataFunctionArgs } from "@remix-run/server-runtime";
import { redirect } from "remix";
import { commitSession, getSession } from "~/sessions.server";

type TokenResponse = {
  access_token: string;
  id_token: string;
  scope: string;
  expires_in: number;
};

export async function loader({ request }: DataFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (!code) {
    return new Response(null, {
      status: 400,
    });
  }
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: AUTH0_CLIENT_ID,
    client_secret: AUTH0_CLIENT_SECRET,
    code,
    redirect_uri: AUTH0_REDIRECT_URI,
  });
  try {
    const res = await fetch(`https://${AUTH0_DOMAIN}/oauth/token`, {
      method: "POST",
      body: params.toString(),
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });
    if (!res.ok) {
      throw new Error("error");
    }
    const json: TokenResponse = await res.json();
    session.set("access_token", json.access_token);
    session.set("id_token", json.id_token);
    session.set("expires_at", String(Date.now() + json.expires_in * 1000));
    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (err) {
    console.log(err);
    return redirect("/");
  }
}
