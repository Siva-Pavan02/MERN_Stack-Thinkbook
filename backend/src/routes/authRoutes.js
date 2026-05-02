import express from "express";
import jwt from "jsonwebtoken";

import passport from "../config/passport.js";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.CLIENT_URL || "http://localhost:5173",
    session: false,
  }),
  (req, res) => {
    try {
      if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET is not defined in environment variables");
        return res.status(500).json({ error: "Server configuration error: JWT_SECRET missing" });
      }

      const token = jwt.sign(
        {
          id: req.user._id,
          name: req.user.name,
          email: req.user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
      res.redirect(`${clientUrl}/auth/success?token=${token}`);
    } catch (error) {
      console.error("Error generating JWT:", error);
      res.status(500).json({ error: "Failed to generate authentication token", details: error.message });
    }
  }
);

export default router;
