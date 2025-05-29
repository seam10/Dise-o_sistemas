import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonList,
  IonToast,
  IonSelect,
  IonSelectOption,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonModal,
  useIonViewWillEnter,
  IonFooter
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Factura.css';

import ComponenteButtons from '../components/componenteButtons'; // <-- Importación agregada

interface Producto {
  nombre: string;
  precio: number;
  cantidad: number;
}

const Facturacion: React.FC = () => {
  const history = useHistory();
  const [cliente, setCliente] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [productos, setProductos] = useState<Producto[]>([]);
  const [mostrarToast, setMostrarToast] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [codigo, setCodigo] = useState('');

  useIonViewWillEnter(() => {
    const data = localStorage.getItem('carrito');
    if (data) {
      try {
        const parsed = JSON.parse(data);
        const productosCargados = parsed.map((p: any) => ({
          nombre: p.nombre,
          precio: p.precio,
          cantidad: p.stock || p.cantidad || 1
        }));
        setProductos(productosCargados);
      } catch {
        setProductos([{ nombre: '', precio: 0, cantidad: 1 }]);
      }
    }
  });

  const total = productos.reduce((sum, p) => sum + p.precio * p.cantidad, 0);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Facturación</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Datos del Cliente</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonLabel position="stacked">Nombre del Cliente</IonLabel>
              <IonInput value={cliente} onIonChange={e => setCliente(e.detail.value!)} />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Método de Pago</IonLabel>
              <IonSelect value={metodoPago} placeholder="Seleccionar" onIonChange={e => setMetodoPago(e.detail.value)}>
                <IonSelectOption value="Efectivo">Efectivo</IonSelectOption>
                <IonSelectOption value="Tarjeta">Tarjeta</IonSelectOption>
                <IonSelectOption value="Nequi">Nequi</IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Productos Seleccionados</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              {productos.map((p, i) => (
                <IonItem key={i}>
                  <IonLabel>{p.nombre} x {p.cantidad} - ${p.precio.toLocaleString()} c/u</IonLabel>
                </IonItem>
              ))}
            </IonList>
            <IonItem lines="none">
              <IonLabel><strong>Total:</strong> ${total.toLocaleString()}</IonLabel>
            </IonItem>
          </IonCardContent>
        </IonCard>
        <IonButton expand="block" color="medium" onClick={() => history.push('/producto')}>Salir</IonButton>

        <IonModal isOpen={mostrarModal} onDidDismiss={() => setMostrarModal(false)}>
          <IonContent className="ion-padding">
            <p><strong>Factura:</strong> FAC-{codigo}</p>
            <p><strong>Fecha:</strong> {new Date().toLocaleString()}</p>
            <hr />
            {productos.map((p, i) => (
              <p key={i}>{p.nombre} x{p.cantidad}: ${p.precio.toLocaleString()} c/u</p>
            ))}
            <hr />
            <p><strong>Total:</strong> ${total.toLocaleString()}</p>
            <IonButton expand="block" onClick={() => setMostrarModal(false)}>Aceptar</IonButton>
          </IonContent>
        </IonModal>

        <IonToast
          isOpen={mostrarToast}
          onDidDismiss={() => setMostrarToast(false)}
          message="Factura generada exitosamente"
          duration={2000}
          color="success"
        />
      </IonContent>

      {/* Botones fijos abajo */}
      <IonFooter>
        <ComponenteButtons />
      </IonFooter>
    </IonPage>
  );
};

export default Facturacion;
