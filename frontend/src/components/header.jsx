import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "./footer";
import { CodeIcon, SunIcon, MoonIcon } from "./icons";
import "../styles/header-footer.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Setze immer den Dark-Modus als Standard
    setIsDarkMode(true);
    document.documentElement.setAttribute("data-theme", "dark");

    // Header standardmäßig geschlossen lassen
    setIsOpen(false);
  }, []);

  useEffect(() => {
    // Schließe den Header beim Navigieren zwischen den Seiten
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest("header") && !event.target.closest(".toggle-icon")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const toggleHeader = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    localStorage.setItem("headerIsOpen", newIsOpen);
  };

  const toggleMode = (mode) => {
    // Ändere den Modus und speichere ihn in localStorage
    setIsDarkMode(mode === "dark");
    localStorage.setItem("theme", mode);
    document.documentElement.setAttribute("data-theme", mode);
  };

  return (
    <>
      <div
        className={`toggle-icon ${isOpen ? "rotated open" : ""}`}
        onClick={toggleHeader}
      >
        <CodeIcon />
      </div>

      {isOpen && (
        <header className={`header ${isOpen ? "open" : ""}`}>
          <div className="mode-toggle-buttons">
            <div
              className={`mode-toggle-button ${isDarkMode ? "active" : ""}`}
              onClick={() => toggleMode("dark")}
              disabled={isDarkMode}
            >
              <MoonIcon />
            </div>
            <div
              className={`mode-toggle-button ${!isDarkMode ? "active" : ""}`}
              onClick={() => toggleMode("light")}
              disabled={!isDarkMode}
            >
              <SunIcon />
            </div>
          </div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/projects">Projekte</Link>
              </li>
              <li>
                <Link to="/documents">Documente</Link>
              </li>
              <li>
                <Link to="/contact">Kontakt</Link>
              </li>
            </ul>
          </nav>
          <Footer />
        </header>
      )}
    </>
  );
};

export default Header;