import React from "react";
import { IonButton, IonIcon } from "@ionic/react";
import {
  layersOutline,
  documentTextOutline,
  cartOutline,
  receiptOutline
} from "ionicons/icons";
import "./componentButtons.css";

// Botones adicionales: Inventario, Reporte de Ventas, Carrito y Facturación
const ComponentButtonsExtra: React.FC = () => {
  return (
    <div className="crud-buttons">
      {/* Botón Inventario */}
      <IonButton className="btn inventario" size="small" routerLink="/inventario">
        <IonIcon icon={layersOutline} slot="start" />
        Inventario
      </IonButton>

      {/* Botón Reporte de Ventas */}
      <IonButton className="btn reporte" size="small" routerLink="/reporte_venta">
        <IonIcon icon={documentTextOutline} slot="start" />
        Reporte Ventas
      </IonButton>

      {/* Botón Carrito */}
      <IonButton className="btn carrito" size="small" routerLink="/carrito">
        <IonIcon icon={cartOutline} slot="start" />
        Carrito
      </IonButton>

      {/* Botón Facturación */}
      <IonButton className="btn factura" size="small" routerLink="/factura">
        <IonIcon icon={receiptOutline} slot="start" />
        Facturación
      </IonButton>
    </div>
  );
};

export default ComponentButtonsExtra;