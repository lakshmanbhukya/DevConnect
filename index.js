const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");
const UserRotues = require("./Routes/user");
const Profile = require("./Routes/profile");
const posts = require("./Routes/posts");
const auth=require("./Routes/auth");

const app = express();

// connnect to db
connectDB();

app.use(express.json());

const port = process.env.port || 5000;

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to DevConnect",
    endpoints: {
      root: "/",
      users: "api/user",
      auth: "api/auth",
      posts: "api/posts",
    },
  });
});

app.use("/api/user", UserRotues);
app.use("/api/profile", Profile);
app.use("/api/posts", posts);
app.use("/api/auth",auth);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
