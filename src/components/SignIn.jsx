import React, { useState } from "react"; // Import de React et du hook useState
import "../styles/login.css"; // Import du fichier CSS de la page
import { Link } from "react-router-dom"; // Pour naviguer entre les pages
import { Icon } from "@iconify/react"; // Pour afficher les icônes (email, œil, etc.)

const SignIn = () => {
  // États locaux pour les champs du formulaire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Pour afficher les messages d’erreur
  const [loading, setLoading] = useState(false); // Pour gérer le loader du bouton
  const [showPassword, setShowPassword] = useState(false); // Pour afficher ou masquer le mot de passe

  // Fonction déclenchée à la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    // Validation basique des champs
    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setError("");
    setLoading(true); // Affiche le loader pendant la requête

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Envoie les données au backend
      });

      const data = await response.json();

      if (!response.ok) {
        // Si la réponse échoue (ex: mauvais identifiants)
        setError(data.message || "Identifiants incorrects.");
      } else {
        // Si tout est bon : on enregistre le token et on redirige
        localStorage.setItem("token", data.token);
        window.location.href = "/dashboard"; // Redirection vers le dashboard
      }
    } catch (err) {
      if (err.name === "TypeError") {
        setError("Connexion impossible. Le serveur est peut-être hors ligne.");
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
      console.error(err);
    } finally {
      setLoading(false); // Fin du chargement
    }
  };

  return (
    <section className="auth">
      {/* Colonne gauche : Branding et logo */}
      <div className="auth-left">
        <div className="branding">
          <h1 className="gspd">GSPD</h1>
          <div className="yellow-line"></div>
          <p className="subtitle">
            Bienvenue sur votre Plateforme de Gestion <br />
            et Suivi des Dépenses
          </p>

          {/* Logo en SVG (modifiable en couleur via CSS) */}
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

      {/* Colonne droite : formulaire */}
      <div className="auth-right">
        <div className="form-container">
          <h4>Identifiez-vous</h4>

          {/* Affichage de l’erreur si elle existe */}
          {error && (
            <p style={{ color: "red", fontSize: "0.9rem", marginTop: "0.5rem" }}>
              {error}
            </p>
          )}

          {/* Formulaire */}
          <form onSubmit={handleSubmit}>

            {/* Champ email avec icône 📧 */}
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

            {/* Champ mot de passe avec icône 🔒 et œil 👁️ */}
            <div className="input-icon-wrapper">
              <span className="input-icon">
                <Icon icon="mdi:lock-outline" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: "2.2rem", paddingRight: "2.5rem" }}
              />
              <span className="toggle-eye" onClick={() => setShowPassword(!showPassword)}>
                <Icon icon={showPassword ? "mdi:eye-off" : "mdi:eye"} />
              </span>
            </div>

            {/* Lien "Mot de passe oublié ?" */}
            <div className="forgot-password">
              <Link to="/mot-de-passe-oublie" className="forgot-link">
                Mot de passe oublié ?
              </Link>
            </div>

            {/* Bouton de soumission avec loader animé si loading === true */}
            <button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="loader"></span> Connexion en cours...
                </>
              ) : (
                "Se connecter"
              )}
            </button>

          </form>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
