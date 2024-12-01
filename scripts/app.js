import {
    btnAbrirModal,
    btnCerrarModal,
    contenedorFormulario,
    formulario,
    nombre,
    descripcion,
    fechaVencimiento,
    prioridad,
} from "./Selectores.js";
import {
    llenarPrioridad,
    Modal,
    obtenerDatos,
    guardarTarea,
} from "./Funciones.js";

// EVENT LISTENERS
addEventListener("DOMContentLoaded", () => llenarPrioridad());
btnAbrirModal.addEventListener("click", () => Modal("abrir"));
btnCerrarModal.addEventListener("click", () => Modal("cerrar"));
contenedorFormulario.addEventListener("click", (e) => {
    if (e.target === contenedorFormulario) Modal("cerrar");
});
formulario.addEventListener("submit", guardarTarea);

// EVENT LISTENERS INPUTS FORMULARIO
nombre.addEventListener("input", obtenerDatos);
descripcion.addEventListener("input", obtenerDatos);
fechaVencimiento.addEventListener("input", obtenerDatos);
prioridad.addEventListener("input", obtenerDatos);
