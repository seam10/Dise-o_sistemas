import './Inventario.css';
import React, { useEffect, useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList,
  IonLabel, IonInput, IonButton, IonSpinner, IonToast, IonAlert,
  IonIcon, IonCard, IonCardContent, IonGrid, IonCardHeader, IonCardSubtitle,
  IonCardTitle, IonCol, IonRow, IonModal
} from '@ionic/react';
import { addCircleOutline, trashOutline, createOutline } from 'ionicons/icons';
import api from '../services/api';

interface Producto {
  id: number;
  nombre: string;
  descripcion?: string;
  precio?: number;
}

interface InventarioItem {
  id: number;
  producto: Producto;
  stockMinimo: number;
}

const Inventario: React.FC = () => {
  const [items, setItems] = useState<InventarioItem[]>([]);
  const [stockMinimos, setStockMinimos] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ isOpen: false, message: '', color: 'success' as 'success' | 'danger' });
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const [productoEditando, setProductoEditando] = useState<Producto>({ id: 0, nombre: '', descripcion: '', precio: 0 });
  const [showEditModal, setShowEditModal] = useState(false);

  const cargarInventarios = async () => {
    setLoading(true);
    try {
      const data = await api.getInventarios();
      setItems(data);
      const stocks: Record<number, number> = {};
      data.forEach(item => {
        stocks[item.id] = item.stockMinimo;
      });
      setStockMinimos(stocks);
    } catch {
      setToast({ isOpen: true, message: 'Error cargando inventarios', color: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarInventarios();
  }, []);

  const handleStockChange = (id: number, value: string) => {
    const val = Math.max(0, parseInt(value) || 0);
    setStockMinimos(prev => ({ ...prev, [id]: val }));
  };

  const guardarStockMinimo = async (item: InventarioItem) => {
    const nuevoStock = stockMinimos[item.id];
    try {
      await api.updateInventario(item.id, {
        producto: { id: item.producto.id },
        stockMinimo: nuevoStock,
      });
      setItems(prev =>
        prev.map(i => (i.id === item.id ? { ...i, stockMinimo: nuevoStock } : i))
      );
      setToast({ isOpen: true, message: `Stock mínimo actualizado para ${item.producto.nombre}`, color: 'success' });
    } catch {
      setToast({ isOpen: true, message: 'Error al actualizar stock mínimo', color: 'danger' });
    }
  };

  const abrirEditarProducto = (producto: Producto) => {
    setProductoEditando(producto);
    setShowEditModal(true);
  };

  const guardarEdicionProducto = async () => {
    try {
      await api.updateProducto(productoEditando.id, {
        nombre: productoEditando.nombre,
        descripcion: productoEditando.descripcion,
        precio: productoEditando.precio,
      });
      setToast({ isOpen: true, message: 'Producto actualizado correctamente', color: 'success' });
      setShowEditModal(false);
      cargarInventarios();
    } catch {
      setToast({ isOpen: true, message: 'Error actualizando producto', color: 'danger' });
    }
  };

  const confirmarEliminar = (id: number) => {
    setDeleteId(id);
    setShowConfirmDelete(true);
  };

  const eliminarInventario = async () => {
    if (deleteId == null) return;
    try {
      await api.deleteInventario(deleteId);
      setItems(items.filter(i => i.id !== deleteId));
      setToast({ isOpen: true, message: 'Inventario eliminado', color: 'success' });
    } catch {
      setToast({ isOpen: true, message: 'Error eliminando inventario', color: 'danger' });
    }
    setShowConfirmDelete(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Inventario Panadería</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {loading ? (
          <IonSpinner name="crescent" />
        ) : (
          <IonList>
            {items.map(item => (
              <IonCard key={item.id}>
                <IonCardHeader>
                  <IonCardTitle>{item.producto.nombre || 'Sin nombre'}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonGrid>
                    <IonRow className="ion-align-items-center">
                      <IonCol size="6">
                        <IonInput
                          type="number"
                          value={stockMinimos[item.id] ?? 0}
                          onIonChange={e => handleStockChange(item.id, e.detail.value!)}
                          min={0}
                        />
                      </IonCol>
                      <IonCol size="6">
                        <IonButton size="small" onClick={() => guardarStockMinimo(item)}>
                          Guardar stock mínimo
                        </IonButton>
                        <IonButton size="small" color="warning" onClick={() => abrirEditarProducto(item.producto)}>
                          <IonIcon icon={createOutline} />
                        </IonButton>
                        <IonButton size="small" color="danger" onClick={() => confirmarEliminar(item.id)}>
                          <IonIcon icon={trashOutline} />
                        </IonButton>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
              </IonCard>
            ))}
          </IonList>
        )}

        {/* Modal para editar producto */}
        <IonModal isOpen={showEditModal} onDidDismiss={() => setShowEditModal(false)}>
          <IonContent className="ion-padding">
            <h2>Editar Producto</h2>

            <IonLabel>Nombre</IonLabel>
            <IonInput
              value={productoEditando.nombre}
              onIonChange={e => setProductoEditando(prev => ({ ...prev, nombre: e.detail.value! }))}
            />

            <IonLabel>Descripción</IonLabel>
            <IonInput
              value={productoEditando.descripcion}
              onIonChange={e => setProductoEditando(prev => ({ ...prev, descripcion: e.detail.value! }))}
            />

            <IonLabel>Precio</IonLabel>
            <IonInput
              type="number"
              value={productoEditando.precio}
              onIonChange={e => setProductoEditando(prev => ({ ...prev, precio: parseFloat(e.detail.value!) || 0 }))}
            />

            <IonButton expand="block" onClick={guardarEdicionProducto} style={{ marginTop: 16 }}>
              Guardar Cambios
            </IonButton>
            <IonButton expand="block" color="medium" onClick={() => setShowEditModal(false)} style={{ marginTop: 8 }}>
              Cancelar
            </IonButton>
          </IonContent>
        </IonModal>

        {/* Confirmación para eliminar */}
        <IonAlert
          isOpen={showConfirmDelete}
          header="Confirmar eliminación"
          message="¿Seguro que quieres eliminar este inventario?"
          buttons={[
            { text: 'Cancelar', role: 'cancel', handler: () => setShowConfirmDelete(false) },
            { text: 'Eliminar', handler: eliminarInventario }
          ]}
        />

        {/* Toasts */}
        <IonToast
          isOpen={toast.isOpen}
          message={toast.message}
          color={toast.color}
          duration={2000}
          onDidDismiss={() => setToast(prev => ({ ...prev, isOpen: false }))}
        />
      </IonContent>
    </IonPage>
  );
};

export default Inventario;
