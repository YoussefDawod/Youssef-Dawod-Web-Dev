import "../styles/projects.css";
import { useState, useEffect } from "react";
import projectsData from "../components/projectsData";

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