const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// LOGIN REAL
export const loginUser = async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Credenciales inválidas');
    }

    return await response.json(); // Retorna { token: "...", user: {...} }
};

// REGISTRO CLIENTE REAL
export const registerUser = async (data) => {
    const payload = {
        nombres: data.nombres,
        apellidos: data.apellidos,
        email: data.email,
        telefono: data.telefono,
        password: data.password
    };

    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error('Error al registrar usuario. Verifica el correo.');
    }

    return await response.json();
};

// REGISTRO INVITADO REAL
export const registerGuest = async (data) => {
    const payload = {
        nombres: data.nombres,
        apellidos: data.apellidos,
        email: data.email,
        telefono: data.telefono
        // Sin password
    };

    const response = await fetch(`${API_URL}/auth/register-guest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error('Error al registrar invitado.');
    }

    return await response.json();
};