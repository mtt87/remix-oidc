import { redirect } from "remix";

export async function loader() {
  const params = new URLSearchParams({
    client_id: AUTH0_CLIENT_ID,
    redirect_uri: AUTH0_REDIRECT_URI,
    scope: "openid profile email offline",
    response_type: "code",
    state: "123abc",
  });
  const url = `https://${AUTH0_DOMAIN}/authorize?${params.toString()}`;
  return redirect(url);
}
