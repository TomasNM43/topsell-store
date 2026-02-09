import axios from 'axios';

// URL de tu Backend Spring Boot (desde variable de entorno)
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export const getBanners = async () => {
    try {
        const response = await axios.get(`${API_URL}/banners`);
        return response.data;
    } catch (error) {
        console.error("Error fetching banners:", error);
        return [];
    }
};

export const getCategories = async () => {
    try {
        const response = await axios.get(`${API_URL}/categories`);
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};

export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/products`);
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

export const getBrands = async () => {
    try {
        const response = await axios.get(`${API_URL}/brands`);
        return response.data;
    } catch (error) {
        console.error("Error fetching brands:", error);
        return [];
    }
};

export const getProductsByCategory = async (slug) => {
    try {
        console.log(`Fetching products for category slug: ${slug}`);
        const response = await axios.get(`${API_URL}/products/category/${slug}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching products for category ${slug}:`, error);
        return [];
    }
};

export const getProductBySlug = async (slug) => {
    try {
        // Llama al endpoint de Java: ProductController.getProductBySlug
        const response = await axios.get(`${API_URL}/products/${slug}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product details for slug ${slug}:`, error);
        return null;
    }
};

export const searchProducts = async (query) => {
  try {
    // Retorna array de productos
    const response = await axios.get(`${API_URL}/products/search?query=${query}`);
    return response.data;
  } catch (error) {
    console.error("Error buscando:", error);
    return [];
  }
};

export const submitContact = async (contactData) => {
  try {
    const response = await axios.post(`${API_URL}/contact`, contactData);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al enviar formulario de contacto:", error);
    const errorMessage = error.response?.data?.error || 'Error al enviar el mensaje. Por favor, intenta nuevamente.';
    return { success: false, error: errorMessage };
  }
};