import { readData, writeData } from "../models/taskModel.js";

export const getTask = (req, res) => {
    const data = readData();
 res.render("task", {
   title: "Lista de Tareas",
    tasks: data.task
});
};  
 
export const getTaskId = (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const tarea = data.task.find((task) => task.id === id);
    if (tarea) {
        res.render("taskDetail", {
            title: "Tarea", 
             task: tarea
         });
    } else {
        res.status(404).render("error", { title: "Error", message: "Tarea no encontrada" });
    }
};

export const showAddTaskForm = (req, res) => {
    res.render("addTask", { title: "Agregar Tarea" });
};

export const showUpdateTaskForm = (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const task = data.task.find((task) => task.id === id);
    if (task) {
        res.render("updateTask", {
            title: "Tarea",
             task: task
         });
       
    } else {
        res.status(400).render("error", {
            title: "Error",
             message: "Tarea no encontrada"
         });
     }
};

export const addTask = (req, res) => {
    const data = readData();
    const body = req.body;
    const newTarea = {
        id: data.task.length + 1,
        título: req.body.título,
        descripcion: req.body.descripcion,
        estado: req.body.estado,
        
    };
    data.task.push(newTarea);
    writeData(data);
    res.status(201).json(newTarea);
};

export const updateTask = (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const body = req.body;
    const tareaIndex = data.task.findIndex((task) => task.id === id);
    if (tareaIndex !== -1) {
        data.task[tareaIndex] = {
            ...data.task[tareaIndex],
            ...body,
        };
        writeData(data);
        res.redirect(`/tasks`);
    } else {
        res.status(400).render("error", {
            title: "Error",
             message: "Tarea no encontrada"
         });
        }
}; 

export const deleteTask = (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const tareaIndex = data.task.findIndex((task) => task.id === id);
    if (tareaIndex !== -1) {
        data.task.splice(tareaIndex, 1);
        writeData(data);
        res.redirect("/tasks");
    } else {
        res.status(400).render("error", {
            title: "Error",
             message: "Tarea no encontrada"
         });
    }
};

export const updateTaskStatus = (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const task = data.task.find(task => task.id === id);
    if (task) {
        task.estado = req.body.estado || 'completada'; 
        writeData(data);
        res.redirect('/tasks'); 
    } else {
        res.status(404).render('error', { title: 'Error', message: 'Tarea no encontrada' });
    }
};
