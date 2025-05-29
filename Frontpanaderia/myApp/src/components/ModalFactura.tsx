import {
  IonModal,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton
} from '@ionic/react';

interface Producto {
  nombre: string;
  cantidad: number;
  precio: number;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  facturaId: string;
  fecha: string;
  productos: Producto[];
  total: number;
}

const ModalFactura: React.FC<Props> = ({
  isOpen,
  onClose,
  facturaId,
  fecha,
  productos,
  total
}) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonCard className="ion-padding">
        <IonCardHeader>
          <IonCardTitle>Factura generada</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <p><strong>Factura:</strong> {facturaId}</p>
          <p><strong>Fecha:</strong> {fecha}</p>
          <hr />
          {productos.map((p, index) => (
            <p key={index}>
              {p.nombre} x{p.cantidad}: ${p.precio.toLocaleString()} COP
            </p>
          ))}
          <hr />
          <p><strong>Total:</strong> ${total.toLocaleString()} COP</p>

          <IonButton expand="block" color="success" onClick={onClose}>
            Aceptar
          </IonButton>
        </IonCardContent>
      </IonCard>
    </IonModal>
  );
};

export default ModalFactura;
