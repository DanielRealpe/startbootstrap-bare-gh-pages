const ventasData = [
    {
        id: 101,
        fechaHora: "2024-08-23 / 19:30",
        empleado: "Carlos Darwin Alzate",
        cliente: "Rubén Darío Llanes",
        estado: "Pagada",
        pedidos: [
            { producto: "Hamburguesa", cantidad: 2, precio: 15000, detalle: "Sin pepinillos" },
            { producto: "Papas Fritas", cantidad: 1, precio: 8000, detalle: "Extra salsa" }
        ]
    },
    {
        id: 102,
        fechaHora: "2024-08-24 / 11:00",
        empleado: "María Gómez",
        cliente: "Pedro Sánchez",
        estado: "Pendiente",
        pedidos: [
            { producto: "Pizza", cantidad: 1, precio: 20000, detalle: "Sin queso" }
        ]
    },
    {
        id: 103,
        fechaHora: "2024-08-25 / 15:20",
        empleado: "Jorge Pérez",
        cliente: "Ana García",
        estado: "Cancelada",
        pedidos: []
    }
];


// Función para cargar datos en la tabla
function loadTableData() {
    const tableBody = document.getElementById('tbodyVentas');
    if (!tableBody) {
        console.error('No se encontró el elemento tbodyVentas');
        return;
    }

    const data = ventasData;

    // Limpiar la tabla
    tableBody.innerHTML = '';

    // Agregar nuevos datos
    data.forEach(item => {
        const row = `<tr>
                        <td>${item.id}</td>
                        <td>${item.fechaHora}</td>
                        <td>${item.empleado}</td>
                        <td>${item.cliente}</td>
                        <td>${item.estado}</td>
                        <td>
                    <button class="btn btn-info btn-sm me-2" onclick="verDetalles(${item.id})">
                        <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="borrarVenta(${item.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
                    </tr>`;
        tableBody.innerHTML += row;
    });
}

function verDetalles(id) {
    const venta = ventasData.find(item => item.id === id);
    if (!venta) {
        console.error('Venta no encontrada');
        return;
    }

    const detallePedidos = document.getElementById('detallePedidos');
    detallePedidos.innerHTML = ''; // Limpiar contenido previo

    // Generar filas para los pedidos de la venta seleccionada
    venta.pedidos.forEach(pedido => {
        const row = `<tr>
                        <td>${pedido.producto}</td>
                        <td>${pedido.cantidad}</td>
                        <td>${pedido.precio}</td>
                        <td>${pedido.cantidad * pedido.precio}</td>
                        <td>${pedido.detalle}</td>
                    </tr>`;
        detallePedidos.innerHTML += row;
    });
    detallePedidos.innerHTML = ''

    // Mostrar el modal
    const modal = new bootstrap.Modal(document.getElementById('modalDetalles'));
    modal.show();
}


function borrarVenta(id) {
    const index = ventasData.findIndex(venta => venta.id === id);
    if (index !== -1) {
        ventasData.splice(index, 1);
        loadTableData();
    }
}


// No es necesario llamar a loadTableData() aquí, se llamará desde scripts.js


