const dataSource = require("../utils").dataSource;
const Wilder = require("../entity/Wilder");
const Skill = require("../entity/Skill");

module.exports = {
  create: async (req, res) => {
    try {
      await dataSource.getRepository(Wilder).save(req.body);
      res.send(req.body);
    } catch {
      (e) => {
        res.send("Error creating", e);
      };
    }
  },

  getMany: async (req, res) => {
    try {
      const data = await dataSource.getRepository(Wilder).find();
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
        .getRepository(Wilder)
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
      await dataSource
        .getRepository(Wilder)
        // .createQueryBuilder()
        .delete(req.body.id);
      // .from(Wilder)
      // .where("id = :id", { id: 11 })
      // .execute();
      res.send(`wilder ${req.body.id} deleted`);
    } catch (e) {
      res.status(404).send("404 error");
      const err = JSON.parse(e.response.body);
      res.send(err);
    }
  },

  read: async (req, res) => {
    try {
      const one = await dataSource
        .getRepository(Wilder)
        .findOneBy({ name: req.body.name });
      res.send(one);
    } catch (e) {
      res.status(404).send("404 error");
      const err = JSON.parse(e.response.body);
      res.send(err);
    }
  },
  addSkill: async (req, res) => {
    console.log(req.body);
    try {
      const wilderSkill = await dataSource
        .getRepository(Wilder)
        .findOneBy({ id: req.body.id });
      console.log(wilderSkill);

      const skill = await dataSource
        .getRepository(Skill)
        .findOneBy({ name: req.body.name });
      console.log(skill);

      wilderSkill.skills = [...wilderSkill.skills, skill];
      await dataSource.getRepository(Wilder).save(wilderSkill);
      res.send(req.body);
    } catch (e) {
      res.status(404).send("404 error");
      const err = JSON.parse(e.response.body);
      res.send(err);
    }
  },
};
