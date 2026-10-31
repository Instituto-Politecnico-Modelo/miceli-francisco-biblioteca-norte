import { useEffect, useState } from "react";
import Icon from "./Icon.jsx";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const actualizar = () => setVisible(window.scrollY > 900);
    actualizar();
    window.addEventListener("scroll", actualizar, { passive: true });
    return () => window.removeEventListener("scroll", actualizar);
  }, []);

  return (
    <a className={`back-to-top${visible ? " is-visible" : ""}`} href="#inicio" aria-label="Volver arriba" tabIndex={visible ? 0 : -1}>
      <Icon name="arrow-up" size={20} />
    </a>
  );
}
