import { createCloudflareKVSessionStorage, createCookie } from "remix";

declare const REMIX_AUTH: KVNamespace;

// In this example the Cookie is created separately.
const sessionCookie = createCookie("_remix_session", {
  secrets: [COOKIE_SECRET],
  httpOnly: true,
  path: "/",
});

const { getSession, commitSession, destroySession } =
  createCloudflareKVSessionStorage({
    // The KV Namespace where you want to store sessions
    kv: REMIX_AUTH,
    cookie: sessionCookie,
  });

export { getSession, commitSession, destroySession };
