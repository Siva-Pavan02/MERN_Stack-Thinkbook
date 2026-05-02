import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import "./env.js";
import { getGoogleCredentials } from "./googleCredentials.js";
import User from "../models/User.js";

const { clientID, clientSecret } = getGoogleCredentials();

passport.use(
  new GoogleStrategy(
    {
      clientID,
      clientSecret,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || "/auth/google/callback",
      proxy: true,
    },
    async (_, __, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(new Error("Google profile did not include an email"));
        }

        const user = await User.findOneAndUpdate(
          { email },
          {
            googleId: profile.id,
            name: profile.displayName,
            email,
          },
          { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

export default passport;
