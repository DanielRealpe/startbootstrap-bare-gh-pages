const clienteData = [
    {
        Nombre: "Niber",
        Tipo: "TI",
        Documento: "123993",
        Telefono: "123456789",
        Direccion: "Calle 123",
        Estado: "Activo"
    },
    {
        Nombre: "Niber",
        Tipo: "TI",
        Documento: "123993",
        Telefono: "123456789",
        Direccion: "Calle 123",
        Estado: "Activo"
    },
    {
        Nombre: "Niber",
        Tipo: "TI",
        Documento: "123993",
        Telefono: "123456789",
        Direccion: "Calle 123",
        Estado: "Activo"
    }
];


// Función para cargar datos en la tabla
function loadTableClientes() {
    const tableBody = document.getElementById('tbodyClientes');
    if (!tableBody) {
        console.error('No se encontró el elemento tbodyClientes');
        return;
    }

    const data = clienteData;

    // Limpiar la tabla
    tableBody.innerHTML = '';

    // Agregar nuevos datos
    data.forEach((item, index) => {
        const row = `<tr>
                        <td>${item.Nombre}</td>
                        <td>${item.Tipo}</td>
                        <td>${item.Documento}</td>
                        <td>${item.Telefono}</td>
                        <td>${item.Direccion}</td>
                        <td id="estado-${index}">
                            <div class="d-flex align-items-center gap-2">
                                <span class="badge ${item.Estado === "Activo" ? 'bg-success' : 'bg-danger'}">
                                    ${item.Estado}
                                </span>
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="switch-${index}" 
                                        ${item.Estado === "Activo" ? 'checked' : 'unchecked'} 
                                        onclick="toggleEstado(${index})">
                                </div>
                            </div>
                        </td>
                        <td>
                            <button class="btn btn-danger btn-sm" onclick="eliminarCliente(${index})">
                                <i class="bi bi-trash"></i>
                            </button>
                            <button class="btn btn-info btn-sm" onclick="editarCliente(${index})">
                                <i class="bi bi-pencil"></i>
                            </button>
                        </td>
                    </tr>`;
        tableBody.innerHTML += row;
    });



}

function editarCliente(index) {
    // Obtener los datos del cliente a editar
    const cliente = clienteData[index];

    // Rellenar el formulario con los datos actuales
    document.getElementById('nombre').value = cliente.Nombre;
    document.getElementById('tipoDoc').value = cliente.Tipo;
    document.getElementById('numeroDoc').value = cliente.Documento;
    document.getElementById('telefono').value = cliente.Telefono;
    document.getElementById('direccion').value = cliente.Direccion;
    document.getElementById('contrasena').value = ''; // Limpiar la contraseña por seguridad
    document.getElementById('confirmarContrasena').value = ''; // Limpiar confirmación de contraseña
    document.getElementById('estado').checked = cliente.Estado === "Activo";

    // Cambiar el texto y la funcionalidad del botón
    const registrarButton = document.getElementById('jol');
    registrarButton.innerHTML = 'Actualizar';
    registrarButton.onclick = (event) => actualizarCliente(event, index);
}

    

function actualizarCliente(event, index) {
    event.preventDefault();

    // Validar campos antes de actualizar
    if (!validarFormulario()) return;

    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const tipoDoc = document.getElementById('tipoDoc').value;
    const numeroDoc = document.getElementById('numeroDoc').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const estado = document.getElementById('estado').checked ? 'Activo' : 'Inactivo';

    // Actualizar el cliente en el array
    clienteData[index] = {
        Nombre: nombre,
        Tipo: tipoDoc,
        Documento: numeroDoc,
        Telefono: telefono,
        Direccion: direccion,
        Estado: estado
    };

    // Mostrar modal de éxito
    const modal = new bootstrap.Modal(document.getElementById('successModal'));
    modal.show();

    // Limpiar el formulario
    document.getElementById('registroForm').reset();

    // Cambiar el botón de nuevo a "Registrar"
    const registrarButton = document.getElementById('jol');
    registrarButton.innerHTML = 'Registrar';
    registrarButton.onclick = registrarCliente;

    // Recargar la tabla
    loadTableClientes();
}




function registrarCliente(event) {
    event.preventDefault();

    // Validar campos antes de registrar
    if (!validarFormulario()) return;

    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const tipoDoc = document.getElementById('tipoDoc').value;
    const numeroDoc = document.getElementById('numeroDoc').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const estado = document.getElementById('estado').checked ? 'Activo' : 'Inactivo';

    // Agregar cliente al array
    clienteData.push({
        Nombre: nombre,
        Tipo: tipoDoc,
        Documento: numeroDoc,
        Telefono: telefono,
        Direccion: direccion,
        Estado: estado
    });

    // Mostrar modal de éxito
    const modal = new bootstrap.Modal(document.getElementById('successModal'));
    modal.show();

    // Limpiar el formulario
    document.getElementById('registroForm').reset();

    // Recargar la tabla
    loadTableClientes();
}



// Mostrar el mensaje de error debajo del campo
function showError(inputId, message) {
    const errorElement = document.getElementById(inputId + 'Error');
    if (errorElement) {
        errorElement.innerText = message;
    }
}

// Limpiar los mensajes de error al escribir
function clearErrors() {
    const errorElements = document.querySelectorAll('.text-danger');
    errorElements.forEach(element => {
        element.innerText = '';
    });
}

function validarFormulario() {
    let esValido = true;

    // Validar Nombre
    const nombre = document.getElementById('nombre').value.trim();
    if (!nombre) {
        mostrarError('nombre', 'El nombre es obligatorio.');
        esValido = false;
    } else {
        limpiarError('nombre');
    }

    // Validar Tipo de Documento
    const tipoDoc = document.getElementById('tipoDoc').value;
    if (tipoDoc === "Null") {
        mostrarError('tipoDoc', 'Seleccione el tipo de documento.');
        esValido = false;
    } else {
        limpiarError('tipoDoc');
    }

    // Validar Número de Documento
    const numeroDoc = document.getElementById('numeroDoc').value.trim();
    if (!numeroDoc) {
        mostrarError('numeroDoc', 'El número de documento es obligatorio.');
        esValido = false;
    } else {
        limpiarError('numeroDoc');
    }

    // Validar Teléfono
    const telefono = document.getElementById('telefono').value.trim();
    if (!telefono) {
        mostrarError('telefono', 'El teléfono es obligatorio.');
        esValido = false;
    } else {
        limpiarError('telefono');
    }

    // Validar Dirección
    const direccion = document.getElementById('direccion').value.trim();
    if (!direccion) {
        mostrarError('direccion', 'La dirección es obligatoria.');
        esValido = false;
    } else {
        limpiarError('direccion');
    }

    return esValido;
}

function mostrarError(campo, mensaje) {
    const errorDiv = document.getElementById(campo + 'Error');
    if (errorDiv) {
        errorDiv.textContent = mensaje;
    }
}

function limpiarError(campo) {
    const errorDiv = document.getElementById(campo + 'Error');
    if (errorDiv) {
        errorDiv.textContent = '';
    }
}

// Realizar más validaciones en tiempo real para otros campos...


const eliminarCliente = (index) => {
    console.log(index);
    // Mostrar confirmación
    if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
        // Eliminar cliente del array
        clienteData.splice(index, 1);

        // Recargar la tabla
        loadTableClientes();
    }
}


const toggleEstado = (index) => {
    // Mostrar el modal de confirmación

    if (confirm('¿Estás seguro de que deseas cambiar el estado de este cliente?')) {
        // Cambiar el estado en los datos
        clienteData[index].Estado = clienteData[index].Estado === "Activo" ? "Inactivo" : "Activo";

        // Actualizar la celda de estado
        const estadoCell = document.getElementById(`estado-${index}`);
        const badgeClass = clienteData[index].Estado === "Activo" ? 'bg-success' : 'bg-danger';
        const estadoTexto = clienteData[index].Estado;

        estadoCell.innerHTML = `
            <div class="d-flex align-items-center gap-2">
                <span class="badge ${badgeClass}">
                    ${estadoTexto}
                </span>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="switch-${index}" 
                        ${clienteData[index].Estado === "Activo" ? 'checked' : 'unchecked'} 
                        onclick="toggleEstado(${index})">
                </div>
            </div>
        `;

        // Cerrar el modal después de confirmar
    }
};




