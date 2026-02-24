const MASCOTAS_URL = '/api/mascotas';
const DUENOS_URL = '/api/duenos';

const token = localStorage.getItem('token');

async function cargarMascotas() {
    try {
        const response = await fetch(MASCOTAS_URL, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        const tbody = document.getElementById('mascotasTable');
        tbody.innerHTML = '';

        data.data.mascotas.forEach(mascota => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${mascota.nombre}</td>
                <td>${mascota.especie}</td>
                <td>${mascota.edad} años</td>
                <td>${mascota.dueno ? `${mascota.dueno.nombre} ${mascota.dueno.apellido}` : 'Sin dueño'}</td>
                <td class="actions">
                    <button class="btn-sm btn-edit" onclick="editarMascota('${mascota._id}')">Editar</button>
                    <button class="btn-sm btn-delete" onclick="eliminarMascota('${mascota._id}')">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error al cargar mascotas:', error);
    }
}

async function guardarMascota(e) {
    e.preventDefault();
    const id = document.getElementById('mascotaId').value;
    const nombre = document.getElementById('nombre').value;
    const especie = document.getElementById('especie').value;
    const raza = document.getElementById('raza').value;
    const edad = document.getElementById('edad').value;
    const duenoDni = document.getElementById('duenoDni').value;

    try {
        // En un caso real, primero buscaríamos o crearíamos al dueño
        // Para este TP, asumiremos que si no existe, lo creamos rápido
        let duenoId;
        const respDueno = await fetch(`${DUENOS_URL}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const duenosData = await respDueno.json();
        const duenoEncontrado = duenosData.data.duenos.find(d => d.dni === duenoDni);

        if (!duenoEncontrado) {
            const respCrearDueno = await fetch(DUENOS_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ nombre: 'Pepe', apellido: 'Perez', dni: duenoDni, telefono: '123456789' })
            });
            const nuevoD = await respCrearDueno.json();
            duenoId = nuevoD.data.dueno._id;
        } else {
            duenoId = duenoEncontrado._id;
        }

        const method = id ? 'PUT' : 'POST';
        const url = id ? `${MASCOTAS_URL}/${id}` : MASCOTAS_URL;

        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ nombre, especie, raza, edad, duenoId })
        });

        if (response.ok) {
            cerrarModal();
            cargarMascotas();
        } else {
            alert('Error al guardar mascota');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function eliminarMascota(id) {
    if (!confirm('¿Estás seguro de eliminar esta mascota?')) return;
    try {
        const response = await fetch(`${MASCOTAS_URL}/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) cargarMascotas();
    } catch (error) {
        console.error('Error:', error);
    }
}

function abrirModal() {
    document.getElementById('mascotaModal').style.display = 'flex';
    document.getElementById('mascotaForm').reset();
    document.getElementById('mascotaId').value = '';
    document.getElementById('modalTitle').textContent = 'Nueva Mascota';
}

function cerrarModal() {
    document.getElementById('mascotaModal').style.display = 'none';
}

async function editarMascota(id) {
    try {
        const response = await fetch(`${MASCOTAS_URL}/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        const m = data.data.mascota;

        document.getElementById('mascotaId').value = m._id;
        document.getElementById('nombre').value = m.nombre;
        document.getElementById('especie').value = m.especie;
        document.getElementById('raza').value = m.raza;
        document.getElementById('edad').value = m.edad;
        document.getElementById('duenoDni').value = m.dueno.dni;

        document.getElementById('modalTitle').textContent = 'Editar Mascota';
        document.getElementById('mascotaModal').style.display = 'flex';
    } catch (error) {
        console.error('Error:', error);
    }
}

document.getElementById('mascotaForm')?.addEventListener('submit', guardarMascota);

if (window.location.pathname.includes('dashboard.html')) {
    cargarMascotas();
}
