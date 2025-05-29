import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Carrito.css';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonButton,
  IonFooter,
  IonText,
  IonModal,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/react';
import { Carrito } from '../types/Carrito';
import { Factura } from '../types/Factura';
import ComponenteButtons from '../components/componenteButtons';  // Importación del componente de botones

const CarritoPage: React.FC = () => {
  const [carrito, setCarrito] = useState<Carrito[]>([]);  // Lista de items en el carrito
  const [isLoading, setIsLoading] = useState(false);  // Estado de carga
  const [isModalOpen, setIsModalOpen] = useState(false);  // Modal de factura
  const [detalleHTML, setDetalleHTML] = useState('');  // Detalles de la factura

  // Cargar carrito al inicio
  const loadCarrito = async () => {
    setIsLoading(true);
    try {
      const resp = await axios.get<Carrito[]>('/api/carrito');
      setCarrito(resp.data ?? []);  // Asignamos un arreglo vacío si no es un arreglo
    } catch (error) {
      console.error('Error cargando carrito:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCarrito();  // Cargar carrito al iniciar el componente
  }, []);

  // Eliminar un ítem del carrito
  const handleRemoveItem = async (id: number) => {
    try {
      await axios.delete(`/api/carrito/${id}`);
      await loadCarrito();
    } catch (error) {
      console.error('Error eliminando item:', error);
    }
  };

  // Cálculo del total
  const total = carrito.reduce((sum, item) => sum + item.subtotal, 0);

  // Generar factura
  const handleGenerateFactura = async () => {
    const payload: Factura = {
      fechaEmision: new Date().toISOString(),
      total,
      administrador: { id: 1 },  // Ajusta según tu lógica de autenticación
      status: true
    };

    try {
      // Crear la factura en el backend
      await axios.post<Factura>('/api/facturas', payload);

      // Preparar detalle para el modal
      const detalleLines = [
        `<p><strong>Factura generada correctamente.</strong></p>`,
        `<p><strong>Fecha:</strong> ${payload.fechaEmision}</p>`,
        '<hr />',
        ...carrito.map(it => `<p>${it.producto.nombre} x${it.cantidad}: $${it.subtotal.toLocaleString()} COP</p>`),
        '<hr />',
        `<p><strong>Total:</strong> $${total.toLocaleString()} COP</p>`
      ];
      setDetalleHTML(detalleLines.join(''));
      setIsModalOpen(true);

      // Vaciar carrito en el backend
      await axios.delete('/api/carrito');
      await loadCarrito();
    } catch (error) {
      console.error('Error generando factura:', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Carrito de Compras</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {isLoading ? (
          <IonText>Cargando...</IonText>
        ) : carrito.length === 0 ? (
          <IonText className="ion-text-center">
            <h2>Tu carrito está vacío.</h2>
          </IonText>
        ) : (
          <IonList>
            {carrito.map(item => (
              <IonItem key={item.id} className="carrito-item">
                <IonLabel>
                  <h2>{item.producto.nombre}</h2>
                  <p>Cantidad: {item.cantidad}</p>
                </IonLabel>
                <IonNote slot="end">
                  $ {item.subtotal.toFixed(2)}
                </IonNote>
                <IonButton
                  fill="clear"
                  color="danger"
                  onClick={() => item.id !== undefined && handleRemoveItem(item.id)}
                >
                  Eliminar
                </IonButton>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>

      <IonFooter>
        <IonToolbar>
          {carrito.length > 0 && (
            <IonText className="ion-padding-start">
              <h3>Total: $ {total.toFixed(2)}</h3>
            </IonText>
          )}
          <IonButton
            expand="block"
            color="primary"
            disabled={carrito.length === 0}
            onClick={handleGenerateFactura}
          >
            GENERAR FACTURA
          </IonButton>
        </IonToolbar>
      </IonFooter>

      <IonModal
        isOpen={isModalOpen}
        onDidDismiss={() => setIsModalOpen(false)}
      >
        <IonCard className="ion-padding">
          <IonCardHeader>
            <IonCardTitle>Factura generada</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div dangerouslySetInnerHTML={{ __html: detalleHTML }} />
            <IonButton
              expand="block"
              color="success"
              onClick={() => setIsModalOpen(false)}
            >
              Aceptar
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonModal>

      {/* Colocamos el componente de botones después del modal */}
      <ComponenteButtons />
    </IonPage>
  );
};

export default CarritoPage;
