import React, { useState } from "react"; // React + hook useState
import "../styles/login.css"; // Fichier CSS partagé avec SignIn
import { Link } from "react-router-dom"; // Pour le lien vers la page de connexion
import { Icon } from "@iconify/react"; // 📧 Icône email

// Composant ForgotPassword
const ForgotPassword = () => {
  // États locaux
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // Pour les messages de confirmation
  const [error, setError] = useState("");     // Pour afficher les erreurs

  // Fonction appelée au submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    if (!email) {
      setError("Veuillez entrer votre adresse email.");
      return;
    }

    setError("");
    setMessage("Traitement en cours...");

    try {
      const response = await fetch("http://localhost:8000/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }), // Envoie uniquement l'email
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Une erreur est survenue.");
        setMessage("");
      } else {
        setMessage("Un lien de réinitialisation a été envoyé à votre adresse email.");
      }
    } catch (err) {
      setError("Erreur de connexion au serveur.");
      setMessage("");
    }
  };

  return (
    <section className="auth">
      {/* Partie gauche - Branding */}
      <div className="auth-left">
        <div className="branding">
          <h1 className="gspd">GSPD</h1>
          <div className="yellow-line"></div>
          <p className="subtitle">
            Bienvenue sur votre Plateforme de Gestion <br />
            et Suivi des Dépenses
          </p>

          {/* Logo SVG */}
          <svg
            width="500"
            height="501"
            viewBox="0 0 500 501"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="logo"
          >
            <path
              d="M131.579 306.386V105.197H210.526V306.386L171.053 269.567L131.579 306.386ZM263.158 345.835V0H342.105V266.937L263.158 345.835ZM0 436.567V210.394H78.9474V357.669L0 436.567ZM0 501L169.737 331.37L263.158 411.583L410.526 264.307H368.421V211.709H500V343.205H447.368V301.126L265.789 482.591L172.368 402.378L73.6842 501H0Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      {/* Partie droite - Formulaire de récupération */}
      <div className="auth-right">
        <div className="form-container">
          <h4>Mot de passe oublié</h4>

          {/* Petit texte explicatif */}
          <p style={{ marginBottom: "1rem", fontSize: "1rem", color: "#555" }}>
            Un lien de réinitialisation vous sera envoyé si un compte est associé à cette adresse.
          </p>

          {/* Affichage d'erreur ou de succès */}
          {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}
          {message && <p style={{ color: "green", fontSize: "0.9rem" }}>{message}</p>}

          {/* Formulaire */}
          <form onSubmit={handleSubmit}>
            {/* Champ email avec icône */}
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

            {/* Actions : bouton + lien */}
            <div className="form-actions">
              <button type="submit" className="reset-btn" disabled={email === ""}>
                Réinitialiser le mot de passe
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
