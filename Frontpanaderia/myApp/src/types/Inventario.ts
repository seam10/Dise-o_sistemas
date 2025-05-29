export interface Inventario {
  id?: number;
  producto: { id: number };
  stockMinimo: number;
  status?: boolean;
}
export type InventarioType = Omit<Inventario, 'id'>;