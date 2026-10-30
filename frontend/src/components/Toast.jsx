export default function Toast({ notification, onDismiss }) {
  if (!notification) return null;

  return (
    <div className={`toast toast-${notification.type}`} role={notification.type === "error" ? "alert" : "status"}>
      <span className="toast-symbol" aria-hidden="true">{notification.type === "error" ? "!" : "✓"}</span>
      <p>{notification.message}</p>
      <button type="button" onClick={onDismiss} aria-label="Cerrar notificación">Cerrar</button>
    </div>
  );
}