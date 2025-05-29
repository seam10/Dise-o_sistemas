export interface Factura {
  id?: number;
  fechaEmision: string;
  total: number;
  administrador: { id: number };
  status?: boolean;
}
export type FacturaType = Omit<Factura, 'id'>;