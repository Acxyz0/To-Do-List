import { generarId } from "./Funciones.js";

let editando = { value: false };

const prioridades = ["minima", "media", "alta"];

const tareasObj = {
    id: generarId(),
    nombre: "",
    descripcion: "",
    fechaVencimiento: "",
    prioridad: "",
    estado: "pendiente",
};

export { editando, prioridades, tareasObj };
