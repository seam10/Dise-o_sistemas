export interface Producto {
  id?: number;
  nombre: string;
  precio: number;
  descripcion?: string;
  stock: number;
  status?: boolean;
}
export type ProductoType = Omit<Producto, 'id'>;