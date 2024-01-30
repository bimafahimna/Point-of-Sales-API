const express = require("express");
const dotenv = require("dotenv");
const cookieSession = require("cookie-session");
const prisma = require('./src/config/database');
const router = require("./src/routes/main")
const errorHandler = require("./src/middlewares/errorHandler");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

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

app.use('/api', router);
app.use(errorHandler);


prisma.$connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
