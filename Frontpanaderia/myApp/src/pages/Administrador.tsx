import './Administrador.css';
import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonText,
  IonAlert,
  IonIcon
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { personCircleOutline, lockClosedOutline } from 'ionicons/icons';

const ADMIN_EMAIL = 'admin@panaderia.com';
const ADMIN_PASSWORD = '123456';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showWelcomeAlert, setShowWelcomeAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    const correo = email.trim();
    const contrasena = password.trim();

    if (!correo || !contrasena) {
      setErrorMessage('Correo y contraseña son obligatorios.');
      return;
    }

    if (correo === ADMIN_EMAIL && contrasena === ADMIN_PASSWORD) {
      setShowWelcomeAlert(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Credenciales inválidas. Intenta de nuevo.');
    }
  };

  const handleWelcomeDismiss = () => {
    history.push('/producto');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="title-center">Iniciar Sesión</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding login-content" style={{ backgroundColor: '#f4f4f4' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ color: '#1976d2' }}>¡Bienvenido a Gamsh Panadería!</h2>
        </div>

        <div style={{ maxWidth: '400px', margin: 'auto' }}>
          <IonItem lines="none" style={{ marginBottom: '20px' }}>
            <IonIcon icon={personCircleOutline} slot="start" style={{ color: '#1976d2' }} />
            <h4><IonLabel position="stacked">Correo Electrónico</IonLabel></h4>
            <IonInput
              type="email"
              value={email}
              onIonChange={e => setEmail(e.detail.value || '')}
              placeholder="admin@panaderia.com"
              clearInput
            />
          </IonItem>

          <IonItem lines="none" style={{ marginBottom: '30px' }}>
            <IonIcon icon={lockClosedOutline} slot="start" style={{ color: '#1976d2' }} />
            <h4><IonLabel position="stacked">Contraseña</IonLabel></h4>
            <IonInput
              type="password"
              value={password}
              onIonChange={e => setPassword(e.detail.value || '')}
              placeholder="••••••"
              clearInput
            />
          </IonItem>

          {errorMessage && (
            <IonText color="danger" style={{ display: 'block', textAlign: 'center', marginBottom: '20px' }}>
              <p>{errorMessage}</p>
            </IonText>
          )}

          <IonButton
            expand="block"
            onClick={handleLogin}
            style={{
              fontSize: '18px',
              color: '#fff',
              padding: '12px',
              borderRadius: '8px',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease'
            }}
          >
            Iniciar Sesión
          </IonButton>

          <IonText color="medium" style={{ display: 'block', textAlign: 'center', marginTop: '15px' }}>
            <p>¿No tienes una cuenta? Contacta a la panadería.</p>
          </IonText>
        </div>

        <IonAlert
          isOpen={showWelcomeAlert}
          onDidDismiss={handleWelcomeDismiss}
          header="¡Bienvenido!"
          message="Bienvenido a nuestra panadería Gamsh"
          buttons={[{ text: 'Gracias', handler: handleWelcomeDismiss }]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
