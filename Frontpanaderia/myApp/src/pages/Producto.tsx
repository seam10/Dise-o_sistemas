// src/pages/Productos.tsx

import './Producto.css';
import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonInput,
  IonButton,
  IonFooter,
  IonBadge,
  IonModal,
  IonList,
  IonItem,
  IonLabel,
  IonAlert,
  IonToast
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';

import type { Producto as ApiProducto } from '../types/Producto';
type Producto = ApiProducto;

interface ItemCarrito {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
}

const Productos: React.FC = () => {
  const history = useHistory();

  const [productos, setProductos] = useState<Producto[]>([]);
  const [cantidades, setCantidades] = useState<Record<number, number>>({});
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [alertOpts, setAlertOpts] = useState<{ isOpen: boolean; producto?: Producto }>({ isOpen: false });
  const [toastOpts, setToastOpts] = useState<{
    isOpen: boolean;
    message: string;
    color: 'success' | 'danger';
  }>({ isOpen: false, message: '', color: 'success' });
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Función para cargar productos desde backend
  const cargarProductos = async () => {
    setErrorMsg('');
    try {
      const arr = await api.getProductos();
      const productosValidos = arr.filter((p): p is Producto => typeof p.id === 'number');
      setProductos(productosValidos);

      const initCant = productosValidos.reduce((acc, p) => {
        if (typeof p.id === 'number') {
          acc[p.id] = 1;
        }
        return acc;
      }, {} as Record<number, number>);
      setCantidades(initCant);
    } catch (error: any) {
      setErrorMsg(error?.message || 'Error desconocido');
    }
  };

  // Carga productos al montar y cada vez que se emite el evento 'inventario-actualizado'
  useEffect(() => {
    cargarProductos();

    const handleInventarioUpdate = () => {
      cargarProductos();
    };

    window.addEventListener('inventario-actualizado', handleInventarioUpdate);
    return () => {
      window.removeEventListener('inventario-actualizado', handleInventarioUpdate);
    };
  }, []);

  const handleCantidadChange = (id: number, value: string) => {
    const qty = Math.max(1, parseInt(value, 10) || 1);
    setCantidades(prev => ({ ...prev, [id]: qty }));
  };

  const confirmAdd = (producto: Producto) => setAlertOpts({ isOpen: true, producto });

  const onAlertDismiss = (confirmed: boolean) => {
    const prod = alertOpts.producto!;
    setAlertOpts({ isOpen: false });
    if (!confirmed) return;

    const qty = prod.id !== undefined ? (cantidades[prod.id] || 1) : 1;
    setCarrito(prev => {
      const existe = prev.find(i => i.id === prod.id);
      if (existe) {
        return prev.map(i =>
          i.id === prod.id ? { ...i, stock: i.stock + Number(qty) } : i
        );
      }
      return [
        ...prev,
        {
          id: prod.id as number,
          nombre: prod.nombre,
          precio: prod.precio,
          stock: Number(qty)
        }
      ];
    });

    setToastOpts({ isOpen: true, message: 'Producto agregado al carrito', color: 'success' });
    if (typeof prod.id === 'number') {
      setCantidades(prev => ({ ...prev, [prod.id as number]: 1 }));
    }
  };

  const removeFromCart = (id: number) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
  };

  const irAFacturacion = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    history.push('/facturacion');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary" style={{ backgroundColor: '#ff9800' }}>
          <IonTitle style={{ fontSize: 26, fontWeight: 'bold', textAlign: 'center', color: '#000' }}>
            🥖 Bienvenidos a Panadería GAMSH
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" style={{ backgroundColor: '#fcfcfc' }}>
        <IonGrid>
          <IonRow>
            {productos.map(prod => (
              <IonCol key={prod.id} size="12" sizeMd="6" sizeLg="4">
                <IonCard className="producto-card">
                  <IonCardHeader>
                    <IonCardTitle className="producto-nombre">{prod.nombre}</IonCardTitle>
                    <IonCardSubtitle className="producto-descripcion">{prod.descripcion}</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <IonInput
                        type="number"
                        min={1}
                        value={prod.id !== undefined ? cantidades[prod.id] || 1 : 1}
                        onIonChange={e => prod.id !== undefined && handleCantidadChange(prod.id, e.detail.value!)}
                        className="producto-cantidad"
                      />
                      <IonButton
                        fill="solid"
                        color="warning"
                        className="btn-agregar"
                        onClick={() => confirmAdd(prod)}
                      >
                        🛒
                      </IonButton>
                    </div>
                    <IonButton
                      expand="block"
                      fill="outline"
                      color="warning"
                      onClick={() => confirmAdd(prod)}
                    >
                      Agregar al carrito
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>

      <IonFooter>
        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonCol size="6" sizeMd="4" sizeLg="2">
                <IonButton expand="block" routerLink="/inventario">
                  Inventario
                </IonButton>
              </IonCol>
              <IonCol size="6" sizeMd="4" sizeLg="2">
                <IonButton expand="block" routerLink="/reporte_venta">
                  Reportes
                </IonButton>
              </IonCol>
              <IonCol size="6" sizeMd="4" sizeLg="2">
                <IonButton expand="block" onClick={() => setShowCart(true)}>
                  🛒 Carrito <IonBadge>{carrito.length}</IonBadge>
                </IonButton>
              </IonCol>
              <IonCol size="6" sizeMd="4" sizeLg="2">
                <IonButton expand="block" routerLink="/factura" color="success">
                  📄 Factura
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonFooter>

      <IonAlert
        isOpen={alertOpts.isOpen}
        header="Confirmar"
        message={`¿Agregar ${cantidades[alertOpts.producto?.id || 0] || 1} unidades de ${
          alertOpts.producto?.nombre || ''
        }?`}
        buttons={[
          { text: 'Cancelar', role: 'cancel', handler: () => onAlertDismiss(false) },
          { text: 'Sí, agregar', handler: () => onAlertDismiss(true) }
        ]}
      />

      <IonToast
        isOpen={toastOpts.isOpen}
        message={toastOpts.message}
        color={toastOpts.color}
        duration={1500}
        onDidDismiss={() => setToastOpts(prev => ({ ...prev, isOpen: false }))}
      />
      <IonToast
        isOpen={!!errorMsg}
        message={`Error al cargar productos: ${errorMsg}`}
        color="danger"
        duration={2000}
        onDidDismiss={() => setErrorMsg('')}
      />

      <IonModal isOpen={showCart} onDidDismiss={() => setShowCart(false)}>
        <IonContent className="ion-padding">
          {carrito.length === 0 ? (
            <p>Tu carrito está vacío.</p>
          ) : (
            <IonList>
              {carrito.map(item => (
                <IonItem key={item.id}>
                  <IonLabel>
                    {item.nombre} x {item.stock} = ${item.precio * item.stock} COP
                  </IonLabel>
                  <IonButton fill="clear" color="danger" onClick={() => removeFromCart(item.id)}>
                    Eliminar
                  </IonButton>
                </IonItem>
              ))}
            </IonList>
          )}
        </IonContent>
        <IonFooter className="ion-padding">
          <IonButton expand="block" onClick={irAFacturacion} disabled={carrito.length === 0}>
            Ir a Facturación
          </IonButton>
        </IonFooter>
      </IonModal>
    </IonPage>
  );
};

export default Productos;
