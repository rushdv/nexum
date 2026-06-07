import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import bcrypt from "bcrypt";
import pool from "./db.js";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
const CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || "http://localhost:5000/api/auth/google/callback";

if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value;
          if (!email) return done(new Error("No email from Google"), null);

          let user = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);

          if (user.rows.length === 0) {
            const username = profile.displayName.replace(/\s+/g, "_").toLowerCase() + "_" + profile.id.slice(-4);
            const passwordHash = await bcrypt.hash(Math.random().toString(36), 10);
            const newUser = await pool.query(
              `INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email`,
              [username, email, passwordHash]
            );
            user = newUser;
          }

          return done(null, { id: user.rows[0].id, username: user.rows[0].username, email: user.rows[0].email });
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );
}

export default passport;
