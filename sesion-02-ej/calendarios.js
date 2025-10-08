// --- Ejercicio sesión-02: Calendario con Eventos y Recordatorios --- //
// Andrei Coman
// 08/10/2025

class Evento {
    #nombre;
    #inicio;
    #fin;

    get nombre() { return this.#nombre; }
    get inicio() { return this.#inicio; }
    get fin() { return this.#fin; }

    constructor(nombre, inicio, duracion) {
        if (!(inicio instanceof Date)) throw new Error("Inicio debe ser de tipo Date");

        this.#nombre = nombre;
        this.#inicio = inicio;
        this.#fin = new Date(this.#inicio.getTime() + duracion * 60000); // Duración en minutos
    }

    contiene(fechaHora) {
        if (!(fechaHora instanceof Date)) throw new Error("FechaHora debe ser de tipo Date");
        return (fechaHora <= this.#fin && fechaHora >= this.#inicio) ? true : false
    }

    solapaCon(otroEvento) {
        // Se solapan:
        // si fechaIni1 < fechaFin2 && fechaIni2 < fechaFin1
        // tambien se podria hacer con contiene A.contiene(B.inicio) || A.contiene(B.fin) || B.contiene(A.inicio) || B.contiene(A.fin)
        return (this.#inicio < otroEvento.#fin && otroEvento.#inicio < this.#fin) ? true : false
    }

    toString() {
        return `  ${this.#nombre}\n    Inicio: ${this.#inicio.toLocaleString()}\n    Fin: ${this.#fin.toLocaleString()}`;
    }
}

class Recordatorio {
    #evento;
    #aviso;

    constructor(evento, minutosAntes) {
        this.#evento = evento;
        this.#aviso = new Date(this.#evento.inicio.getTime() - minutosAntes * 60000);
    }

    toString() {
        return `    Recordatorio: ${this.#evento.nombre} a las ${this.#aviso.toLocaleString()}`;
    }
}

class Calendario {
    #nombre;
    #eventosRecordatorios;

    constructor(nombre) {
        this.#nombre = nombre;
        this.#eventosRecordatorios = new Map(); // Map<Evento, Set<Recordatorio>> (Set para evitar duplicados)
    }

    #solapaConEventos(nuevoEvento) {
        for (const evento of this.#eventosRecordatorios.keys()) {
            if (evento.solapaCon(nuevoEvento))
                return true;
        }

        return false;
    }

    añadirEvento(nombre, inicio, duracionMinutos) {       
        const nuevoEvento = new Evento(nombre, inicio, duracionMinutos);
        if(this.#solapaConEventos(nuevoEvento)) {
            console.error("No añadido. El evento solapa con otros eventos!");
            return null;
        }

        this.#eventosRecordatorios.set(nuevoEvento, new Set());
        return nuevoEvento; // Devuelve la referencia para poder borrarlo luego
        // aunque idealmente creo que seria mejor añadirEvento(evento) y crear evento
        // new Evento(...), pero segun especificaciones se pide así.
    }

    borrarEvento(evento) {
        if (!this.#eventosRecordatorios.delete(evento)) {
            console.error("No borrado. Este evento no está en el calendario!");
            return null;
        }
        return evento; // Devuelve evento borrado
    }

    crearRecordatorio(evento, minutosAntes) {
        if (!this.#eventosRecordatorios.has(evento)) {
            console.error("No creado. Este evento no está en el calendario!");
            return null;
        }

        const nuevoRecordatorio = new Recordatorio(evento, minutosAntes);
        const recordatoriosExistentes = this.#eventosRecordatorios.get(evento);

        recordatoriosExistentes.add(nuevoRecordatorio);
        return nuevoRecordatorio; // Devuelve el nuevo recordatorio creado
    }

    recordatoriosDe(evento) { 
        if (!this.#eventosRecordatorios.has(evento)) {
            console.error("Este evento no está en el calendario!");
            return [];
        }

        const set = this.#eventosRecordatorios.get(evento);
        return set ? Array.from(set) : [];
    }

    eventosFuturos() {
        const fechaActual = Date.now();
        let eventosFuturos = [];
        for (const evento of this.#eventosRecordatorios.keys()) {
            if (evento.inicio.getTime() >= fechaActual)
                eventosFuturos.push(evento);
        }
        return eventosFuturos;
    }

    toString() {
        let output = `Calendario: ${this.#nombre}\nEventos:\n`;
        for (const [evento, recordatorio] of this.#eventosRecordatorios) {
            output += `${evento.toString()}\n`;
            if (recordatorio && recordatorio.size > 0) {
                recordatorio.forEach(r => output += `${r.toString()}\n`);
            }
        }
        return output;
    }
}

export { Evento, Recordatorio, Calendario };