document.addEventListener('DOMContentLoaded', function() {
    // Cargar el contenido de ventas al iniciar la página
    cargarContenido('ventas');

    // Agregar event listeners a las pestañas
    document.querySelectorAll('[data-bs-toggle="tab"]').forEach(tab => {
        tab.addEventListener('shown.bs.tab', function (event) {
            const target = event.target.getAttribute('aria-controls');
            cargarContenido(target);
        });
    });

    function cargarContenido (seccion) {
        const contenedor = document.getElementById(seccion);
        if (seccion === 'ventas') {
            fetch('assets/pages/ventas.html')
                .then(response => response.text())
                .then(data => {
                    contenedor.innerHTML = data;
                    // Llamar a la función para cargar los datos de la tabla
                    if (typeof loadTableData === 'function') {
                        loadTableData();
                    }
                })
                .catch(error => {
                    console.error('Error al cargar el contenido de ventas:', error);
                    contenedor.innerHTML = '<p>Error al cargar el contenido.</p>';
                });
        }
        if (seccion === 'clientes') {
            fetch('assets/pages/clientes.html')
                .then(response => response.text())
                .then(data => {
                    contenedor.innerHTML = data;
                    // Llamar a la función para cargar los datos de la tabla
                    if (typeof loadTableClientes === 'function') {
                        loadTableClientes();
                    }
                })
                .catch(error => {
                    console.error('Error al cargar el contenido de clientes:', error);
                    contenedor.innerHTML = '<p>Error al cargar el contenido.</p>';
                });
        }
        // Aquí puedes agregar más condiciones para cargar otros contenidos si es necesario
    }
});