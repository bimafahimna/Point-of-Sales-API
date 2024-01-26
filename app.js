const express = require("express");
const dotenv = require("dotenv");
const cookieSession = require("cookie-session");

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: false, // set to true if your using https or in production
    httpOnly: true,
    domain: "localhost",
    path: "/",
  })
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
