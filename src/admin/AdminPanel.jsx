import React, { useState, useEffect } from "react";
import { fetchProjects } from "../services/dataService";
import { uploadJsonToCloudinary } from "../services/dataCloudRaw";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrash, FaArrowUp, FaArrowDown, FaPlus, FaSave, FaTimes } from "react-icons/fa";

export default function AdminPanel() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = sessionStorage.getItem("isAdmin");
    if (!isAdmin) {
      navigate("/login");
      return;
    }

    const loadData = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        console.error("Erro ao carregar projetos:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [navigate]);

  const handleSaveAll = async (updatedList) => {
    setLoading(true);
    try {
      await uploadJsonToCloudinary("projects", updatedList || projects);
      alert("Alterações salvas com sucesso no Cloudinary! Se não mudar na hora, tente abrir o site em uma aba anônima.");
      
      // Recarregar os dados do servidor para confirmar
      const data = await fetchProjects();
      setProjects(data);
    } catch (err) {
      alert("Erro ao salvar: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const moveProject = (index, direction) => {
    const newList = [...projects];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newList.length) return;

    [newList[index], newList[targetIndex]] = [newList[targetIndex], newList[index]];
    setProjects(newList);
  };

  const deleteProject = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este projeto?")) {
      const newList = projects.filter(p => p.id !== id);
      setProjects(newList);
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const newList = projects.map(p => p.id === editingProject.id ? editingProject : p);
    setProjects(newList);
    setEditingProject(null);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const maxId = projects.reduce((max, p) => (p.id > max ? p.id : max), 0);
    const newEntry = {
      ...editingProject,
      id: maxId + 1
    };
    setProjects([...projects, newEntry]);
    setIsAdding(false);
    setEditingProject(null);
  };

  const startAdding = () => {
    setIsAdding(true);
    setEditingProject({
      category: "vfx / edição",
      content: { title: "", src: "", video: "", firstText: "", firstMedia: "" }
    });
  };

  if (loading && projects.length === 0) return <div style={{ color: "#00d2ff", padding: "50px", textAlign: "center" }} className="thefont">Carregando Painel...</div>;

  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff", padding: "40px 20px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px", borderBottom: "1px solid #222", paddingBottom: "20px" }}>
        <h1 className="thefont" style={{ color: "#00d2ff", margin: 0 }}>Gerenciar Projetos</h1>
        <div style={{ display: "flex", gap: "15px" }}>
          <button
            onClick={startAdding}
            style={{ backgroundColor: "#00d2ff", color: "#000", border: "none", padding: "10px 20px", borderRadius: "5px", fontWeight: "bold", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
          >
            <FaPlus /> Novo Projeto
          </button>
          <button
            onClick={() => handleSaveAll()}
            style={{ backgroundColor: "#222", color: "#00d2ff", border: "1px solid #00d2ff", padding: "10px 20px", borderRadius: "5px", fontWeight: "bold", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
          >
            <FaSave /> Salvar Alterações
          </button>
        </div>
      </header>

      <div style={{ display: "grid", gap: "15px" }}>
        {projects.map((p, index) => (
          <motion.div
            layout
            key={p.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "15px 20px",
              backgroundColor: "#111",
              border: "1px solid #222",
              borderRadius: "8px"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <img
                src={p.content.src.replace('dkbqg1jiq', 'dje6clroh')}
                alt=""
                style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "4px", border: "1px solid #333" }}
              />
              <div>
                <strong style={{ fontSize: "1.1rem", display: "block" }}>{p.content.title}</strong>
                <span style={{ color: "#666", fontSize: "0.8rem", textTransform: "uppercase" }}>{p.category}</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <button onClick={() => moveProject(index, -1)} style={iconBtnStyle} disabled={index === 0}><FaArrowUp /></button>
              <button onClick={() => moveProject(index, 1)} style={iconBtnStyle} disabled={index === projects.length - 1}><FaArrowDown /></button>
              <button onClick={() => setEditingProject(p)} style={{ ...iconBtnStyle, color: "#00d2ff" }}><FaEdit /></button>
              <button onClick={() => deleteProject(p.id)} style={{ ...iconBtnStyle, color: "#ff4444" }}><FaTrash /></button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal de Edição / Adição */}
      <AnimatePresence>
        {(editingProject || isAdding) && (
          <div style={modalOverlayStyle}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={modalContentStyle}
            >
              <header style={{ display: "flex", justifyContent: "space-between", marginBottom: "25px" }}>
                <h2 className="thefont" style={{ color: "#00d2ff", margin: 0 }}>{isAdding ? "Novo Projeto" : "Editar Projeto"}</h2>
                <button onClick={() => { setEditingProject(null); setIsAdding(false); }} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}><FaTimes size={24} /></button>
              </header>

              <form onSubmit={isAdding ? handleAddSubmit : handleEditSubmit} style={{ display: "grid", gap: "15px" }}>
                <div style={inputGroupStyle}>
                  <label>Título do Projeto</label>
                  <input
                    style={inputStyle}
                    value={editingProject?.content?.title || ""}
                    onChange={e => setEditingProject({ ...editingProject, content: { ...editingProject.content, title: e.target.value } })}
                    required
                  />
                </div>
                <div style={inputGroupStyle}>
                  <label>Categoria</label>
                  <input
                    style={inputStyle}
                    value={editingProject?.category || ""}
                    onChange={e => setEditingProject({ ...editingProject, category: e.target.value })}
                  />
                </div>
                <div style={inputGroupStyle}>
                  <label>URL da Imagem de Capa (Quadrado)</label>
                  <input
                    style={inputStyle}
                    value={editingProject?.content?.src || ""}
                    onChange={e => setEditingProject({ ...editingProject, content: { ...editingProject.content, src: e.target.value } })}
                    required
                  />
                </div>
                <div style={inputGroupStyle}>
                  <label>URL do Vídeo (YouTube/Drive)</label>
                  <input
                    style={inputStyle}
                    placeholder="https://www.youtube.com/embed/..."
                    value={editingProject?.content?.video || editingProject?.content?.upperVideo || ""}
                    onChange={e => setEditingProject({ ...editingProject, content: { ...editingProject.content, video: e.target.value } })}
                  />
                </div>
                <div style={inputGroupStyle}>
                  <label>Descrição (Texto Principal)</label>
                  <textarea
                    style={{ ...inputStyle, minHeight: "100px" }}
                    value={editingProject?.content?.firstText || ""}
                    onChange={e => setEditingProject({ ...editingProject, content: { ...editingProject.content, firstText: e.target.value } })}
                  />
                </div>
                <div style={inputGroupStyle}>
                  <label>URL do GIF (Mídia do Modal)</label>
                  <input
                    style={inputStyle}
                    value={editingProject?.content?.firstMedia || ""}
                    onChange={e => setEditingProject({ ...editingProject, content: { ...editingProject.content, firstMedia: e.target.value } })}
                  />
                </div>

                <button type="submit" style={{ backgroundColor: "#00d2ff", color: "#000", border: "none", padding: "15px", borderRadius: "5px", fontWeight: "bold", fontSize: "1rem", cursor: "pointer", marginTop: "10px" }}>
                  {isAdding ? "Adicionar à Lista" : "Confirmar Edição"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {loading && <div style={loadingOverlayStyle}>Salvando...</div>}
    </div>
  );
}

const iconBtnStyle = {
  background: "#222",
  border: "none",
  color: "#fff",
  padding: "8px",
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 0.2s"
};

const modalOverlayStyle = {
  position: "fixed",
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: "rgba(0,0,0,0.9)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
  padding: "20px"
};

const modalContentStyle = {
  backgroundColor: "#111",
  border: "1px solid #333",
  padding: "30px",
  borderRadius: "12px",
  width: "100%",
  maxWidth: "600px",
  maxHeight: "90vh",
  overflowY: "auto"
};

const inputGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "5px"
};

const inputStyle = {
  backgroundColor: "#222",
  border: "1px solid #444",
  color: "#fff",
  padding: "10px",
  borderRadius: "5px",
  outline: "none"
};

const loadingOverlayStyle = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  backgroundColor: "#00d2ff",
  color: "#000",
  padding: "10px 20px",
  borderRadius: "5px",
  fontWeight: "bold",
  zIndex: 2000
};
