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
  IonCardContent,
  IonInput,
  IonButton,
  IonFooter,
  IonSpinner
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';  // Correct import for api.ts
import ComponenteButtons from '../components/componenteButtons'; // ✅ Importación correcta

import type { Producto as ApiProducto } from '../types/Producto';
type Producto = ApiProducto;

const Productos: React.FC = () => {
  const history = useHistory();

  const [productos, setProductos] = useState<Producto[]>([]); // Productos cargados
  const [cantidades, setCantidades] = useState<Record<number, number>>({}); // Cantidades iniciales
  const [loading, setLoading] = useState(false);  // Estado de carga

  // Cargar productos desde el backend
  const cargarProductos = async () => {
    setLoading(true); // Activar el loading
    try {
      const resp = await api.getProductos(); // Llamar a la API para obtener los productos
      const productosValidos = resp.filter((p): p is Producto => p.id != null); // Filtrar productos válidos
      setProductos(productosValidos);  // Establecer productos

      // Establecer la cantidad inicial para cada producto
      const initCant = productosValidos.reduce((acc, p) => {
        if (p.id) {
          acc[p.id] = 1; // Establecer la cantidad inicial como 1
        }
        return acc;
      }, {} as Record<number, number>);
      setCantidades(initCant);  // Establecer cantidades iniciales
    } catch (error: any) {
      console.error('Error al cargar productos:', error);
    } finally {
      setLoading(false);  // Desactivar el loading
    }
  };

  useEffect(() => {
    cargarProductos();  // Cargar productos al iniciar el componente
  }, []);

  // Cambiar la cantidad de un producto
  const handleCantidadChange = (id: number, value: string) => {
    const qty = Math.max(1, parseInt(value, 10) || 1); // Asegurarse que la cantidad sea positiva
    setCantidades(prev => ({ ...prev, [id]: qty }));
  };

  // Confirmar agregar al carrito
  const confirmAdd = (producto: Producto) => {
    const qty = cantidades[producto.id!] || 1;
    // Lógica para agregar al carrito
    console.log('Producto agregado al carrito:', producto);
    // Aquí puedes agregar el producto al carrito
  };

  // Eliminar productos del carrito
  const removeFromCart = (id: number) => {
    // Lógica para eliminar del carrito
    console.log('Producto eliminado del carrito:', id);
  };

  const irAFacturacion = () => {
    localStorage.setItem('carrito', JSON.stringify([])); // Limpiar carrito
    history.push('/facturacion'); // Redirigir a la página de facturación
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
        {loading ? (
          <IonSpinner name="crescent" />
        ) : (
          <IonGrid>
            <IonRow>
              {productos.map(prod => (
                <IonCol key={prod.id} size="12" sizeMd="6" sizeLg="4">
                  <IonCard className="producto-card">
                    <IonCardHeader>
                      <IonCardTitle className="producto-nombre">
                        Producto ID: {prod.id} {/* Aquí solo mostramos el ID */}
                      </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonInput
                        type="number"
                        min={1}
                        value={cantidades[prod.id!] || 1}
                        onIonChange={e => handleCantidadChange(prod.id!, e.detail.value!)}
                        className="producto-cantidad"
                      />
                      <IonButton
                        fill="solid"
                        color="warning"
                        className="btn-agregar"
                        onClick={() => confirmAdd(prod)}
                      >
                        🛒 Agregar al carrito
                      </IonButton>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        )}
      </IonContent>

      <IonFooter>
        <ComponenteButtons />
      </IonFooter>
    </IonPage>
  );
};

export default Productos;
