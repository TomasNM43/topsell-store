'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { registerUser, registerGuest } from '@/services/auth';
import { FaUser, FaUserSecret, FaCheckCircle } from 'react-icons/fa';

export default function RegistroPage() {
    const [activeTab, setActiveTab] = useState('cliente'); // 'cliente' | 'invitado'
    const { login } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        email: '',
        telefono: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            let response;

            if (activeTab === 'cliente') {
                // --- FLUJO CLIENTE HABITUAL ---
                if (formData.password.length < 6) throw new Error("La contraseña debe tener al menos 6 caracteres.");

                await registerUser(formData); // Solo registramos

                // NO logueamos automáticamente. Redirigimos al Login.
                // Podemos pasar un parámetro en la URL para mostrar un mensaje de éxito allí.
                router.push('/login?registro_exitoso=true');

            } else {
                // --- FLUJO INVITADO ---
                // Aquí SÍ logueamos directo porque el invitado no tiene contraseña para volver a entrar
                const { password, ...guestData } = formData;
                response = await registerGuest(guestData);

                login(response.user, response.token);
                router.push('/carrito');
            }

        } catch (err) {
            setError(err.message || "Hubo un error al procesar el registro.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 flex justify-center items-start font-sans">
            <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">

                <div className="text-center pt-10 pb-6 bg-secondary px-6">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-2">Crear Cuenta</h2>
                    <p className="text-gray-400 text-lg">Elige cómo quieres interactuar con Topsell</p>
                </div>

                {/* --- TABS --- */}
                <div className="flex border-b border-gray-200 bg-gray-50">
                    <button
                        onClick={() => setActiveTab('cliente')}
                        className={`flex-1 py-5 text-lg font-bold uppercase tracking-wide transition flex justify-center items-center gap-2
                    ${activeTab === 'cliente' ? 'border-b-4 border-primary text-primary bg-white' : 'text-gray-400 hover:text-secondary hover:bg-gray-100'}
                `}
                    >
                        <FaUser /> Cliente Habitual
                    </button>
                    <button
                        onClick={() => setActiveTab('invitado')}
                        className={`flex-1 py-5 text-lg font-bold uppercase tracking-wide transition flex justify-center items-center gap-2
                    ${activeTab === 'invitado' ? 'border-b-4 border-primary text-primary bg-white' : 'text-gray-400 hover:text-secondary hover:bg-gray-100'}
                `}
                    >
                        <FaUserSecret /> Invitado (Rápido)
                    </button>
                </div>

                {/* --- CONTENIDO --- */}
                <div className="p-8 md:p-10">

                    {/* Mensaje Informativo según Tab */}
                    <div className={`mb-8 p-4 rounded-lg text-lg flex gap-3 items-start border
                ${activeTab === 'cliente' ? 'bg-blue-50 text-blue-800 border-blue-100' : 'bg-orange-50 text-orange-800 border-orange-100'}
            `}>
                        <FaCheckCircle className="mt-0.5 flex-shrink-0 text-lg" />
                        <div>
                            <h4 className="font-bold mb-1">
                                {activeTab === 'cliente' ? 'Registro Completo' : 'Modo Cotización Rápida'}
                            </h4>
                            <p className="opacity-90">
                                {activeTab === 'cliente'
                                    ? "Crea una cuenta segura para guardar tu historial, direcciones y acelerar tus futuras compras."
                                    : "Ideal si solo deseas realizar una cotización puntual sin crear contraseñas. Solo necesitamos tus datos de contacto."
                                }
                            </p>
                        </div>
                    </div>

                    {error && (
                        <div className="mb-6 bg-red-50 text-red-600 p-4 rounded border border-red-100 text-center text-sm font-bold">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Nombres */}
                        <div className="col-span-1">
                            <label className="text-base font-bold text-secondary uppercase mb-2 block">Nombres</label>
                            <input
                                name="nombres"
                                required
                                value={formData.nombres}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition text-sm"
                                placeholder="Ej. Juan"
                            />
                        </div>

                        {/* Apellidos */}
                        <div className="col-span-1">
                            <label className="text-base font-bold text-secondary uppercase mb-2 block">Apellidos</label>
                            <input
                                name="apellidos"
                                required
                                value={formData.apellidos}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition text-sm"
                                placeholder="Ej. Pérez"
                            />
                        </div>

                        {/* Email */}
                        <div className="col-span-1 md:col-span-2">
                            <label className="text-base font-bold text-secondary uppercase mb-2 block">Correo Electrónico</label>
                            <input
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition text-sm"
                                placeholder="ejemplo@empresa.com"
                            />
                        </div>

                        {/* Teléfono */}
                        <div className="col-span-1 md:col-span-2">
                            <label className="text-base font-bold text-secondary uppercase mb-2 block">Teléfono / Celular</label>
                            <input
                                name="telefono"
                                type="tel"
                                required
                                value={formData.telefono}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition text-sm"
                                placeholder="+51 999 999 999"
                            />
                        </div>

                        {/* Password (SOLO VISIBLE EN CLIENTE) */}
                        {activeTab === 'cliente' && (
                            <div className="col-span-1 md:col-span-2 mt-2 bg-gray-50 p-4 rounded-lg border border-gray-100">
                                <label className="text-base font-bold text-secondary uppercase mb-2 block">Crear Contraseña</label>
                                <input
                                    name="password"
                                    type="password"
                                    required={activeTab === 'cliente'}
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition text-sm"
                                    placeholder="Mínimo 6 caracteres"
                                />
                            </div>
                        )}

                        {/* Botón Submit */}
                        <div className="col-span-1 md:col-span-2 mt-6">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-secondary hover:bg-black text-white font-bold py-4 rounded-xl shadow-lg transition transform active:scale-95 uppercase tracking-widest text-lg"
                            >
                                {isLoading ? 'Procesando...' : (activeTab === 'cliente' ? 'Crear mi Cuenta' : 'Continuar y Cotizar')}
                            </button>
                        </div>

                    </form>

                    {/* Link a Login */}
                    {activeTab === 'cliente' && (
                        <div className="mt-8 text-center text-sm text-gray-500">
                            ¿Ya tienes una cuenta? <Link href="/login" className="text-primary font-bold hover:underline">Inicia Sesión</Link>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}