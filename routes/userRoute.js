const app = require("express");
const router = app.Router();
const fs = require("fs");
const url = fs.readFileSync("db.json", "utf-8");
const Db = JSON.parse(url);

router.get("/", (req, res) => {
  if (!Db.data) {
    return res.status(404).json({
      data: [],
    });
  }

  return res.status(200).json({
    data: Db.data,
  });
});

router.post("/", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    res.status(400).json({
      message: "name or email is required",
    });
  } else {
    const newUser = {
      id: Db?.data?.length ? Db.data.length + 1 : 1,
      name,
      email,
    };

    Db.data?.push(newUser);
    fs.writeFileSync("db.json", JSON.stringify({ data: Db.data }));

    return res.status(201).json({
      data: newUser,
      message: "User created successfully",
    });
  }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const user = JSON.parse(url).data.find((user) => user.id === Number(id));
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  } else {
    return res.status(200).json({
      data: user,
    });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const user = JSON.parse(url).data.find((user) => user.id === Number(id));
  const index = JSON.parse(url).data.findIndex(
    (user) => user.id === Number(id)
  );
  Db?.data?.splice(index, 1);
  fs.writeFileSync("db.json", JSON.stringify({ data: Db.data }));

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  } else {
    return res.status(200).json({
      message: "USER DELETED",
    });
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const user = JSON.parse(url).data.find((user) => user.id === Number(id));
  const index = JSON.parse(url).data.findIndex(
    (user) => user.id === Number(id)
  );

  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(404).json({
      message: "name or email is required",
    });
  } else {
    Db?.data?.splice(index, 1, { id: Number(id), name, email });
    fs.writeFileSync("db.json", JSON.stringify({ data: Db.data }));
    return res.status(200).json({
      data: { id: Number(id), name, email },
    });
  }
});

module.exports = router;
