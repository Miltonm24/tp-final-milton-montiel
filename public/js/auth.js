const API_URL = '/api/auth';

document.getElementById('registroForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value;
    const rol = document.getElementById('rol').value;

    try {
        const response = await fetch(`${API_URL}/registrar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo, contrasena, rol })
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.data.usuario));
            window.location.href = 'dashboard.html';
        } else {
            alert(data.mensaje || 'Error en el registro');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value;

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo, contrasena })
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.data.usuario));
            window.location.href = 'dashboard.html';
        } else {
            alert(data.mensaje || 'Error en el login');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

document.getElementById('logoutBtn')?.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
});

// Proteger rutas front
if (window.location.pathname.includes('dashboard.html')) {
    if (!localStorage.getItem('token')) {
        window.location.href = 'login.html';
    } else {
        const user = JSON.parse(localStorage.getItem('user'));
        document.getElementById('userEmail').textContent = user.correo;
    }
}
