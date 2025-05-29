import React from "react";
import { IonButton, IonIcon } from "@ionic/react";
import {
  layersOutline,
  documentTextOutline,
  cartOutline,
  receiptOutline,
  cubeOutline
} from "ionicons/icons";
import "./componenteButtons.css";

const componenteButtons: React.FC = () => {
  return (
    <div className="crud-buttons">
      {/* Solo íconos sin texto */}

       <IonButton className="btn producto" size="small" routerLink="/producto">
    <IonIcon icon={cubeOutline} />
      </IonButton>

      <IonButton className="btn inventario" size="small" routerLink="/inventario">
        <IonIcon icon={layersOutline} />
      </IonButton>

      <IonButton className="btn reporte" size="small" routerLink="/reporte_venta">
        <IonIcon icon={documentTextOutline} />
      </IonButton>

      <IonButton className="btn carrito" size="small" routerLink="/carrito">
        <IonIcon icon={cartOutline} />
      </IonButton>

      <IonButton className="btn facturacion" size="small" routerLink="/factura">
        <IonIcon icon={receiptOutline} />
      </IonButton>

      
    </div>
  );
};

export default componenteButtons;
