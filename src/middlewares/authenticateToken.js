const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  if (!req.session.token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { token } = req.session;

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden" });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
