// src/pages/Reporte_venta.tsx

import React, { useEffect, useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonText, IonSpinner, IonToast
} from '@ionic/react';
import api from '../services/api';


interface ReporteVenta {
  id: number;
  fecha: string;
  totalVentas: number;
}

const ReporteVenta: React.FC = () => {
  const [reportes, setReportes] = useState<ReporteVenta[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [toast, setToast] = useState({
    isOpen: false,
    message: '',
    color: 'success' as 'success' | 'danger'
  });

  useEffect(() => {
    const fetchReportes = async () => {
      setLoading(true);
      try {
        const res = await api.getReportesVenta();
        if (Array.isArray(res)) {
          setReportes(res);
        } else {
          throw new Error('Formato de datos inválido');
        }
      } catch (err) {
        console.error('Error al cargar reportes:', err);
        setToast({ isOpen: true, message: 'Error al cargar reportes', color: 'danger' });
      } finally {
        setLoading(false);
      }
    };

    fetchReportes();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Reportes de Ventas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {loading && <IonSpinner />}

        <IonList>
          {reportes.map((r) => (
            <IonItem key={r.id} lines="full">
              <IonLabel className="ion-text-wrap">
                <h2><strong>Fecha:</strong> {new Date(r.fecha).toLocaleDateString('es-CO')}</h2>
                <IonText color="primary">
                  <strong>Total Ventas: ${r.totalVentas.toLocaleString('es-CO')} COP</strong>
                </IonText>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

        <IonToast
          isOpen={toast.isOpen}
          message={toast.message}
          color={toast.color}
          duration={2000}
          onDidDismiss={() => setToast({ ...toast, isOpen: false })}
        />
      </IonContent>
    </IonPage>
  );
};

export default ReporteVenta;
