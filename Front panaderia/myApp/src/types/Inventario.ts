import { Producto } from "./Producto";

export interface Inventario {
  id?: number;
  producto: Producto;
  nombre: string;
  stockMinimo: number;
  cantidad: number;
  precio: number;
  status?: boolean;
}