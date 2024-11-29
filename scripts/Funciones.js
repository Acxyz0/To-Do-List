import { contenedorFormulario } from "./Selectores.js";
import { prioridadSelect } from "./Selectores.js";
import { editando, prioridades, tareasObj } from "./Variables.js";
import { Notificaciones } from "./app.js";

// LLENAR SELECT DE PRIORIDAD
function llenarPrioridad() {
    prioridades.forEach((prioridad) => {
        // Crear las opciones
        const option = document.createElement("option");
        option.classList.add("capitalize");
        option.value = prioridad;
        option.textContent = prioridad;
        // Agregar al select
        prioridadSelect.appendChild(option);
    });
}

// MOSTRAR U OCULTAR MODAL
function Modal(opcion) {
    // VALIDAR PARA MOSTRAR U OCULTAR LA MODAL
    if (opcion === "abrir") {
        contenedorFormulario.classList.remove("hidden");
        contenedorFormulario.setAttribute("aria-hidden", "false");
        return;
    }
    contenedorFormulario.classList.add("hidden");
    contenedorFormulario.setAttribute("aria-hidden", "true");
}

function obtenerDatos(e) {
    tareasObj[e.target.name] = e.target.value.trim();
}

function generarId() {
    return Date.now();
}

function reiniciarObj() {
    Object.assign(tareasObj, {
        id: generarId(),
        nombre: "",
        descripcion: "",
        fechaVencimiento: "",
        prioridad: "",
        estado: "pendiente",
    });
}

function validarFecha(fecha) {
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);

    const fechaSeleccionada = new Date(fecha);

    if (fechaSeleccionada < fechaActual) {
        new Notificaciones({
            mensaje: "La fecha ingresada es invalida",
            tipo: "error",
        });
        return false;
    }

    return true;
}

function fechaVencimientoMinima(fecha) {
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);

    const fechaSeleccionada = new Date(fecha);
    const diferenciaDias = Math.ceil(
        (fechaSeleccionada - fechaActual) / (1000 * 60 * 60 * 24)
    );

    if (diferenciaDias >= 2) {
        return "bg-green-500 rounded-lg block text-center text-white font-semibold";
    } else if (diferenciaDias === 1 || diferenciaDias === 0) {
        return "bg-yellow-500 rounded-lg block text-center text-white font-semibold";
    } else if (diferenciaDias < 0) {
        return "bg-red-500 rounded-lg block text-center text-white font-semibold";
    }
}

export {
    llenarPrioridad,
    Modal,
    obtenerDatos,
    generarId,
    reiniciarObj,
    validarFecha,
    fechaVencimientoMinima,
};
