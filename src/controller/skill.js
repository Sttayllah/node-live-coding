const dataSource = require("../utils").dataSource;
const skill = require("../entity/Skill");

module.exports = {
  create: async (req, res) => {
    try {
      await dataSource.getRepository(skill).save(req.body);
      res.send(req.body);
    } catch {
      (e) => {
        res.send("Error creating", e);
      };
    }
  },

  getMany: async (req, res) => {
    try {
      const data = await dataSource.getRepository(skill).find();
      res.send(data);
    } catch (e) {
      console.log(e.error);
    }
  },

  update: async (req, res) => {
    // console.log(req.body.name);
    // console.log(req.body.id);
    try {
      await dataSource
        .getRepository(skill)
        .save({ id: req.body.id, name: req.body.name });
      res.send(req.body);
    } catch (e) {
      res.status(404).send("404 error");
      const err = JSON.parse(e.response.body);
      res.send(err);
    }
  },

  delete: async (req, res) => {
    try {
      await dataSource.getRepository(skill).delete(req.body.id);
      res.send(`skill ${req.body.id} deleted`);
    } catch (e) {
      res.status(404).send("404 error");
      const err = JSON.parse(e.response.body);
      res.send(err);
    }
  },

  read: async (req, res) => {
    try {
      const one = await dataSource
        .getRepository(skill)
        .findOneBy({ name: req.body.name });
      res.send(one);
    } catch (e) {
      res.status(404).send("404 error");
      const err = JSON.parse(e.response.body);
      res.send(err);
    }
  },
};
