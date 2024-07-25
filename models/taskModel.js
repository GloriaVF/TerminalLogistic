import fs from "fs";

const FILE_PATH = "./db.json";

export const readData = () => {
    try {
        const data = fs.readFileSync(FILE_PATH, "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error al leer los datos:", error);
        return { Tareas: [] }; 
    }
};

export const writeData = (data) => {
    try {
        fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2), "utf8");
    } catch (error) {
        console.error("Error al escribir datos:", error);
    }
};