import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Login from './pages/Administrador'; 
import Productos from './pages/Producto';
import Reportes from './pages/Reporte_venta';
import Inventario from './pages/Inventario';
import Facturacion from './pages/Factura'; // Nota: el componente se llama Facturacion.tsx
import CarritoPage from './pages/Carrito'; // Nota: el componente corregido es CarritoPage.tsx

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';

import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/Administrador">
          <Login />
        </Route>
        <Route exact path="/Producto">
          <Productos />
        </Route>
        <Route exact path="/Carrito">
          <CarritoPage /> 
        </Route>
        <Route exact path="/Reporte_venta">
          <Reportes />
        </Route>
        <Route exact path="/Inventario">
          <Inventario />
        </Route>
        <Route exact path="/Facturacion">
          <Facturacion />
        </Route>
        {/* Redirección por defecto */}
        <Route exact path="/">
          <Redirect to="/Administrador" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
