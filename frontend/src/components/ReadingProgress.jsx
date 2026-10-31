import { useEffect, useRef } from "react";

export default function ReadingProgress() {
  const barraRef = useRef(null);

  useEffect(() => {
    let pendiente = false;

    function actualizar() {
      pendiente = false;
      const alto = document.documentElement.scrollHeight - window.innerHeight;
      const avance = alto > 0 ? Math.min(window.scrollY / alto, 1) : 0;
      if (barraRef.current) barraRef.current.style.transform = `scaleX(${avance})`;
    }

    function alHacerScroll() {
      if (pendiente) return;
      pendiente = true;
      window.requestAnimationFrame(actualizar);
    }

    actualizar();
    window.addEventListener("scroll", alHacerScroll, { passive: true });
    window.addEventListener("resize", alHacerScroll);
    return () => {
      window.removeEventListener("scroll", alHacerScroll);
      window.removeEventListener("resize", alHacerScroll);
    };
  }, []);

  return <div className="reading-progress" ref={barraRef} aria-hidden="true" />;
}
