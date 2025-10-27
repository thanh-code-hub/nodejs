import sequelize from "../dbInit.js";
import Todo from "./Todo.js";
import User from "./User.js";

// prepare for table initialization
const db = { sequelize, Todo, User };

export default db;
