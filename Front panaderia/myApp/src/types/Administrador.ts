export interface Administrador {
  id?: number;
  correo: string;
  contrasena: string;
  status?: boolean;
}
export type AdministradorType = Omit<Administrador, 'id'>;