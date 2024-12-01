import { contenedorFormulario } from "./Selectores.js";
import { prioridadSelect } from "./Selectores.js";
import { editando, prioridades, tareasObj } from "./Variables.js";
import { Notificaciones } from "./Classes/Notificaciones.js";
import { Administrador } from "./Classes/Administrador.js";

const admin = new Administrador();

// GUARDAR TAREA
function guardarTarea(e) {
    e.preventDefault();

    if (Object.values(tareasObj).some((valor) => valor === "")) {
        new Notificaciones({
            mensaje: "Todos los campos son obligatorios",
            tipo: "error",
        });

        for (const key in tareasObj) {
            if (!tareasObj[key]) {
                const input = formulario[key];
                input.classList.add("border-red-500");

                setTimeout(() => {
                    input.classList.remove("border-red-500");
                }, 3000);
            }
        }
        return;
    }

    if (!validarFecha(tareasObj.fechaVencimiento)) {
        return;
    }

    if (editando.value) {
        admin.editar({ ...tareasObj });
        Modal("cerrar");
        new Notificaciones({
            mensaje: "Tarea editada con Exito",
            tipo: "exito",
        });

        const btnSubmit = document.querySelector("button[type='submit'");
        btnSubmit.textContent = "Guardar tarea";
    } else {
        admin.agregar({ ...tareasObj });
        Modal("cerrar");
        new Notificaciones({
            mensaje: "Tarea guardada con Exito",
            tipo: "exito",
        });
    }

    formulario.reset();
    reiniciarObj();
    editando.value = false;
}

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

// OBTENER LOD DATOS DE CADA INPUT
function obtenerDatos(e) {
    tareasObj[e.target.name] = e.target.value.trim();
}

// GENERAR ID UNICO PARA CADA TAREA
function generarId() {
    return Date.now();
}

// REINICIAR OBJETO
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

// VALIDAR FECHA AL MOMENTO DE GUARDAR
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

// VALIDAR QUE LA FECHA SEA MAYOR QUE LA ACTUAL
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

// CARGAR EDICION
function cargarEdicion(clone) {
    Object.assign(tareasObj, clone);

    nombre.value = clone.nombre;
    descripcion.value = clone.descripcion;
    fechaVencimiento.value = clone.fechaVencimiento;
    prioridad.value = clone.prioridad;
    editando.value = true;

    const btnSubmit = document.querySelector("button[type='submit'");
    btnSubmit.textContent = "Actualizar tarea";

    Modal("abrir");
}

export {
    guardarTarea,
    llenarPrioridad,
    Modal,
    obtenerDatos,
    generarId,
    reiniciarObj,
    validarFecha,
    fechaVencimientoMinima,
    cargarEdicion,
};
