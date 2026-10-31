import Icon from "./Icon.jsx";

export default function Toast({ notification, onDismiss }) {
  if (!notification) return null;

  return (
    <div className={`toast toast-${notification.type}`} role={notification.type === "error" ? "alert" : "status"}>
      <span className="toast-symbol"><Icon name={notification.type === "error" ? "alert" : "check"} size={16} /></span>
      <p>{notification.message}</p>
      <button type="button" onClick={onDismiss} aria-label="Cerrar notificación">Cerrar</button>
    </div>
  );
}