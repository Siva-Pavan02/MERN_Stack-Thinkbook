import fs from "fs";
import path from "path";

const DEFAULT_CREDENTIALS_FILE =
  "client_secret_435475552158-9uu8om191v5tj5l6ce1a27ipctm5ooo9.apps.googleusercontent.com.json";

export function getGoogleCredentials() {
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    return {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    };
  }

  const credentialsPath =
    process.env.GOOGLE_CREDENTIALS_PATH ||
    path.resolve(process.cwd(), "..", DEFAULT_CREDENTIALS_FILE);

  const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf8"));
  const oauthClient = credentials.web || credentials.installed;

  if (!oauthClient?.client_id || !oauthClient?.client_secret) {
    throw new Error("Google OAuth credentials must include client_id and client_secret");
  }

  return {
    clientID: oauthClient.client_id,
    clientSecret: oauthClient.client_secret,
  };
}
