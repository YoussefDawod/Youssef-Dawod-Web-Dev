import { Link } from "react-router-dom";
import "../styles/home.css";
import { useState, useEffect } from "react";
import projectsData from "../components/projectsData";

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const imagesWithTitles = projectsData.flatMap((project) =>
    project.images.map((image) => ({ image, title: project.title }))
  );

  const changeImage = (index) => {
    setFade(true);
    setTimeout(() => {
      setCurrentImageIndex(index);
      setFade(false);
    }, 1000); // Zeit für den Fade-Out-Effekt
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentImageIndex + 1) % imagesWithTitles.length;
      changeImage(nextIndex);
    }, 5000); // Wechselt alle 5 Sekunden
    return () => clearInterval(interval);
  }, [currentImageIndex]);

  const handlePrevClick = () => {
    const prevIndex =
      (currentImageIndex - 1 + imagesWithTitles.length) % imagesWithTitles.length;
    changeImage(prevIndex);
  };

  const handleNextClick = () => {
    const nextIndex = (currentImageIndex + 1) % imagesWithTitles.length;
    changeImage(nextIndex);
  };

  return (
    <div className="home">
      <div id="developer" className="developer">
        <div className="developer-ti-sub">
          <h1 className="developer-title">Youssef Dawod</h1>
          <h2 className="developer-subtitle">Full Stack Webentwickler</h2>
        </div>
        <div className="developer-description">
          <p>
            Entwicklung moderner Webseiten mit den neuesten Technologien und
            Tools
          </p>
          <p>
            Kreative Ansätze treffen auf innovative Technik, um digitale
            Projekte zu realisieren
          </p>
          <p>
            Klare Strukturen und durchdachte Designs schaffen eine harmonische
            Verbindung aus Ästhetik und Funktionalität
          </p>
          <p>
            Jedes Projekt wird mit zuverlässigen Technologien umgesetzt, um ein
            inspirierendes und zukunftssicheres digitales Erlebnis zu schaffen
          </p>
          <p>
            Visionen werden greifbar in Form moderner und einzigartiger
            Webseiten
          </p>
        </div>
      </div>
      <div id="knowledge-content" className="knowledge-content">
        <h3>Fachkenntnisse:</h3>
        <div className="knowledge-list">
          <div className="knowledge">
            <img
              className="knowledge-img"
              src="/icons/html-5.svg"
              alt="HTML5"
            />
            HTML5
          </div>
          <div className="knowledge">
            <img
              className="knowledge-img"
              src="/icons/css-3.svg"
              alt="CSS3"
            />
            CSS3
          </div>
          <div className="knowledge">
            <img
              className="knowledge-img"
              src="/icons/scss.svg"
              alt="SASS"
            />
            SASS
          </div>
          <div className="knowledge">
            <img
              className="knowledge-img"
              src="/icons/tailwind-css.svg"
              alt="Tailwind"
            />
            Tailwind
          </div>
          <div className="knowledge">
            <img
              className="knowledge-img"
              src="/icons/bootstrap.svg"
              alt="Bootstrap"
            />
            Bootstrap
          </div>
          <div className="knowledge">
            <img
              className="knowledge-img"
              src="/icons/javascript.svg"
              alt="JavaScript"
            />
            JavaScript
          </div>
          <div className="knowledge">
            <img
              className="knowledge-img"
              src="/icons/react.svg"
              alt="React"
            />
            React
          </div>
          <div className="knowledge">
            <img
              className="knowledge-img"
              src="/icons/vite.svg"
              alt="Vite"
            />
            Vite
          </div>
          <div className="knowledge">
            <img
              className="knowledge-img"
              src="/icons/node-js.svg"
              alt="Node.js"
            />
            Node.js
          </div>
          <div className="knowledge">
            <img
              className="knowledge-img"
              src="/icons/mongodb.svg"
              alt="MongoDB"
            />
            MongoDB
          </div>
          <div className="knowledge">
            <img
              className="knowledge-img"
              src="/icons/rest-api.svg"
              alt="Rest API"
            />
            Rest API
          </div>
          <div className="knowledge">
            <img
              className="knowledge-img"
              src="/icons/git.svg"
              alt="Git"
            />
            Git
          </div>
          <div className="knowledge">
            <img
              className="knowledge-img"
              src="/icons/terminal.svg"
              alt="Terminal"
            />
            Terminal
          </div>
          <div className="knowledge">
            <img
              className="knowledge-img"
              src="/icons/corel-draw.svg"
              alt="Corel Draw"
            />
            Corel Draw
          </div>
        </div>
      </div>
      <div id="projects-container" className="projects-container">
        <h3>Projekte:</h3>
        {imagesWithTitles.length > 0 && (
          <div className="project-image-container">
            <img
              src={imagesWithTitles[currentImageIndex].image}
              alt="Projektbild"
              className={`project-image ${fade ? "fade-out" : "fade-in"}`}
            />
            <div className="container-button">
              <button
                className="icon nav-button prev-button"
                onClick={handlePrevClick}
              >
                {"<"}
              </button>
              <div className="project-title">
                {imagesWithTitles[currentImageIndex].title}
              </div>
              <button
                className="icon nav-button next-button"
                onClick={handleNextClick}
              >
                {">"}
              </button>
            </div>
            <Link to="/projects">Alle Projekte zeigen</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;