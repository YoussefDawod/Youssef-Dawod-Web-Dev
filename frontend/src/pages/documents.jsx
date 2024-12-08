import { useEffect, useState } from "react";
import "../styles/documents.css";

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchFiles = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/documents`);
      if (!response.ok) {
        throw new Error("Fehler beim Abrufen der Dateien.");
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Unerwarteter Inhaltstyp: " + contentType);
      }

      const data = await response.json();
      const docs = data.filter((file) => file.type === "documents");
      const certs = data.filter((file) => file.type === "certificates");
      setDocuments(docs);
      setCertificates(certs);
    } catch (err) {
      console.error("Fehler beim Abrufen der Dateien:", err);
      setError("Fehler beim Abrufen der Dateien.");
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleViewFile = async (fileName, type) => {
    if (!password) {
      setError("Bitte geben Sie ein Passwort ein.");
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/documents/view`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, fileName, type }),
      });

      if (!response.ok) {
        throw new Error("Ungültiges Passwort oder Fehler beim Abrufen der Datei.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      window.open(url); // Datei im neuen Tab anzeigen
    } catch (err) {
      setError("Ungültiges Passwort oder Fehler beim Abrufen der Datei.");
      console.error("Fehler beim Abrufen der Datei:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password) {
      setError("Bitte geben Sie ein Passwort ein.");
      return;
    }
    fetchFiles();
  };

  return (
    <div className="documents">
      <h2>Dokumente</h2>
      <form onSubmit={handleSubmit}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Passwort eingeben"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      {error && <p className="error">{error}</p>}
      <div className="file-section">
        <h3>Unterlagen</h3>
        <ul>
          {documents.map((file) => (
            <li key={file.name} onClick={() => handleViewFile(file.name, "documents")}>
              {file.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="file-section">
        <h3>Zertifikate</h3>
        <ul>
          {certificates.map((file) => (
            <li key={file.name} onClick={() => handleViewFile(file.name, "certificates")}>
              {file.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Documents;