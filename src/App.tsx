import { Outlet } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { ErrorBoundary } from "./Components.tsx/ErrorBoundry";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import AuthProvider from "./hooks/useAuth";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";

function App() {
  return (
    <>
      <ErrorBoundary>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <AuthProvider>
              <LocalizationProvider
                dateAdapter={AdapterMoment}
                adapterLocale="EN-GB"
              >
              <AppRoutes />
              <ToastContainer className={"m-4"} />
                <Outlet />
              </LocalizationProvider>
            </AuthProvider>
          </PersistGate>
        </Provider>
      </ErrorBoundary>
    </>
  );
}

export default App;
