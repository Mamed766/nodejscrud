const express = require("express");
const app = express();
app.use(express.json());
const PORT = 8080;
const userRoute = require("./routes/userRoute");

// app.use("*", (req, res, next) => {
//   res.status(404).json({
//     message: "Page not found",
//   });
// });

app.use("/users", userRoute);

app.listen(PORT, () => {
  console.log("Server is Running");
});
