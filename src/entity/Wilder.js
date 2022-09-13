const EntitySchema = require("typeorm").EntitySchema;
const skills = require("./Skill");

module.exports = new EntitySchema({
  name: "Wilder",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "text",
    },
  },
  relations: {
    skills: {
      target: skills,
      joinTable: true,
      type: "many-to-many",
      eager: true,
    },
  },
});
