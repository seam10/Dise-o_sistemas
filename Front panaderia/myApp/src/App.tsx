import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Administrador'; 
import Productos from './pages/Producto';
import Reportes from './pages/Reporte_venta';
import Inventario from './pages/Inventario';
import Facturacion from './pages/Factura'; // ✅ Importación de Facturación
import Carrito from './pages/Carrito';

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
          <Carrito /> 
        </Route>
        <Route exact path="/Reporte_venta">
          <Reportes />
        </Route>
        <Route exact path="/Inventario">
          <Inventario />
        </Route>
        <Route exact path="/Factura"> {/* ✅ Ruta añadida */}
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
