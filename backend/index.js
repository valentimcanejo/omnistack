const express = require("express");

const app = express();

app.use(express.json());

app.post("/users", (req, res) => {
  console.log(req.body);
  return res.json({ message: "Hello" });
});

app.listen(3333);
