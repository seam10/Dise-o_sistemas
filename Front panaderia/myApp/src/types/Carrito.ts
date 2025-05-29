export interface Carrito {
  id?: number;  // ID del carrito
  inventario: {
     id?: number;
     nombre: string;
    stockMinimo: number;
    cantidad: number;
    precio: number;
    status?: boolean;  // Precio del producto desde el inventario
  };
  factura?: {
    id: number;  // Relación con la factura si aplica
  };
  cantidad: number;  // Cantidad del producto en el carrito
  subtotal: number;  // Total por la cantidad del producto
  status?: boolean;  // Estado del carrito, si está activo o no
}
