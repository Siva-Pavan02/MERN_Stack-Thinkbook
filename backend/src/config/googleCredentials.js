import fs from "fs";
import path from "path";

import "./env.js";

const DEFAULT_CREDENTIALS_FILE = "client_secret.json";

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

  if (!fs.existsSync(credentialsPath)) {
    throw new Error(
      "Google OAuth credentials not found. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in your environment, or set GOOGLE_CREDENTIALS_PATH to a local credentials JSON file."
    );
  }

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
