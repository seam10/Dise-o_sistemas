import './Inventario.css';
import React, { useEffect, useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList,
  IonLabel, IonInput, IonButton, IonSpinner, IonToast, IonAlert,
  IonIcon, IonCard, IonCardContent, IonGrid, IonCardHeader, IonCardTitle,
  IonCol, IonRow, IonModal, IonFooter
} from '@ionic/react';
import { addCircleOutline, trashOutline, createOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import api from '../services/api';
import ComponenteButtons from '../components/componenteButtons';

// Interfaces
interface Inventario {
  id?: number;
  nombre: string;
  stockMinimo: number;
  cantidad: number;
  precio: number;
  status?: boolean;
}

const Inventario: React.FC = () => {
  const history = useHistory();

  const [items, setItems] = useState<Inventario[]>([]);  // Inventarios cargados
  const [loading, setLoading] = useState(false);  // Estado de carga
  const [toast, setToast] = useState<{ isOpen: boolean; message: string; color: 'success' | 'danger' }>({
    isOpen: false,
    message: '',
    color: 'success',
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [nuevoInventario, setNuevoInventario] = useState<Inventario>({
    nombre: '',
    stockMinimo: 0,
    cantidad: 0,
    precio: 0,
  });

  const cargarInventarios = async () => {
    setLoading(true);
    try {
      const response = await api.getInventarios();
      setItems(response);
    } catch {
      setToast({ isOpen: true, message: 'Error cargando inventarios', color: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarInventarios();
  }, []);

  const guardarInventario = async () => {
    if (
      !nuevoInventario.nombre.trim() ||
      nuevoInventario.precio <= 0 ||
      nuevoInventario.cantidad < 0 ||
      nuevoInventario.stockMinimo < 0
    ) {
      setToast({ isOpen: true, message: 'Revisa los campos antes de guardar', color: 'danger' });
      return;
    }

    try {
      if (isEditMode) {
        // Para editar, asumo que usas crearInventario para ambos
        await api.crearInventario(nuevoInventario);
        setIsEditMode(false);
      } else {
        await api.crearInventario(nuevoInventario);
      }

      // Dispatch evento para notificar que inventario cambió
      window.dispatchEvent(new Event('inventarioActualizado'));

      cargarInventarios();
      setNuevoInventario({ nombre: '', stockMinimo: 0, cantidad: 0, precio: 0 });
      setShowAddModal(false);
      setToast({ isOpen: true, message: 'Inventario guardado con éxito', color: 'success' });
    } catch {
      setToast({ isOpen: true, message: 'Error al guardar inventario', color: 'danger' });
    }
  };

  const confirmarEliminar = (id: number) => {
    setDeleteId(id);
    setShowConfirmDelete(true);
  };

  const eliminarInventario = async () => {
    if (deleteId == null) return;
    try {
      await api.eliminarInventario(deleteId);
      setItems(prev => prev.filter(item => item.id !== deleteId));
      setToast({ isOpen: true, message: 'Inventario eliminado', color: 'success' });
      window.dispatchEvent(new Event('inventarioActualizado'));
    } catch {
      setToast({ isOpen: true, message: 'Error eliminando inventario', color: 'danger' });
    }
    setShowConfirmDelete(false);
  };

  const editarInventario = (item: Inventario) => {
    setNuevoInventario(item);
    setIsEditMode(true);
    setShowAddModal(true);
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
            {items.length > 0 ? (
              items.map(item => (
                <IonCard key={item.id} className="inventario-item">
                  <IonCardHeader>
                    <IonCardTitle className="inventario-titulo">{item.nombre || 'Sin nombre'}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonGrid>
                      <IonRow className="ion-align-items-center">
                        <IonCol size="6">
                          <IonLabel className="label-stock">Stock Mínimo</IonLabel>
                          <IonInput type="number" value={item.stockMinimo} min={0} readonly />
                        </IonCol>
                        <IonCol size="6" className="col-buttons">
                          <IonButton size="default" color="success" onClick={() => editarInventario(item)} className="boton-editar">
                            <IonIcon icon={createOutline} />
                          </IonButton>
                          <IonButton size="default" color="danger" onClick={() => confirmarEliminar(item.id!)} className="boton-eliminar">
                            <IonIcon icon={trashOutline} />
                          </IonButton>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCardContent>
                </IonCard>
              ))
            ) : (
              <IonLabel>No hay inventarios disponibles</IonLabel>
            )}
          </IonList>
        )}

        <IonButton expand="block" color="success" onClick={() => setShowAddModal(true)} className="boton-agregar">
          <IonIcon icon={addCircleOutline} slot="start" />
          Agregar Producto e Inventario
        </IonButton>

        <IonToast
          isOpen={toast.isOpen}
          message={toast.message}
          color={toast.color}
          duration={2000}
          onDidDismiss={() => setToast({ ...toast, isOpen: false })}
        />
      </IonContent>

      <IonFooter>
        <ComponenteButtons />
      </IonFooter>

      <IonModal isOpen={showAddModal} onDidDismiss={() => setShowAddModal(false)}>
        <IonContent className="ion-padding">
          <IonLabel>Nombre del Producto</IonLabel>
          <IonInput
            value={nuevoInventario.nombre}
            onIonChange={e => setNuevoInventario(prev => ({ ...prev, nombre: e.detail.value! }))}
          />
          <IonLabel>Stock Mínimo</IonLabel>
          <IonInput
            type="number"
            value={nuevoInventario.stockMinimo}
            onIonChange={e => setNuevoInventario(prev => ({ ...prev, stockMinimo: parseInt(e.detail.value!) }))}
          />
          <IonLabel>Cantidad</IonLabel>
          <IonInput
            type="number"
            value={nuevoInventario.cantidad}
            onIonChange={e => setNuevoInventario(prev => ({ ...prev, cantidad: parseInt(e.detail.value!) }))}
          />
          <IonLabel>Precio</IonLabel>
          <IonInput
            type="number"
            value={nuevoInventario.precio}
            onIonChange={e => setNuevoInventario(prev => ({ ...prev, precio: parseFloat(e.detail.value!) }))}
          />
          <IonButton expand="block" onClick={guardarInventario}>
            {isEditMode ? 'Actualizar Inventario' : 'Crear Inventario'}
          </IonButton>
        </IonContent>
      </IonModal>

      <IonAlert
        isOpen={showConfirmDelete}
        header="Confirmar Eliminación"
        message="¿Estás seguro de eliminar este inventario?"
        buttons={[
          { text: 'Cancelar', role: 'cancel', handler: () => setShowConfirmDelete(false) },
          { text: 'Eliminar', handler: eliminarInventario },
        ]}
      />
    </IonPage>
  );
};

export default Inventario;
