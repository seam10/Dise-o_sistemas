export interface ReporteVenta {
  id?: number;
  factura: { id: number };
  fechaReporte: string;
  montoTotal: number;
  cantidadProductos: number;
  administrador?: { id: number };
  status?: boolean;
}
export type ReporteVentaType = Omit<ReporteVenta, 'id'>;