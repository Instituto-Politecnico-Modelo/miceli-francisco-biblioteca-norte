import { useCallback, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import Toast from "./components/Toast.jsx";
import Admin from "./pages/Admin.jsx";
import Home from "./pages/Home.jsx";

export default function App() {
  const [notification, setNotification] = useState(null);
  const notificar = useCallback((aviso) => setNotification(aviso), []);

  useEffect(() => {
    if (!notification) return undefined;
    const timeout = window.setTimeout(() => setNotification(null), 4200);
    return () => window.clearTimeout(timeout);
  }, [notification]);

  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <Routes>
        <Route
          path="/"
          element={(
            <>
              <Header />
              <Home notificar={notificar} />
              <Footer />
            </>
          )}
        />
        <Route path="/admin" element={<Admin notificar={notificar} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toast notification={notification} onDismiss={() => setNotification(null)} />
    </>
  );
}
