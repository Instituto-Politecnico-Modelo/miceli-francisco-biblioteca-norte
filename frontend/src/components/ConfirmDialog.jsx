import { useEffect, useRef } from "react";

export default function ConfirmDialog({ abierto, titulo, mensaje, confirmar, procesando, onConfirm, onCancel }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (abierto && !dialog.open) dialog.showModal();
    if (!abierto && dialog.open) dialog.close();
  }, [abierto]);

  function cancelarConEscape(event) {
    event.preventDefault();
    if (!procesando) onCancel();
  }

  function cancelarFueraDelCuadro(event) {
    if (event.target === event.currentTarget && !procesando) onCancel();
  }

  return (
    <dialog
      ref={dialogRef}
      className="confirm-dialog"
      aria-labelledby="confirm-title"
      aria-describedby="confirm-text"
      onCancel={cancelarConEscape}
      onClick={cancelarFueraDelCuadro}
    >
      <div className="confirm-body">
        <h2 id="confirm-title">{titulo}</h2>
        <p id="confirm-text">{mensaje}</p>
        <div className="confirm-actions">
          <button className="button button-quiet" type="button" onClick={onCancel} disabled={procesando}>Cancelar</button>
          <button className="button button-danger" type="button" onClick={onConfirm} disabled={procesando}>
            {procesando ? "Eliminando…" : confirmar}
          </button>
        </div>
      </div>
    </dialog>
  );
}
