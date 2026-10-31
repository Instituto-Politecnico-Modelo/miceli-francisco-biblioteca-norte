import { useCallback, useEffect, useState } from "react";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import Toast from "./components/Toast.jsx";
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
      <Header />
      <Home notificar={notificar} />
      <Footer />
      <Toast notification={notification} onDismiss={() => setNotification(null)} />
    </>
  );
}
