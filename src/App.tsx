import { Outlet } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { ErrorBoundary } from "./Components.tsx/ErrorBoundry";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import AuthProvider from "./hooks/useAuth";

function App() {
  return (
    <>
      <ErrorBoundary>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <AuthProvider>
              <AppRoutes />
              <ToastContainer className={'m-4'}/>
              <Outlet />
            </AuthProvider>
          </PersistGate>
        </Provider>
      </ErrorBoundary>
    </>
  );
}

export default App;
