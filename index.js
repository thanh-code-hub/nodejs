import express from 'express';
import bodyParser from "body-parser";
import router from "./routes/todoRoutes.js";
import db from "./models/index.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({'message': 'working'});
})

app.use('/todo', router)

app.use(errorHandler);

db.sequelize
    .sync()
    .then(() => {
        console.log("✅ Database synced");
        app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
    })
    .catch((err) => {
        console.error("❌ Failed to start server:", err);
    });