const tabla = document.createElement("table");
tabla.classList.add("table", "table-dark", "table-striped", "table-hover");
const encabezados = ["Id", "Nombre", "Email", "Accion"];
const encabezadoRow = document.createElement("tr");
encabezadoRow.classList.add("encabezados");

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
            const eliminarCell = document.createElement("td");
            const remove = document.createElement("button");
            remove.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path fill="#ffffff" d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7Zm2-4h2V8H9v9Zm4 0h2V8h-2v9Z"/></svg>`;
            remove.style = "background-color: rgba(255, 0, 0, 0.749); border-radius: 5px; border: none; padding: 5px;";
            fila.appendChild(eliminarCell);
            eliminarCell.append(remove);

            // Agregar la fila a la tabla
            tbody.appendChild(fila);

        });

    });