import express from "express";
import bodyParser from "body-parser";
import path from "path";
import tareasRoutes from "./routes/taskRoutes.js";
import methodOverride from 'method-override';

const app = express();
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));
app.use(express.static(path.join(process.cwd(), "public")));


app.get("/", (req, res) => {
    res.render("index", { title: "Página de Inicio" });
});

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use("/tasks", tareasRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});