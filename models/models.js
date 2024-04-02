const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
});

const Task = sequelize.define("task", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  summary: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  type: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING },
  pubDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  reporterId: { type: DataTypes.INTEGER },
  assigneeId: { type: DataTypes.INTEGER },
});

const Project = sequelize.define("project", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false }
});

User.hasMany(Project)
Project.belongsTo(User)

Project.hasMany(Task);
Task.belongsTo(Project);

module.exports = {
  Project,
  Task,
  User
};
