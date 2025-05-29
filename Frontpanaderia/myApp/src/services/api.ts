import axios, { AxiosInstance } from 'axios';
import { Producto } from '../types/Producto';
import { Carrito } from '../types/Carrito';
import { Factura } from '../types/Factura';
import { Inventario } from '../types/Inventario';
import { Administrador } from '../types/Administrador';
import ReporteVenta from '../pages/Reporte_venta';

class ApiService {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: 'http://localhost:9000/api',
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // ---- Producto ----
  getProductos(): Promise<Producto[]> {
    return this.axios
      .get<{ status: boolean; data: Producto[]; message: string }>('/productos')
      .then(resp => resp.data.data);
  }

  getProductoById(id: number): Promise<Producto> {
    return this.axios
      .get<{ status: boolean; data: Producto; message: string }>(`/productos/${id}`)
      .then(resp => resp.data.data);
  }

  createProducto(p: Producto): Promise<Producto> {
    return this.axios
      .post<{ status: boolean; data: Producto; message: string }>('/productos', p)
      .then(resp => resp.data.data);
  }

  updateProducto(id: number, p: Producto): Promise<Producto> {
    return this.axios
      .put<{ status: boolean; data: Producto; message: string }>(`/productos/${id}`, p)
      .then(resp => resp.data.data);
  }

  deleteProducto(id: number): Promise<void> {
    return this.axios
      .delete<{ status: boolean; message: string }>(`/productos/${id}`)
      .then(() => {});
  }

  // ---- Carrito ----
  getCarrito(): Promise<Carrito[]> {
    return this.axios
      .get<{ status: boolean; data: Carrito[]; message: string }>('/carrito')
      .then(resp => resp.data.data);
  }

  getCarritoById(id: number): Promise<Carrito> {
    return this.axios
      .get<{ status: boolean; data: Carrito; message: string }>(`/carrito/${id}`)
      .then(resp => resp.data.data);
  }

  addCarritoItem(item: Carrito): Promise<Carrito> {
    return this.axios
      .post<{ status: boolean; data: Carrito; message: string }>('/carrito', item)
      .then(resp => resp.data.data);
  }

  updateCarritoItem(id: number, item: Partial<Carrito>): Promise<Carrito> {
    return this.axios
      .put<{ status: boolean; data: Carrito; message: string }>(`/carrito/${id}`, item)
      .then(resp => resp.data.data);
  }

  removeCarritoItem(id: number): Promise<void> {
    return this.axios
      .delete<{ status: boolean; message: string }>(`/carrito/${id}`)
      .then(() => {});
  }

  clearCarrito(): Promise<void> {
    return this.axios
      .delete<{ status: boolean; message: string }>('/carrito')
      .then(() => {});
  }

  // ---- Factura ----
  getFacturas(): Promise<Factura[]> {
    return this.axios
      .get<{ status: boolean; data: Factura[]; message: string }>('/facturas')
      .then(resp => resp.data.data);
  }

  getFacturaById(id: number): Promise<Factura> {
    return this.axios
      .get<{ status: boolean; data: Factura; message: string }>(`/facturas/${id}`)
      .then(resp => resp.data.data);
  }

  crearFactura(f: Factura): Promise<Factura> {
    return this.axios
      .post<{ status: boolean; data: Factura; message: string }>('/facturas', f)
      .then(resp => resp.data.data);
  }

  updateFactura(id: number, f: Factura): Promise<Factura> {
    return this.axios
      .put<{ status: boolean; data: Factura; message: string }>(`/facturas/${id}`, f)
      .then(resp => resp.data.data);
  }

  deleteFactura(id: number): Promise<void> {
    return this.axios
      .delete<{ status: boolean; message: string }>(`/facturas/${id}`)
      .then(() => {});
  }

  // ---- Inventario ----
  getInventarios(): Promise<Inventario[]> {
    return this.axios
      .get<{ status: boolean; data: Inventario[]; message: string }>('/inventario')
      .then(resp => resp.data.data);
  }

  getInventarioById(id: number): Promise<Inventario> {
    return this.axios
      .get<{ status: boolean; data: Inventario; message: string }>(`/inventario/${id}`)
      .then(resp => resp.data.data);
  }

  createInventario(inv: Inventario): Promise<Inventario> {
    return this.axios
      .post<{ status: boolean; data: Inventario; message: string }>('/inventario', inv)
      .then(resp => resp.data.data);
  }

  updateInventario(id: number, inv: Inventario): Promise<Inventario> {
    return this.axios
      .put<{ status: boolean; data: Inventario; message: string }>(`/inventario/${id}`, inv)
      .then(resp => resp.data.data);
  }

  deleteInventario(id: number): Promise<void> {
    return this.axios
      .delete<{ status: boolean; message: string }>(`/inventario/${id}`)
      .then(() => {});
  }

  // ---- Reporte de Ventas ----
  getReportesVenta(): Promise<ReporteVenta[]> {
    return this.axios
      .get<{ status: boolean; data: ReporteVenta[]; message: string }>('/reporte_venta')
      .then(resp => resp.data.data);
  }

  // ---- Administrador ----
  loginAdministrador(correo: string, contrasena: string): Promise<Administrador> {
    return this.axios
      .post<{ status: boolean; data: Administrador; message: string }>(
        '/Administrador/login',
        { correo, contrasena }
      )
      .then(resp => resp.data.data);
  }

  getAdministradores(): Promise<Administrador[]> {
    return this.axios
      .get<{ status: boolean; data: Administrador[]; message: string }>('/Administrador')
      .then(resp => resp.data.data);
  }
}

const api = new ApiService();
export default api;
