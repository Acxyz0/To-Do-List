export class Notificaciones {
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
