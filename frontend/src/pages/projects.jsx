import "../styles/projects.css";
import { useState, useEffect } from "react";

export const projectsData = [
  {
    title: "Restaurant Muster The Kitchen",
    link: "https://youssefdawod.github.io/The-Kitchen/",
    description: [
      "Dieses Projekt ist meine erste Arbeit im Rahmen eines Schulprojekts und wurde mit HTML, CSS und JavaScript erstellt.",
      " Die Webseite ist ein benutzerfreundliches Template für Restaurants und so gestaltet, dass sie sich leicht anpassen lässt.",
      " Es gibt klare Bereiche wie Speisen und Getränke sowie weitere Abschnitte.",
      " Das Ziel war, ein modernes und ansprechendes Design zu schaffen, das einfach zu bedienen ist und die Idee eines Restaurantauftritts gut widerspiegelt.",
    ],
    images: [
      "/images/kitchen-1.png",
      "/images/kitchen-2.png",
    ],
  },
  {
    title: "Rezept Suche",
    link: "https://youssefdawod.github.io/rezept-app/",
    description: [
      "Das Projekt ist eine moderne und schnelle Rezept-Webseite, entwickelt mit Vite.",
      " Nutzer können gezielt nach Rezepten suchen und erhalten detaillierte Informationen zu den Gerichten, einschließlich eines passenden Bildes.",
      " Das Ziel ist es, eine benutzerfreundliche Plattform für Kochinspirationen zu schaffen.",
    ],
    images: [
      "/images/rezeptSuche-1.png",
      "/images/rezeptSuche-2.png",
    ],
  },
  {
    title: "TIA KI Text Adventure",
    link: "",
    description: [
      "Ist ein interaktives Spiel, bei dem die Spieler durch Texteingaben eine dynamische Geschichte gestalten.",
      " Das Besondere: Mithilfe von KI werden sowohl die Handlung als auch visuell beeindruckende Bilder in Echtzeit generiert, die die Szenarien lebendig machen.",
      " Jede Entscheidung verändert den Verlauf der Geschichte.",
      " Ein einzigartiges Spielerlebnis, das Technologie und Kreativität verbindet.",
      " Das Projekt ist aktuell nur lokal verfügbar und wird noch nicht online gehostet.",
    ],
    images: ["/images/tia.png", "/images/tia-2.png"],
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (selectedProject) {
      const interval = setInterval(() => {
        setFade(true);
        setTimeout(() => {
          setCurrentImageIndex(
            (prevIndex) => (prevIndex + 1) % selectedProject.images.length
          );
          setFade(false);
        }, 1000); // Zeit für den Fade-Out-Effekt
      }, 3000); // Wechselt alle 3 Sekunden
      return () => clearInterval(interval);
    }
  }, [selectedProject]);

  return (
    <div className="projects">
      <div className="projects-content">
        <div className="projects-left">
          <h2>Projekte</h2>
          <div className="projects-list">
            {projectsData.map((project, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedProject(project);
                  setCurrentImageIndex(0);
                }}
              >
                <a>{project.title}</a>
              </div>
            ))}
          </div>
        </div>
        <div className="projects-right">
          {selectedProject && (
            <div className="project-details">
              <img
                src={selectedProject.images[currentImageIndex]}
                alt={selectedProject.title}
                style={{ opacity: fade ? 0 : 1 }}
              />
              <a
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedProject.title}
              </a>
              <p>{selectedProject.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;