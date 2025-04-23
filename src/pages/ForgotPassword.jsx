import React, { useState } from "react"; // React + hook useState
import "../styles/login.css"; // Fichier CSS partagé avec SignIn
import "../styles/forgot-password.css"; // Fichier CSS forgot-password
import { Link } from "react-router-dom"; // lien vers la page de connexion
import { Icon } from "@iconify/react"; // 📧 Icône email

// Composant ForgotPassword
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // 👈 loader comme dans signin

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Veuillez entrer votre adresse email.");
      return;
    }

    setError("");
    setMessage("");
    setLoading(true); // 👈 démarre le loader

    try {
      const response = await fetch("http://localhost:8000/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Une erreur est survenue.");
      } else {
        setMessage("Un lien de réinitialisation a été envoyé à votre adresse email.");
      }
    } catch (err) {
      setError("Erreur de connexion au serveur.");
    } finally {
      setLoading(false); // 👈 stoppe le loader à la fin
    }
  };

  return (
    <section className="auth">
      <div className="auth-left">
        <div className="branding">
          <h1 className="gspd">GSPD</h1>
          <div className="yellow-line"></div>
          <p className="subtitle">
            Bienvenue sur votre Plateforme de Gestion <br />
            et Suivi des Dépenses
          </p>
          {/* logo SVG... */}
        </div>
      </div>

      <div className="auth-right">
        <div className="form-container">
          <h4>Mot de passe oublié</h4>

          <p style={{ marginBottom: "1rem", fontSize: "1rem", color: "#555" }}>
            Un lien de réinitialisation vous sera envoyé si un compte est associé à cette adresse.
          </p>

          {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}
          {message && <p style={{ color: "green", fontSize: "0.9rem" }}>{message}</p>}

          <form onSubmit={handleSubmit}>
            <div className="input-icon-wrapper">
              <span className="input-icon">
                <Icon icon="mdi:email-outline" />
              </span>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="reset-btn" disabled={loading || email === ""}>
                {loading ? (
                  <>
                    <span className="loader"></span> Réinitialisation en cours...
                  </>
                ) : (
                  "Réinitialiser le mot de passe"
                )}
              </button>

              <span className="signin-text">
                ou <Link to="/" className="signin-link">Se connecter</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
