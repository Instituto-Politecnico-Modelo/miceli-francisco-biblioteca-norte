import AdminBar from "../components/AdminBar.jsx";
import CatalogSection from "../components/CatalogSection.jsx";
import LoginForm from "../components/LoginForm.jsx";
import { useAdmin } from "../hooks/useAdmin.js";
import { useBiblioteca } from "../hooks/useBiblioteca.js";

function PanelCatalogo({ notificar }) {
  const { datos, favoritos, catalogo } = useBiblioteca(notificar);
  return <CatalogSection admin datos={datos} catalogo={catalogo} favoritos={favoritos} />;
}

export default function Admin({ notificar }) {
  const admin = useAdmin(notificar);

  return (
    <>
      <AdminBar autenticado={admin.autenticado} onSalir={admin.salir} />
      <main className="admin-main">
        {admin.verificando && <p className="admin-status" role="status"><span className="spinner" /> Verificando tu sesión…</p>}
        {!admin.verificando && !admin.autenticado && <LoginForm ingresando={admin.ingresando} onSubmit={admin.entrar} />}
        {!admin.verificando && admin.autenticado && <PanelCatalogo notificar={notificar} />}
      </main>
    </>
  );
}
