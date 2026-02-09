'use client'; // Necesario para usar useState
import { useState } from 'react';
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa"; // Importamos el icono para la flecha
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { submitContact } from '@/services/api';

function ContactForm() {
  // Estado para controlar qué tipo de documento se seleccionó
  const [tipoDocumento, setTipoDocumento] = useState('DNI');
  
  // Estados del formulario
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    numeroDocumento: '',
    razonSocial: '',
    correo: '',
    mensaje: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const { executeRecaptcha } = useGoogleReCaptcha();
  
  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  // Validar email
  const validateEmail = (email) => {
    return /^[A-Za-z0-9+_.-]+@(.+)$/.test(email);
  };
  
  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    
    // Validaciones del cliente
    if (!formData.nombres || !formData.apellidos) {
      setMessage({ type: 'error', text: 'Por favor completa nombres y apellidos' });
      return;
    }
    
    if (!formData.numeroDocumento) {
      setMessage({ type: 'error', text: 'Por favor ingresa tu número de documento' });
      return;
    }
    
    if (!validateEmail(formData.correo)) {
      setMessage({ type: 'error', text: 'Correo electrónico inválido' });
      return;
    }
    
    if (formData.mensaje.length < 10) {
      setMessage({ type: 'error', text: 'El mensaje debe tener al menos 10 caracteres' });
      return;
    }
    
    if (!executeRecaptcha) {
      setMessage({ type: 'error', text: 'reCAPTCHA no está disponible' });
      return;
    }
    
    try {
      setLoading(true);
      
      // Obtener token de reCAPTCHA
      const recaptchaToken = await executeRecaptcha('contact_form');
      
      // Preparar datos para enviar
      const contactData = {
        nombres: formData.nombres,
        apellidos: formData.apellidos,
        dniOrRuc: formData.numeroDocumento,
        razonSocial: tipoDocumento === 'RUC' ? formData.razonSocial : null,
        correo: formData.correo,
        mensaje: formData.mensaje,
        recaptchaToken: recaptchaToken
      };
      
      // Enviar al backend
      const result = await submitContact(contactData);
      
      if (result.success) {
        setMessage({ type: 'success', text: '¡Mensaje enviado exitosamente! Te responderemos pronto.' });
        // Limpiar formulario
        setFormData({
          nombres: '',
          apellidos: '',
          numeroDocumento: '',
          razonSocial: '',
          correo: '',
          mensaje: ''
        });
        setTipoDocumento('DNI');
      } else {
        setMessage({ type: 'error', text: result.error });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al enviar el mensaje. Por favor, intenta nuevamente.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white min-h-screen flex items-center">
      
      <div className="container mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* --- COLUMNA IZQUIERDA --- */}
          <div className="relative w-full h-[500px] md:h-[800px] bg-gray-200 rounded-3xl overflow-hidden shadow-inner">
            <Image
              src="/contacto.jpg" 
              alt="contacto"
              fill
              className="object-cover opacity-50"
              unoptimized
            />
          </div>

          {/* --- COLUMNA DERECHA --- */}
          <div className="md:pl-8">
            <h2 className="text-6xl font-extrabold text-primary mb-4">Hablemos</h2>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
              Déjanos saber tu consulta y te brindaremos una respuesta a la brevedad.
            </p>
            
            {/* Mensajes de éxito o error */}
            {message.text && (
              <div className={`p-4 rounded-xl mb-6 ${
                message.type === 'success' 
                  ? 'bg-green-50 border border-green-200 text-green-800' 
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
                <p className="font-medium">{message.text}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* FILA 1: NOMBRES Y APELLIDOS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="nombres" className="block text-lg font-bold text-secondary mb-2 pl-1">
                    Nombres
                  </label>
                  <input 
                    type="text" 
                    id="nombres"
                    value={formData.nombres}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-gray-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                  />
                </div>
                <div>
                  <label htmlFor="apellidos" className="block text-lg font-bold text-secondary mb-2 pl-1">
                    Apellidos
                  </label>
                  <input 
                    type="text" 
                    id="apellidos"
                    value={formData.apellidos}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-gray-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                  />
                </div>
              </div>

              {/* FILA 2: TIPO DOCUMENTO + NÚMERO */}
              <div>
                <label htmlFor="numeroDocumento" className="block text-lg font-bold text-secondary mb-2 pl-1">
                  Documento de Identidad
                </label>
                <div className="flex gap-3">
                  
                  {/* Dropdown con Flecha Personalizada */}
                  <div className="relative w-1/3">
                    <select 
                      id="tipoDocumento"
                      value={tipoDocumento}
                      onChange={(e) => setTipoDocumento(e.target.value)}
                      className="w-full h-full bg-white border border-gray-200 rounded-2xl pl-4 pr-10 py-3 text-gray-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition appearance-none cursor-pointer"
                    >
                      <option value="DNI">DNI</option>
                      <option value="RUC">RUC</option>
                    </select>
                    
                    {/* Icono de flecha posicionado absolutamente */}
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500 text-xs">
                        <FaChevronDown />
                    </div>
                  </div>
                  
                  {/* Input Número */}
                  <div className="w-2/3">
                    <input 
                      type="text" 
                      id="numeroDocumento"
                      placeholder="Número"
                      value={formData.numeroDocumento}
                      onChange={handleChange}
                      required
                      className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-gray-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                    />
                  </div>
                </div>
              </div>

              {/* FILA 3: RAZÓN SOCIAL (CONDICIONAL) */}
              {/* Solo se muestra si tipoDocumento es 'RUC' */}
              {tipoDocumento === 'RUC' && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <label htmlFor="razonSocial" className="block text-lg font-bold text-secondary mb-2 pl-1">
                    Razón Social
                    </label>
                    <input 
                    type="text" 
                    id="razonSocial"
                    placeholder="Nombre de la empresa"
                    value={formData.razonSocial}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-gray-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                    />
                </div>
              )}

              {/* FILA 4: CORREO */}
              <div>
                <label htmlFor="correo" className="block text-lg font-bold text-secondary mb-2 pl-1">
                  Correo Electrónico
                </label>
                <input 
                  type="email" 
                  id="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-gray-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                />
              </div>

              {/* FILA 5: MENSAJE */}
              <div>
                <label htmlFor="mensaje" className="block text-lg font-bold text-secondary mb-2 pl-1">
                  Mensaje
                </label>
                <textarea 
                  id="mensaje"
                  rows="4"
                  placeholder="Escríbenos algo..."
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  minLength="10"
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-gray-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition resize-none"
                ></textarea>
              </div>

              {/* BOTÓN */}
              <div className="pt-2 text-right">
                <button 
                  type="submit"
                  disabled={loading}
                  className="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Enviando...' : 'Envía tu mensaje'}
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </main>
  );
}

export default function ContactoPage() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
      <ContactForm />
    </GoogleReCaptchaProvider>
  );
}