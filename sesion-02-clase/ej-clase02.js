// --- Ejercicio de clase sesión-02 --- //
// Andrei Coman
// 08/10/2025

// Clase Usuario
class Usuario {
    constructor(nombre, email) {
        this.nombre = nombre;
        this.email = email;
    }

    toString() {
        return `Usuario: ${this.nombre}, Email: ${this.email}`;
    }
}

const miUsuario = new Usuario("Andrei", "andrei@um.es");
console.log(miUsuario); // object
console.log("Usuario: " + miUsuario.toString()); // cast to string

// Clase RepositorioUsuarios

class RepositorioUsuarios {
    #usuarios; // array
    constructor() {
        this.#usuarios = [];
    }

    insertar(usuario) {
        this.#usuarios.push(usuario);
    }

    findByEmail(email) {
        const usuario = this.#usuarios.find(u => u.email === email);

        return new Promise ((resolve, reject) => {
            setTimeout(() => {
                if (usuario) {
                    resolve(usuario);
                } else {
                    reject(new Error("Usuario no encontrado"));
                }
            }, 1000);
        });
    }
}

// Pruebas
const repo = new RepositorioUsuarios();
repo.insertar(new Usuario("Andrei", "andrei@um.es"));
const usuarioBuscado = repo.findByEmail("andrei@um.es");
console.log(usuarioBuscado); // Promise { <pending> }
usuarioBuscado
    .then(usuario => console.log("Usuario encontrado: " + usuario.toString()))
    .catch(err => console.error(err.message));
console.log("Búsqueda en curso...");