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
import { useHistory } from 'react-router-dom';

interface ProductoCarrito {
  nombre: string;
  precio: number;
  cantidad: number;
  subtotal: number;
  id?: number;
}

const CarritoPage: React.FC = () => {
  const history = useHistory();

  const [carrito, setCarrito] = useState<ProductoCarrito[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detalleHTML, setDetalleHTML] = useState('');

  // Carga carrito desde localStorage
  const loadCarrito = () => {
    setIsLoading(true);
    const data = localStorage.getItem('carrito');
    if (data) {
      try {
        const parsed = JSON.parse(data);
        // calcular subtotal
        const productos = parsed.map((p: any) => ({
          ...p,
          subtotal: p.precio * p.cantidad
        }));
        setCarrito(productos);
      } catch {
        setCarrito([]);
      }
    } else {
      setCarrito([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadCarrito();
  }, []);

  // Eliminar producto del carrito (localStorage)
  const handleRemoveItem = (index: number) => {
    const data = localStorage.getItem('carrito');
    if (!data) return;
    try {
      const parsed = JSON.parse(data);
      parsed.splice(index, 1);
      localStorage.setItem('carrito', JSON.stringify(parsed));
      loadCarrito();
    } catch (error) {
      console.error('Error eliminando item:', error);
    }
  };

  // Calcular total
  const total = carrito.reduce((sum, item) => sum + item.subtotal, 0);

  // Generar factura simulada y mostrar modal
  const handleGenerateFactura = () => {
    if (carrito.length === 0) return;

    const detalleLines = [
      `<p><strong>Factura generada correctamente.</strong></p>`,
      `<p><strong>Fecha:</strong> ${new Date().toLocaleString()}</p>`,
      '<hr />',
      ...carrito.map(it => `<p>${it.nombre} x${it.cantidad}: $${it.subtotal.toLocaleString()} COP</p>`),
      '<hr />',
      `<p><strong>Total:</strong> $${total.toLocaleString()} COP</p>`
    ];
    setDetalleHTML(detalleLines.join(''));
    setIsModalOpen(true);

    // Limpiar carrito tras facturar
    localStorage.removeItem('carrito');
    loadCarrito();

    // Redirigir a facturación para mostrar detalles (opcional)
    history.push('/facturacion');
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
            {carrito.map((item, index) => (
              <IonItem key={index} className="carrito-item">
                <IonLabel>
                  <h2>{item.nombre}</h2>
                  <p>Cantidad: {item.cantidad}</p>
                </IonLabel>
                <IonNote slot="end">${item.subtotal.toFixed(2)}</IonNote>
                <IonButton
                  fill="clear"
                  color="danger"
                  onClick={() => handleRemoveItem(index)}
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

      <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
        <IonCard className="ion-padding">
          <IonCardHeader>
            <IonCardTitle>Factura generada</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div dangerouslySetInnerHTML={{ __html: detalleHTML }} />
            <IonButton expand="block" color="success" onClick={() => setIsModalOpen(false)}>
              Aceptar
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonModal>
    </IonPage>
  );
};

export default CarritoPage;
