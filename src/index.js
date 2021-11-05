import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { ToastContainer } from 'react-toastify';

// * ------ Styles Sheets for modules ----------
import 'react-toastify/dist/ReactToastify.css';
import 'react-multi-carousel/lib/styles.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
// * -------------------------------- * //

// * ------ Contexts ----------
import { AuthProvider } from 'Contexts/AuthContext';
import { StoreProvider } from 'Contexts/StoreContext';
// * -------------------------------- * //

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <StoreProvider>
        <ToastContainer
          position='top-right'
          autoClose={3500}
          hideProgressBar
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <App />
      </StoreProvider>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
