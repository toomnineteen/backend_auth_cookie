const jwt = require("jsonwebtoken");

exports.authenticateToken = (req, res, next) => {

  const { token } = req.cookies;

  if (!token) return res.sendStatus(401);

  if (token == null) return res.sendStatus(401);
  
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Token has expired" });
    }
    return res.status(403).json({ message: "Invalid token" });
  }
};
