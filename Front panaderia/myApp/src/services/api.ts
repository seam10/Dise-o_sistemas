import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Producto } from '../types/Producto';
import { Carrito } from '../types/Carrito';
import { Factura } from '../types/Factura';
import { Inventario } from '../types/Inventario';
import { ReporteVenta } from '../types/Reporte_venta';
import { Administrador } from '../types/Administrador';

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:9000/api',  // La URL base de la API
      headers: { 'Content-Type': 'application/json' },
    });
  }
  // -------------------- Administrador --------------------
  loginAdministrador(correo: string, contrasena: string): Promise<Administrador> {
    return this.axiosInstance
      .post('/login', { correo, contrasena })  // Asegúrate que la ruta esté correcta
      .then((resp: AxiosResponse<Administrador>) => resp.data);  // Retorna los datos del administrador correctamente tipados
  }

  // -------------------- Producto --------------------
  getProductos(): Promise<Producto[]> {
    return this.axiosInstance
      .get('/productos')
      .then((resp: AxiosResponse<{ status: boolean; data: Producto[] }>) => resp.data.data)
      .catch((error) => {
        console.error('Error al obtener productos:', error);
        throw error;
      });
  }

  getProductoById(id: number): Promise<Producto> {
    return this.axiosInstance
      .get(`/productos/${id}`)
      .then((resp: AxiosResponse<{ status: boolean; data: Producto }>) => resp.data.data)
      .catch((error) => {
        console.error('Error al obtener producto por id:', error);
        throw error;
      });
  }

  crearProducto(data: Producto): Promise<Producto> {
    return this.axiosInstance
      .post('/productos', data)
      .then((resp: AxiosResponse<{ status: boolean; data: Producto }>) => resp.data.data)
      .catch((error) => {
        console.error('Error al crear producto:', error);
        throw error;
      });
  }

  updateProducto(id: number, data: Producto): Promise<Producto> {
    return this.axiosInstance
      .put(`/productos/${id}`, data)
      .then((resp: AxiosResponse<{ status: boolean; data: Producto }>) => resp.data.data)
      .catch((error) => {
        console.error('Error al actualizar producto:', error);
        throw error;
      });
  }

  deleteProducto(id: number): Promise<void> {
    return this.axiosInstance
      .delete(`/productos/${id}`)
      .then(() => {})
      .catch((error) => {
        console.error('Error al eliminar producto:', error);
        throw error;
      });
  }

  // -------------------- Inventario --------------------
  getInventarios(): Promise<Inventario[]> {
    return this.axiosInstance
      .get('/inventario')
      .then((resp: AxiosResponse<{ status: boolean; data: Inventario[] }>) => resp.data.data)
      .catch((error) => {
        console.error('Error al obtener inventarios:', error);
        throw error;
      });
  }

  getInventarioById(id: number): Promise<Inventario> {
    return this.axiosInstance
      .get(`/inventario/${id}`)
      .then((resp: AxiosResponse<{ status: boolean; data: Inventario }>) => resp.data.data)
      .catch((error) => {
        console.error('Error al obtener inventario por id:', error);
        throw error;
      });
  }

  crearInventario(data: Inventario): Promise<Inventario> {
    return this.axiosInstance
      .post('/inventario', data)
      .then((resp: AxiosResponse<{ status: boolean; data: Inventario }>) => resp.data.data)
      .catch((error) => {
        console.error('Error al crear inventario:', error);
        throw error;
      });
  }

  actualizarInventario(id: number, data: Inventario): Promise<Inventario> {
    return this.axiosInstance
      .put(`/inventario/${id}`, data)
      .then((resp: AxiosResponse<{ status: boolean; data: Inventario }>) => resp.data.data)
      .catch((error) => {
        console.error('Error al actualizar inventario:', error);
        throw error;
      });
  }

  eliminarInventario(id: number): Promise<void> {
    return this.axiosInstance
      .delete(`/inventario/${id}`)
      .then(() => {})
      .catch((error) => {
        console.error('Error al eliminar inventario:', error);
        throw error;
      });
  }

  // -------------------- Carrito --------------------
  getCarrito(): Promise<Carrito[]> {
    return this.axiosInstance
      .get('/carrito')
      .then((resp: AxiosResponse<{ status: boolean; data: Carrito[] }>) => resp.data.data)
      .catch((error) => {
        console.error('Error al obtener carrito:', error);
        throw error;
      });
  }

  getCarritoById(id: number): Promise<Carrito> {
    return this.axiosInstance
      .get(`/carrito/${id}`)
      .then((resp: AxiosResponse<{ status: boolean; data: Carrito }>) => resp.data.data)
      .catch((error) => {
        console.error('Error al obtener carrito por id:', error);
        throw error;
      });
  }

  addCarritoItem(item: Carrito): Promise<Carrito> {
    return this.axiosInstance
      .post('/carrito', item)
      .then((resp: AxiosResponse<{ status: boolean; data: Carrito }>) => resp.data.data)
      .catch((error) => {
        console.error('Error al agregar item al carrito:', error);
        throw error;
      });
  }

  updateCarritoItem(id: number, item: Partial<Carrito>): Promise<Carrito> {
    return this.axiosInstance
      .put(`/carrito/${id}`, item)
      .then((resp: AxiosResponse<{ status: boolean; data: Carrito }>) => resp.data.data)
      .catch((error) => {
        console.error('Error al actualizar item del carrito:', error);
        throw error;
      });
  }

  removeCarritoItem(id: number): Promise<void> {
    return this.axiosInstance
      .delete(`/carrito/${id}`)
      .then(() => {})
      .catch((error) => {
        console.error('Error al eliminar item del carrito:', error);
        throw error;
      });
  }

  clearCarrito(): Promise<void> {
    return this.axiosInstance
      .delete('/carrito')
      .then(() => {})
      .catch((error) => {
        console.error('Error al vaciar carrito:', error);
        throw error;
      });
  }

  // -------------------- Factura --------------------
  getFacturas(): Promise<Factura[]> {
    return this.axiosInstance
      .get('/facturas')
      .then((resp: AxiosResponse<{ status: boolean; data: Factura[] }>) => resp.data.data)
      .catch((error) => {
        console.error('Error al obtener facturas:', error);
        throw error;
      });
  }

  getFacturaById(id: number): Promise<Factura> {
    return this.axiosInstance
      .get(`/facturas/${id}`)
      .then((resp: AxiosResponse<{ status: boolean; data: Factura }>) => resp.data.data)
      .catch((error) => {
        console.error('Error al obtener factura por id:', error);
        throw error;
      });
  }

  crearFactura(data: Factura): Promise<Factura> {
    return this.axiosInstance
      .post('/facturas', data)
      .then((resp: AxiosResponse<{ status: boolean; data: Factura }>) => resp.data.data)
      .catch((error) => {
        console.error('Error al crear factura:', error);
        throw error;
      });
  }

  updateFactura(id: number, data: Factura): Promise<Factura> {
    return this.axiosInstance
      .put(`/facturas/${id}`, data)
      .then((resp: AxiosResponse<{ status: boolean; data: Factura }>) => resp.data.data)
      .catch((error) => {
        console.error('Error al actualizar factura:', error);
        throw error;
      });
  }

  deleteFactura(id: number): Promise<void> {
    return this.axiosInstance
      .delete(`/facturas/${id}`)
      .then(() => {})
      .catch((error) => {
        console.error('Error al eliminar factura:', error);
        throw error;
      });
  }

  // -------------------- Reporte de Ventas --------------------
  getReportesVenta(): Promise<ReporteVenta[]> {
    return this.axiosInstance
      .get('/reporte_venta')
      .then((resp: AxiosResponse<{ status: boolean; data: ReporteVenta[] }>) => resp.data.data)
      .catch((error) => {
        console.error('Error al obtener reportes de ventas:', error);
        throw error;
      });
  }
}

export default new ApiService();
