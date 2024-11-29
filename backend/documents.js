const express = require("express");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Initialisieren des Routers
const router = express.Router();

// Ordnerpfade für Dokumente und Zertifikate
const certificatesPath = path.join(__dirname, "private", "certificates");
const documentsPath = path.join(__dirname, "private", "documents");

// Helper-Funktion, um die Dateien eines Ordners zu lesen
const readFolder = (folderPath) => {
  return new Promise((resolve, reject) => {
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.error(`Fehler beim Lesen des Ordners: ${folderPath}`, err); // Debug-Ausgabe
        reject("Fehler beim Lesen der Dateien.");
      } else {
        console.log(`Dateien im Ordner ${folderPath}:`, files); // Debug-Ausgabe
        resolve(files);
      }
    });
  });
};

// Route: Liste der Dokumente und Zertifikate abrufen
router.get("/", async (req, res) => {
  try {
    // Dokumente und Zertifikate einlesen
    const documentFiles = await readFolder(documentsPath);
    const certificateFiles = await readFolder(certificatesPath);

    // Liste der Dateien aus beiden Ordnern zusammenfügen
    const fileList = [
      ...documentFiles.map(file => ({ name: file, type: "documents" })),
      ...certificateFiles.map(file => ({ name: file, type: "certificates" }))
    ];

    // Antwort mit allen Dateien
    res.status(200).json(fileList);
  } catch (err) {
    console.error("Fehler beim Abrufen der Dateien:", err);
    res.status(500).json({ error: "Fehler beim Abrufen der Dokumente und Zertifikate." });
  }
});

// Route: Geschütztes Dokument oder Zertifikat abrufen
router.post("/view", (req, res) => {
  const { password, fileName, type } = req.body;

  // Passwort prüfen
  if (password !== process.env.DOCUMENTS_PASSWORD) {
    return res.status(401).json({ error: "Ungültiges Passwort!" });
  }

  // Bestimmen des richtigen Pfads je nach Dateityp
  const filePath = type === "documents"
    ? path.join(documentsPath, fileName)
    : path.join(certificatesPath, fileName);

  console.log("Dateipfad:", filePath); // Debug-Ausgabe

  // Überprüfen, ob die Datei existiert
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Datei nicht gefunden!" });
  }

  // Datei als Download bereitstellen
  res.download(filePath, (err) => {
    if (err) {
      console.error("Fehler beim Senden der Datei:", err);
      res.status(500).json({ error: "Fehler beim Bereitstellen der Datei." });
    }
  });
});

module.exports = router;