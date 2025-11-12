import express from "express";
import animales from "./routes/user.js"; 
import registro from "./routes/task.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", user);
app.use("/task", task); 

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
    console.log(`http://127.0.0.1:${PORT}`);
    console.log(`http://[::]:${PORT}`);
});