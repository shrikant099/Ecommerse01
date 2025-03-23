import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { connect_db } from "./db-connection/db_connection.js";
import { loginUser, registerController } from "./controllers/user.controller.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
    app.use(cors());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./index.html"));
});


app.post('/api/register-user' , registerController);
app.post('/api/login-user' , loginUser);

const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

connect_db().then(() => {
    app.listen(PORT , () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});

