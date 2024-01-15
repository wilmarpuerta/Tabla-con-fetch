const tabla = document.createElement("table");
tabla.classList.add("table", "table-dark", "table-striped", "table-hover");
const encabezados = ["Id", "Nombre", "Email", "Accion"];
const encabezadoRow = document.createElement("tr");
encabezadoRow.classList.add("encabezados");
const inputNombre = document.getElementById("nameUser");
const inputEmail = document.getElementById("emailUser");
const btn = document.getElementById("btn-formulario");
const modalBody = document.querySelector('.modal-body');

encabezados.forEach(encabezado => {
    const th = document.createElement("th");
    th.textContent = encabezado;
    encabezadoRow.appendChild(th);
});
tabla.appendChild(encabezadoRow);

const root = document.getElementById("root");
root.appendChild(tabla);

// Tbody
const tbody = document.createElement("tbody");
tabla.appendChild(tbody);


const result = fetch("https://memin.io/public/api/users")
    .then(result => {
        return result.json()
    }).then(data => {
        data.forEach(function (element) {
            const fila = document.createElement("tr");

            // Celda del nombre
            const idCell = document.createElement("td");
            idCell.textContent = element.id;
            fila.appendChild(idCell);

            // Celda del nombre
            const nombreCell = document.createElement("td");
            nombreCell.textContent = element.name;
            fila.appendChild(nombreCell);

            // Celda del email
            const emailCell = document.createElement("td");
            emailCell.textContent = element.email;
            fila.appendChild(emailCell);

            // Boton de eliminar
            const actionCell = document.createElement("td");
            const remove = document.createElement("button");
            remove.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#ffffff" d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7Zm2-4h2V8H9v9Zm4 0h2V8h-2v9Z"/></svg>`;
            remove.style = "background-color: rgba(255, 0, 0, 0.749); border-radius: 5px; border: none; padding: 5px;";
            remove.setAttribute("onclick", "deleteDato(this)");
            fila.appendChild(actionCell);
            actionCell.append(remove);

            // Boton de ver detalles
            const detalles = document.createElement("button");
            detalles.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#ffffff" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"/></svg>`;
            detalles.style = "background-color: green; border-radius: 5px; border: none; padding: 5px;";
            detalles.setAttribute("data-bs-toggle", "modal");
            detalles.setAttribute("data-bs-target", "#Modal")
            detalles.setAttribute("onclick", "verDetalles(this)");
            fila.appendChild(actionCell);
            actionCell.append(detalles);

            // Boton de actualizar
            const actualizar = document.createElement("button");
            actualizar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48"><g fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"><path d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20"/><path d="M33.542 27c-1.274 4.057-5.064 7-9.542 7c-4.477 0-8.268-2.943-9.542-7v6m19.084-18v6c-1.274-4.057-5.064-7-9.542-7c-4.477 0-8.268 2.943-9.542 7"/></g></svg>`;
            actualizar.style = "background-color: blue; border-radius: 5px; border: none; padding: 5px;";
            actualizar.setAttribute("onclick", "update(this)");
            fila.appendChild(actionCell);
            actionCell.append(actualizar);

            // Agregar la fila a la tabla
            tbody.appendChild(fila);

        });
    });

// Funcion de eliminar registro

function deleteDato(element) {
    const elementoPadre = (element.parentElement).parentElement;
    const id = elementoPadre.children[0].textContent;

    tbody.removeChild(elementoPadre);

    fetch(`https://memin.io/public/api/users/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-type": "aplication/json"
        }
    })
        .then(reponse => {
            return reponse.json()
        });
};

// Función del boton actualizar

let id;

function update(element) {
    const elementoPadre = (element.parentElement).parentElement;
    id = elementoPadre.children[0].textContent;
    const nombre = elementoPadre.children[1].textContent;
    const email = elementoPadre.children[2].textContent;
    btn.removeEventListener("click", crearRegistro);
    btn.setAttribute("onclick", "updateRegister()");
    btn.textContent = "Actualizar Registro";

    inputNombre.value = nombre;
    inputEmail.value = email;

    // Desplazamiendo al inicio de la pagina
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Función de actualizar registro

function updateRegister() {
    userName = inputNombre.value;
    userEmail = inputEmail.value;

    fetch(`https://memin.io/public/api/users/${id}`, {
        method: 'PUT',
        headers: {
            "Content-type": "aplication/json"
        },
        body: JSON.stringify({ name: userName, email: userEmail }),
    })
        .then(reponse => {
            return reponse.json()
        }).then(data => {
            console.log(data)
        });

    inputNombre.value = "";
    inputEmail.value = "";

    btn.removeEventListener("click", updateRegister);
    btn.setAttribute("onclick", "crearRegistro()");
    btn.textContent = "Crear Registro";

    // Recarga de pagina
    function recargarPagina() {
        location.reload();
    }

    const tiempoEspera = 1200;
    setTimeout(recargarPagina, tiempoEspera);
};


// Función de crear registro

function crearRegistro() {
    userName = inputNombre.value;
    userEmail = inputEmail.value;

    fetch(`https://memin.io/public/api/users`, {
        method: 'POST',
        headers: {
            "Content-type": "aplication/json"
        },
        body: JSON.stringify({ name: userName, email: userEmail }),
    })
        .then(reponse => {
            return reponse.json()
        }).then(data => {
            console.log(data)
        });

    inputNombre.value = "";
    inputEmail.value = "";

    // Recarga de pagina
    function recargarPagina() {
        location.reload();
    }

    const tiempoEspera = 1200;
    setTimeout(recargarPagina, tiempoEspera);
};

// Función de ver detalles

function verDetalles(element) {
    const elementoPadre = (element.parentElement).parentElement;
    const userid = elementoPadre.children[0].textContent;

    fetch(`https://memin.io/public/api/users/${userid}`)
        .then(reponse => {
            return reponse.json()
        }).then(data => {
            modalBody.innerHTML = `
                <h5>ID: ${data.id}</h5>
                <p>Nombre: ${data.name}</p>
                <p>Email: ${data.email}</p>
                <p>Password: ${data.password}</p>
                <p>Last update: ${data.updated_at}</p>
                <p>Created at: ${data.created_at}</p>`
        });
}