const express = require("express");
const dataSource = require("./utils").dataSource;
const wilderController = require("./controller/wilder");
const skillController = require("./controller/skill");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/api/wilder", wilderController.create);
app.get("/api/wilder", wilderController.getMany);
app.put("/api/wilder", wilderController.update);
app.delete("/api/wilder", wilderController.delete);
app.get("/api/wilder/name", wilderController.read);

app.post("/api/skill", skillController.create);
app.get("/api/skill", skillController.getMany);
app.put("/api/skill", skillController.update);
app.delete("/api/skill", skillController.delete);
app.get("/api/skill/name", skillController.read);

app.post("/api/wilder/addSkill", wilderController.addSkill);

const start = async () => {
  await dataSource.initialize();
  app.listen(3000, () => console.log("Server started on 3000"));
};

start();
