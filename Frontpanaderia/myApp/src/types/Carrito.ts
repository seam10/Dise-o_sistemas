export interface Carrito {
  id?: number;
  producto: {
    nombre: any; id: number
};
  factura?: { id: number };
  cantidad: number;
  subtotal: number;
  status?: boolean;
}
export type CarritoType = Omit<Carrito, 'id'>;