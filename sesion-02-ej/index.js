// --- Ejercicio sesión-02: Calendario con Eventos y Recordatorios --- //
// Andrei Coman
// 08/10/2025

import { Evento, Recordatorio, Calendario } from "./calendarios.js";

// --- Pruebas --- //
let miEvento1 = new Evento("Evento1", new Date("2025-09-10T14:00:00"), 30);
let miEvento2 = new Evento("Evento2", new Date("2025-09-10T14:15:00"), 10);
let miEvento3 = new Evento("Evento3", new Date("2025-09-11T18:00:00"), 30);

console.log("\n--- Creación/ToString Clase Eventos ---");
console.log(miEvento1.toString());
console.log(miEvento2.toString());
console.log(miEvento3.toString());
console.log("\n--- Comprobar Solapamiento ---");
console.log(`Solapan 1 y 2: ${miEvento1.solapaCon(miEvento2)}`)
console.log(`Solapan 1 y 3: ${miEvento1.solapaCon(miEvento3)}`)
console.log("\n--- Comprobar Contiene ---");
console.log(`Contiene Evento1 a 2025-09-10T14:15:00: ${miEvento1.contiene(new Date("2025-09-10T14:15:00"))}`)
console.log(`Contiene Evento1 a 2025-09-11T14:15:00: ${miEvento1.contiene(new Date("2025-09-11T14:15:00"))}`)

console.log("\n--- Creación/ToString Recordatorio ---");
const miRecordatorio = new Recordatorio(miEvento1, 15);
console.log(miRecordatorio.toString());

console.log("\n--- Añade Evento1 Calendario ---");
const miCalendario = new Calendario("Personal");
miEvento1 = miCalendario.añadirEvento("Evento1", new Date("2025-09-10T14:00:00"), 30);
console.log("\n--- Añade Evento2 (solapa) Calendario ---");
miEvento2 = miCalendario.añadirEvento("Evento2", new Date("2025-09-10T14:15:00"), 10); // Error: Solapamiento
console.log("\n--- Añade Evento3 Calendario ---");
miEvento3 = miCalendario.añadirEvento("Evento3", new Date("2025-09-11T18:00:00"), 30);
console.log("\n--- Añade Recordatorio-15mins a Evento3 Calendario ---");
miCalendario.crearRecordatorio(miEvento3, 15);
console.log("\n--- Añade Recordatorio-30mins a Evento3 Calendario ---");
miCalendario.crearRecordatorio(miEvento3, 30);
console.log("\n--- ToString Calendario ---");
console.log(miCalendario.toString());
console.log("\n--- Get/Mostrar Recordatorios de Evento3 ---");
miCalendario.recordatoriosDe(miEvento3).forEach(r => console.log(r.toString()));
console.log("\n--- Get/Mostrar Recordatorios de Evento2 (no existe - no añadido por solapamiento) ---");
miCalendario.recordatoriosDe(miEvento2).forEach(r => console.log(r.toString()));

console.log("\n--- Borra Evento2 (no existe - no añadido por solapamiento) ---");
miCalendario.borrarEvento(miEvento2); // Error, evento no existe! (No añadido por solapamiento)
console.log("\n--- Borra Evento3 ---");
miCalendario.borrarEvento(miEvento3);
console.log("\n--- ToString Calendario ---");
console.log(miCalendario.toString());

console.log("\n--- Añade EventoFuturo1 Calendario ---");
miCalendario.añadirEvento("EventoFuturo1", new Date("2027-09-10T14:00:00"), 30);
console.log("\n--- Añade EventoFuturo2 Calendario ---");
miCalendario.añadirEvento("EventoFuturo2", new Date("2030-09-10T14:00:00"), 30);
console.log("\n--- ToString Calendario ---");
console.log(miCalendario.toString());
console.log("\n--- Get/Mostrar Eventos Futuros ---");
miCalendario.eventosFuturos().forEach(e => console.log(e.toString()));