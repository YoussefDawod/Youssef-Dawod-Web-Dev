const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const documentsRouter = require("./documents"); // Importiere den Dokumenten-Router

const app = express();
const PORT = process.env.PORT || 5000; // Dynamischer Port für Render und lokale Entwicklung

// Middleware
app.use(cors());
app.use(express.json()); // Verwendet die integrierte JSON Middleware von Express

// MongoDB-Verbindung
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB verbunden"))
  .catch((err) => {
    console.error("MongoDB-Verbindung fehlgeschlagen:", err);
    process.exit(1); // Server stoppen, wenn die Verbindung zur DB fehlschlägt
  });

// Schema und Modell für Nachrichten
const messageSchema = new mongoose.Schema({
  lastname: { type: String, required: true },
  firstname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

// Test-Route
app.get("/", (req, res) => {
  res.send("Server läuft!");
});

// POST-Route zum Speichern von Nachrichten
app.post("/send", async (req, res) => {
  const { firstname, lastname, email, phone, subject, message } = req.body;

  // Überprüfen, ob alle Pflichtfelder ausgefüllt sind
  if (!firstname || !lastname || !email || !subject || !message) {
    return res.status(400).json({ error: "Bitte alle Pflichtfelder ausfüllen." });
  }

  try {
    // Nachricht in der Datenbank speichern
    const newMessage = new Message({ firstname, lastname, email, phone, subject, message });
    await newMessage.save();
    res.status(200).json({ message: "Nachricht erfolgreich gespeichert!" });
  } catch (error) {
    console.error("Fehler beim Speichern der Nachricht:", error);
    res.status(500).json({ error: "Nachricht konnte nicht gespeichert werden." });
  }
});

// Füge den Dokumentenrouter hinzu
app.use("/api/documents", documentsRouter);

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
