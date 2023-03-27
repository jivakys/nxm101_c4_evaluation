const express = require("express");
const { connection } = require("./db");
const { auth } = require("./middleware/post.middleware");
const { postRoute } = require("./routes/post.route");
const { userRoute } = require("./routes/user.route");
const app = express();
app.use(express.json());
require("dotenv").config();

app.use("/users", userRoute);
app.use(auth);
app.use("/posts", postRoute);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Database is connected");
  } catch (err) {
    console.log({ msg: err.message });
  }
  console.log(`Server Running at port ${process.env.port}`);
});
