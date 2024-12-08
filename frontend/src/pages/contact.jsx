import "../styles/contact.css";
import GitHubIcon from "/icons/github.svg";
import LinkedInIcon from "/icons/linkedin.svg";
import InstagramIcon from "/icons/instagram.svg";

const Contact = () => {
  // Die Funktion zum Absenden der Nachricht
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Formulardaten sammeln
    const formData = new FormData(event.target);
    const formDataObj = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });

    // POST-Anfrage an das Backend
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataObj),
      });

      if (response.ok) {
        alert("Nachricht erfolgreich gesendet!");
        event.target.reset(); // Formular zurücksetzen
      } else {
        alert("Fehler beim Senden der Nachricht.");
      }
    } catch (error) {
      console.error("Fehler:", error);
      alert("Es gab einen Fehler beim Senden der Nachricht.");
    }
  };

  return (
    <div className="contact-page">
      <h2>Kontakt</h2>
      <div className="contact">
        <h3>Schreiben Sie eine Nachricht</h3>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-infos">
            <input
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Nachname"
              required
            />
          </div>
          <div className="form-infos">
            <input
              type="text"
              id="firstname"
              name="firstname"
              placeholder="Vorname"
              required
            />
          </div>
          <div className="form-infos">
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Telefonnummer"
            />
          </div>
          <div className="form-infos">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="E-Mail"
              required
            />
          </div>
          <div className="form-mes">
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Betreff"
              required
            />
          </div>
          <div className="form-mes">
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Nachricht"
              required
            ></textarea>
          </div>
          <button type="submit">Nachricht senden</button>
        </form>
      </div>
      <div className="contact-info">
        <h3>Kontaktinformationen:</h3>
        <div className="contact-content">
          <div className="infos">
            <p> Youssef Dawod</p>
            <p>
              <a href="mailto:youssefdawod93@gmail.com">
                youssefdawod93@gmail.com
              </a>
            </p>
            <p>
              <a href="tel:+491709491518">01709491518</a>
            </p>
            <p> Deutschland, Soltau</p>
            <div className="social-icons">
              <a
                href="https://github.com/YoussefDawod"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className="icon" src={GitHubIcon} alt="GitHub" />
              </a>
              <a
                href="https://www.linkedin.com/in/youssef-dawod-203273215/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className="icon" src={LinkedInIcon} alt="LinkedIn" />
              </a>
              <a
                href="https://www.instagram.com/youssef0d/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className="icon" src={InstagramIcon} alt="Instagram" />
              </a>
            </div>
          </div>
          <div className="contact-map">
            <iframe
              title="Standort"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.9242631249714!2d9.847901015991772!3d52.98704357989844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b097342b91b5f1%3A0x4c20e713cb7e8b59!2sSoltau%2C%20Deutschland!5e0!3m2!1sen!2sde!4v1698150457695!5m2!1sen!2sde"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
