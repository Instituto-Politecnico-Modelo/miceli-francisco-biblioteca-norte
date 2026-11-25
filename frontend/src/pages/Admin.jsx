import { useEffect } from "react";
import AdminBar from "../components/AdminBar.jsx";
import CatalogSection from "../components/CatalogSection.jsx";
import LoginForm from "../components/LoginForm.jsx";
import PrestamosPanel from "../components/PrestamosPanel.jsx";
import SociosPanel from "../components/SociosPanel.jsx";
import { useAdmin } from "../hooks/useAdmin.js";
import { useBiblioteca } from "../hooks/useBiblioteca.js";
import { usePrestamos } from "../hooks/usePrestamos.js";
import { useSocios } from "../hooks/useSocios.js";
import "../styles/admin.css";

function PanelCatalogo({ notificar }) {
  const { datos: biblioteca, favoritos, catalogo } = useBiblioteca(notificar);
  const socios = useSocios(notificar);
  const prestamos = usePrestamos(notificar);

  async function crearPrestamo(datos) {
    const creado = await prestamos.crear(datos);
    if (creado) await biblioteca.recargar();
    return creado;
  }

  async function devolverPrestamo(id) {
    const devuelto = await prestamos.devolver(id);
    if (devuelto) await biblioteca.recargar();
    return devuelto;
  }

  return (
    <>
      <section className="circulation-section" aria-labelledby="circulation-title">
        <div className="circulation-heading">
          <h1 id="circulation-title">Socios y circulación</h1>
          <p>Registrá socios, prestá libros disponibles y gestioná las devoluciones.</p>
        </div>
        <div className="circulation-grid">
          <SociosPanel
            socios={socios.socios}
            loading={socios.loading}
            error={socios.error}
            guardando={socios.guardando}
            onRetry={socios.recargar}
            onSubmit={socios.crear}
          />
          <PrestamosPanel
            socios={socios.socios}
            sociosLoading={socios.loading}
            sociosError={socios.error}
            onRetrySocios={socios.recargar}
            libros={biblioteca.libros}
            librosLoading={biblioteca.loading}
            librosError={biblioteca.error}
            onRetryLibros={biblioteca.recargar}
            prestamos={prestamos.prestamos}
            loading={prestamos.loading}
            error={prestamos.error}
            registrando={prestamos.registrando}
            devolviendoId={prestamos.devolviendoId}
            onRetry={prestamos.recargar}
            onCrear={crearPrestamo}
            onDevolver={devolverPrestamo}
          />
        </div>
      </section>
      <CatalogSection admin datos={biblioteca} catalogo={catalogo} favoritos={favoritos} />
    </>
  );
}

export default function Admin({ notificar }) {
  const admin = useAdmin(notificar);

  useEffect(() => {
    document.title = "Administración · Biblioteca Popular Pueyrredón Norte";
  }, []);

  return (
    <>
      <AdminBar autenticado={admin.autenticado} onSalir={admin.salir} />
      <main className="admin-main" id="contenido" tabIndex={-1}>
        {admin.verificando && <p className="admin-status" role="status"><span className="spinner" /> Verificando tu sesión…</p>}
        {!admin.verificando && !admin.autenticado && <LoginForm ingresando={admin.ingresando} onSubmit={admin.entrar} />}
        {!admin.verificando && admin.autenticado && <PanelCatalogo notificar={notificar} />}
      </main>
    </>
  );
}
