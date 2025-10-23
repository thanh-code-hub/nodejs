import sequelize from "../dbInit.js";
import Todo from "./todo.js";

// prepare for table initialization
const db = { sequelize, Todo };

export default db;
