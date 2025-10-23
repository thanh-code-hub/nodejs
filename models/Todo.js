import { DataTypes} from "sequelize";
import sequelize from "../dbInit.js";

// Define model
const Todo = sequelize.define('Todo',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: DataTypes.STRING,
    done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
})

export default Todo
