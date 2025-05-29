import React from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/react';


const Home: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Inicio</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      Bienvenido a la Panadería
    </IonContent>
  </IonPage>
);

export default Home;
