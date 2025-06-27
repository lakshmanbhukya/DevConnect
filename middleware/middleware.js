const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function protected(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    console.log(verified);
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
}
module.exports =protected;
// const token = "paste_jwt_here_and_chech_it";
// const secret = "secret"; // exactly what's in your .env file

// try {
//   const decoded = jwt.verify(token, secret);
//   console.log("✅ Token is valid:", decoded);
// } catch (e) {
//   console.error("❌ Invalid Token:", e.message);
// }