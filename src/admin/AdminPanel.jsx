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
    const listToSave = updatedList || projects;
    console.log("📤 Enviando nova ordem para o Cloudinary:", listToSave.map(p => p.content.title));
    
    setLoading(true);
    try {
      await uploadJsonToCloudinary("projects", listToSave);
      alert("Alterações salvas com sucesso no Cloudinary! Se não mudar na hora, tente abrir o site em uma aba anônima.");
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

  // Funções para gerenciar BLOCS
  const addBlock = () => {
    const currentBlocks = editingProject.content.blocks || [];
    setEditingProject({
      ...editingProject,
      content: {
        ...editingProject.content,
        blocks: [...currentBlocks, { type: 'text', value: '' }]
      }
    });
  };

  const updateBlock = (index, field, value) => {
    const currentBlocks = [...(editingProject.content.blocks || [])];
    currentBlocks[index][field] = value;
    setEditingProject({
      ...editingProject,
      content: { ...editingProject.content, blocks: currentBlocks }
    });
  };

  const removeBlock = (index) => {
    const currentBlocks = [...(editingProject.content.blocks || [])];
    currentBlocks.splice(index, 1);
    setEditingProject({
      ...editingProject,
      content: { ...editingProject.content, blocks: currentBlocks }
    });
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
    const newEntry = { ...editingProject, id: maxId + 1 };
    setProjects([...projects, newEntry]);
    setIsAdding(false);
    setEditingProject(null);
  };

  const startAdding = () => {
    setIsAdding(true);
    setEditingProject({
      category: "vfx / edição",
      content: { title: "", src: "", blocks: [{ type: 'text', value: '' }] }
    });
  };

  if (loading && projects.length === 0) return <div style={{ color: "#00d2ff", padding: "50px", textAlign: "center" }} className="thefont">Carregando Painel...</div>;

  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff", padding: "40px 20px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px", borderBottom: "1px solid #222", paddingBottom: "20px" }}>
        <h1 className="thefont" style={{ color: "#00d2ff", margin: 0 }}>Gerenciar Projetos</h1>
        <div style={{ display: "flex", gap: "15px" }}>
          <button onClick={startAdding} style={btnPrimaryStyle}><FaPlus /> Novo Projeto</button>
          <button onClick={() => handleSaveAll()} style={btnSecondaryStyle}><FaSave /> Salvar Alterações</button>
        </div>
      </header>

      <div style={{ display: "grid", gap: "15px" }}>
        {projects.map((p, index) => (
          <motion.div layout key={p.id} style={cardStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <img src={p.content.src.replace('dkbqg1jiq', 'dje6clroh')} alt="" style={thumbStyle} />
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

      <AnimatePresence>
        {(editingProject || isAdding) && (
          <div style={modalOverlayStyle}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} style={modalContentStyle}>
              <header style={{ display: "flex", justifyContent: "space-between", marginBottom: "25px" }}>
                <h2 className="thefont" style={{ color: "#00d2ff", margin: 0 }}>{isAdding ? "Novo Projeto" : "Editar Projeto"}</h2>
                <button onClick={() => { setEditingProject(null); setIsAdding(false); }} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}><FaTimes size={24}/></button>
              </header>

              <form onSubmit={isAdding ? handleAddSubmit : handleEditSubmit} style={{ display: "grid", gap: "15px" }}>
                <div style={inputGroupStyle}>
                  <label>Título do Projeto</label>
                  <input style={inputStyle} value={editingProject?.content?.title || ""} onChange={e => setEditingProject({...editingProject, content: {...editingProject.content, title: e.target.value}})} required />
                </div>
                <div style={inputGroupStyle}>
                  <label>Categoria</label>
                  <input style={inputStyle} value={editingProject?.category || ""} onChange={e => setEditingProject({...editingProject, category: e.target.value})} />
                </div>
                <div style={inputGroupStyle}>
                  <label>URL da Capa (Quadrado)</label>
                  <input style={inputStyle} value={editingProject?.content?.src || ""} onChange={e => setEditingProject({...editingProject, content: {...editingProject.content, src: e.target.value}})} required />
                </div>

                {/* GERENCIADOR DE BLOCOS DINÂMICOS */}
                <div style={{ marginTop: '20px', borderTop: '1px solid #333', paddingTop: '20px' }}>
                  <h4 style={{ color: '#00d2ff', marginBottom: '15px' }}>Conteúdo Modular do Modal</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {(editingProject.content.blocks || []).map((block, bIdx) => (
                      <div key={bIdx} style={blockContainerStyle}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                          <select value={block.type} onChange={e => updateBlock(bIdx, 'type', e.target.value)} style={selectStyle}>
                            <option value="text">Texto</option>
                            <option value="video">Vídeo (YouTube/Drive)</option>
                            <option value="media">GIF / Mídia</option>
                          </select>
                          <button type="button" onClick={() => removeBlock(bIdx)} style={{ ...iconBtnStyle, color: '#ff4444' }}><FaTrash size={12}/></button>
                        </div>
                        {block.type === 'text' ? (
                          <textarea style={{ ...inputStyle, minHeight: '80px' }} value={block.value} onChange={e => updateBlock(bIdx, 'value', e.target.value)} placeholder="Escreva o texto aqui..." />
                        ) : (
                          <input style={inputStyle} value={block.value} onChange={e => updateBlock(bIdx, 'value', e.target.value)} placeholder={block.type === 'video' ? "https://www.youtube.com/embed/..." : "URL da imagem ou GIF"} />
                        )}
                      </div>
                    ))}
                    <button type="button" onClick={addBlock} style={btnAddBlockStyle}>+ Adicionar Bloco de Conteúdo</button>
                  </div>
                </div>

                <button type="submit" style={btnSubmitStyle}>{isAdding ? "Adicionar à Lista" : "Confirmar Edição"}</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {loading && <div style={loadingOverlayStyle}>Salvando no Cloudinary...</div>}
    </div>
  );
}

// Estilos
const btnPrimaryStyle = { backgroundColor: "#ffffff", color: "#000", border: "none", padding: "10px 20px", borderRadius: "5px", fontWeight: "bold", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" };
const btnSecondaryStyle = { backgroundColor: "#222", color: "#ffffff", border: "1px solid #ffffff", padding: "10px 20px", borderRadius: "5px", fontWeight: "bold", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" };
const cardStyle = { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 20px", backgroundColor: "#111", border: "1px solid #222", borderRadius: "8px" };
const thumbStyle = { width: "60px", height: "60px", objectFit: "cover", borderRadius: "4px", border: "1px solid #333" };
const iconBtnStyle = { background: "#222", border: "none", color: "#fff", padding: "8px", borderRadius: "4px", display: "flex", alignItems: "center", justify: "center", cursor: "pointer" };
const modalOverlayStyle = { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.9)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "20px" };
const modalContentStyle = { backgroundColor: "#111", border: "1px solid #333", padding: "30px", borderRadius: "12px", width: "100%", maxWidth: "700px", maxHeight: "90vh", overflowY: "auto" };
const inputGroupStyle = { display: "flex", flexDirection: "column", gap: "5px" };
const inputStyle = { backgroundColor: "#222", border: "1px solid #444", color: "#fff", padding: "10px", borderRadius: "5px", outline: "none", width: '100%' };
const selectStyle = { backgroundColor: "#333", border: "none", color: "#ffffff", padding: "5px 10px", borderRadius: "4px", fontSize: '0.8rem', fontWeight: 'bold' };
const blockContainerStyle = { backgroundColor: "#181818", padding: "15px", borderRadius: "8px", border: "1px solid #222" };
const btnAddBlockStyle = { backgroundColor: 'transparent', color: '#ffffff', border: '1px dashed #ffffff', padding: '10px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };
const btnSubmitStyle = { backgroundColor: "#ffffff", color: "#000", border: "none", padding: "15px", borderRadius: "5px", fontWeight: "bold", fontSize: "1rem", cursor: "pointer", marginTop: "20px" };
const loadingOverlayStyle = { position: "fixed", bottom: "20px", right: "20px", backgroundColor: "#ffffff", color: "#000", padding: "10px 20px", borderRadius: "5px", fontWeight: "bold", zIndex: 2000 };
