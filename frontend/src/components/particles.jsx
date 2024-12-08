import { useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesComponent = () => {
  const [init, setInit] = useState(false);
  const [particlesColor, setParticlesColor] = useState(
    getComputedStyle(document.documentElement).getPropertyValue("--ter-color").trim()
  );
  const [backgroundColor, setBackgroundColor] = useState(
    getComputedStyle(document.documentElement).getPropertyValue("--pri-bg-color").trim()
  );

  useEffect(() => {
    // Lade die Partikel-Engine
    initParticlesEngine(async (engine) => {
      await loadSlim(engine); // Slim-Version für bessere Performance
    }).then(() => {
      setInit(true);
    });

    // Funktion zum Aktualisieren der Partikel-Farbe und Hintergrundfarbe
    const updateColors = () => {
      const particlesColor = getComputedStyle(document.documentElement)
        .getPropertyValue("--ter-color")
        .trim();
      setParticlesColor(particlesColor);

      const bgColor = getComputedStyle(document.documentElement)
        .getPropertyValue("--pri-bg-color")
        .trim();
      setBackgroundColor(bgColor);
    };

    // Beobachte Änderungen am `data-theme`-Attribut
    const observer = new MutationObserver(() => {
      updateColors();
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    // Cleanup
    return () => observer.disconnect();
  }, []);

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: backgroundColor, // Hintergrundfarbe aus CSS-Variable
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: { enable: true, mode: "push" },
          onHover: { enable: true, mode: "repulse" },
        },
        modes: {
          push: { quantity: 4 },
          repulse: { distance: 200, duration: 0.4 },
        },
      },
      particles: {
        color: { value: particlesColor },
        links: {
          color: particlesColor,
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          outModes: { default: "bounce" },
        },
        number: { density: { enable: true, area: 800 }, value: 80 },
        opacity: { value: 0.5 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 5 } },
      },
      detectRetina: true,
    }),
    [particlesColor, backgroundColor] // Neu rendern, wenn sich `particlesColor` oder `backgroundColor` ändert
  );

  if (!init) return <></>; // Zeige nichts, bis die Engine geladen ist

  return <Particles id="tsparticles" options={options} />;
};

export default ParticlesComponent;