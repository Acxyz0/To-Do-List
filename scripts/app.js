import {
    btnAbrirModal,
    btnCerrarModal,
    contenedorFormulario,
    formulario,
    contenedorCards,
    prioridadSelect,
    nombre,
    descripcion,
    fechaVencimiento,
    prioridad,
} from "./Selectores.js";
import {
    llenarPrioridad,
    Modal,
    obtenerDatos,
    reiniciarObj,
    validarFecha,
    fechaVencimientoMinima,
} from "./Funciones.js";
import { editando, tareasObj } from "./Variables.js";

export { Notificaciones };

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

class Administrador {
    constructor() {
        this.tareas = [
            {
                descripcion:
                    "Estudiar JS con el curso de Udemy, y realizar pequeños proyectos",
                estado: "pendiente",
                fechaVencimiento: "2024-12-06",
                id: 1732671505147,
                nombre: "Estudiar JS",
                prioridad: "media",
            },
            {
                descripcion: "Realizar proyecto de estudiantes",
                estado: "pendiente",
                fechaVencimiento: "2024-11-28",
                id: 1732671505148,
                nombre: "Proyecto Gestión de Estudiantes",
                prioridad: "maxima",
            },
            {
                descripcion: "Realizar proyecto de estudiantes",
                estado: "pendiente",
                fechaVencimiento: "2024-11-26",
                id: 1732671505149,
                nombre: "Proyecto Gestión de Estudiantes",
                prioridad: "maxima",
            },
        ];
        this.mostrar();
    }

    agregar(obj) {
        this.tareas = [...this.tareas, obj];
        this.mostrar();
    }

    editar(tareaActualizada) {
        this.tareas = this.tareas.map((tarea) =>
            tarea.id === tareaActualizada.id ? tareaActualizada : tarea
        );
        this.mostrar();
    }

    eliminar(id) {
        this.tareas = this.tareas.filter((tarea) => tarea.id !== id);
        this.mostrar();
    }

    mostrar() {
        while (contenedorCards.firstChild) {
            contenedorCards.removeChild(contenedorCards.firstChild);
        }

        this.tareas.forEach((tarea) => {
            const cards = document.createElement("div");
            cards.classList.add(
                "bg-white",
                "p-4",
                "rounded-lg",
                "w-auto",
                "space-y-2",
                "shadow-md",
                "relative"
            );

            // Título
            const titulo = document.createElement("h2");
            titulo.textContent = tarea.nombre;
            titulo.classList.add(
                "font-bold",
                "text-center",
                "text-lg",
                "capitalize"
            );

            // Descripción
            const descripcion = document.createElement("p");
            descripcion.textContent = tarea.descripcion;

            // Fecha de vencimiento
            const fechaVencimiento = document.createElement("p");
            const claseFecha = fechaVencimientoMinima(tarea.fechaVencimiento);
            fechaVencimiento.innerHTML = `<span class="font-bold uppercase text-black">Fecha de Vencimiento: </span> <span class="${claseFecha}">${tarea.fechaVencimiento}</span>`;

            // Prioridad
            const prioridad = document.createElement("p");
            if (tarea.prioridad === "minima") {
                prioridad.classList.add("text-green-500");
            } else if (tarea.prioridad === "media") {
                prioridad.classList.add("text-yellow-500");
            } else {
                prioridad.classList.add("text-red-500");
            }
            prioridad.innerHTML = `
                                <span class="font-bold uppercase text-black">Prioridad: </span>
                                <span class="${
                                    tarea.prioridad === "minima"
                                        ? "text-green-500"
                                        : tarea.prioridad === "media"
                                        ? "text-yellow-500"
                                        : "text-red-500"
                                }">
                                    ${
                                        tarea.prioridad === "minima"
                                            ? "🟢"
                                            : tarea.prioridad === "media"
                                            ? "🟡"
                                            : "🔴"
                                    } ${tarea.prioridad}
                                </span>`;

            // Estado
            const estado = document.createElement("p");
            estado.innerHTML = `<span class="font-bold uppercase text-black">Estado: </span> ${tarea.estado}`;

            // Boton Editar
            const btnEditar = document.createElement("button");
            btnEditar.classList.add(
                "py-1",
                "px-2",
                "bg-indigo-600",
                "hover:bg-indigo-700",
                "text-white",
                "font-bold",
                "uppercase",
                "rounded-lg",
                "flex",
                "items-center",
                "gap-1",
                "w-full",
                "justify-center"
            );
            btnEditar.innerHTML =
                'Editar <svg fill="none" class="h-4 w-4" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';
            const clone = structuredClone(tarea);
            btnEditar.onclick = () => cargarEdicion(clone);

            // Boton Eliminar
            const btnEliminar = document.createElement("button");
            btnEliminar.classList.add(
                "py-1",
                "px-2",
                "bg-red-600",
                "hover:bg-red-700",
                "text-white",
                "font-bold",
                "uppercase",
                "rounded-lg",
                "flex",
                "items-center",
                "gap-1",
                "w-full",
                "justify-center"
            );
            btnEliminar.innerHTML =
                'Eliminar <svg fill="none" class="h-4 w-4" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
            btnEliminar.onclick = () => this.eliminar(tarea.id);

            // Contenedor de Botones
            const contenedorBotones = document.createElement("div");
            contenedorBotones.classList.add(
                "flex",
                "gap-2",
                "mt-5",
                "w-full",
                "justify-between"
            );
            contenedorBotones.appendChild(btnEditar);
            contenedorBotones.appendChild(btnEliminar);

            // Agregar elementos a la tarjeta
            cards.appendChild(titulo);
            cards.appendChild(descripcion);
            cards.appendChild(fechaVencimiento);
            cards.appendChild(prioridad);
            cards.appendChild(estado);
            cards.appendChild(contenedorBotones);

            contenedorCards.appendChild(cards);
        });
    }
}

class Notificaciones {
    constructor({ mensaje, tipo }) {
        this.mensaje = mensaje;
        this.tipo = tipo;
        this.alerta();
    }

    alerta() {
        if (this.tipo === "error") {
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: this.mensaje,
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: this.mensaje,
                showConfirmButton: false,
                timer: 1500,
            });
        }
    }
}

const admin = new Administrador();

// FUNCIONES
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
