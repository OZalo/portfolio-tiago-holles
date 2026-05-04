import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/validateAdmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.ok) {
        sessionStorage.setItem("isAdmin", "true");
        navigate("/admin");
      } else {
        alert("Senha incorreta!");
      }
    } catch (err) {
      console.error("Erro ao logar:", err);
      alert("Erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "black",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white"
    }}>
      <motion.form
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        onSubmit={handleLogin}
        style={{
          background: "#111",
          padding: "40px",
          borderRadius: "12px",
          border: "1px solid #00d2ff",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
          boxShadow: "0 0 30px rgba(0, 210, 255, 0.1)"
        }}
      >
        <h2 className="thefont" style={{ color: "#00d2ff", marginBottom: "30px", letterSpacing: "2px" }}>ADMIN TIAGO</h2>
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            backgroundColor: "#222",
            border: "1px solid #333",
            color: "white",
            borderRadius: "6px",
            outline: "none"
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#00d2ff",
            color: "#000",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.2s"
          }}
        >
          {loading ? "ENTRANDO..." : "ENTRAR NO PAINEL"}
        </button>
      </motion.form>
    </div>
  );
}
