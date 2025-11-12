import express from "express";
import user from "./routes/user.js"; 
import task from "./routes/task.js";

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
// http://localhost:3000/task/tasks