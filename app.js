import express from 'express';
import "dotenv/config";
import Hello from "./hello.js"
import Lab5 from "./Lab5.js";
import cors from "cors";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import AssignmentRoutes from './assignments/routes.js';
import mongoose from "mongoose";
import UserRoutes from "./users/routes.js";

mongoose.connect("mongodb://127.0.0.1:27017/kanbas");

const app = express()
console.log(process.env.FRONTEND_URL);
app.use(
    cors()
);

app.use(express.json());
UserRoutes(app);
AssignmentRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
Lab5(app)
Hello(app)
app.listen(4000);

