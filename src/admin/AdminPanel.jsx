import React, { useState, useEffect } from "react";
import { fetchProjects, fetchDemos } from "../services/dataService";
import { uploadJsonToCloudinary } from "../services/dataCloudRaw";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrash, FaArrowUp, FaArrowDown, FaPlus, FaSave, FaTimes, FaMusic, FaThLarge } from "react-icons/fa";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [demos, setDemos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = sessionStorage.getItem("isAdmin");
    if (!isAdmin) {
      navigate("/login");
      return;
    }

    const loadData = async () => {
      setLoading(true);
      try {
        const pData = await fetchProjects();
        const dData = await fetchDemos();
        setProjects(pData);
        setDemos(dData);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [navigate]);

  const handleSaveAll = async () => {
    setLoading(true);
    try {
      if (activeTab === "projects") {
        await uploadJsonToCloudinary("projects", projects);
      } else {
        await uploadJsonToCloudinary("demos", demos);
      }
      alert("Alterações salvas com sucesso no Cloudinary!");
    } catch (err) {
      alert("Erro ao salvar: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const moveItem = (index, direction, type) => {
    const list = type === "projects" ? [...projects] : [...demos];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= list.length) return;
    [list[index], list[targetIndex]] = [list[targetIndex], list[index]];
    if (type === "projects") setProjects(list);
    else setDemos(list);
  };

  const deleteItem = (id) => {
    if (window.confirm("Tem certeza?")) {
      if (activeTab === "projects") {
        setProjects(projects.filter(p => p.id !== id));
      } else {
        setDemos(demos.filter(d => d.id !== id));
      }
    }
  };

  // Funções para gerenciar BLOCS dentro de um projeto
  const addBlock = () => {
    const currentBlocks = editingItem.content.blocks || [];
    setEditingItem({
      ...editingItem,
      content: { ...editingItem.content, blocks: [...currentBlocks, { type: 'text', value: '' }] }
    });
  };

  const updateBlock = (index, field, value) => {
    const currentBlocks = [...(editingItem.content.blocks || [])];
    currentBlocks[index][field] = value;
    setEditingItem({
      ...editingItem,
      content: { ...editingItem.content, blocks: currentBlocks }
    });
  };

  const removeBlock = (index) => {
    const currentBlocks = [...(editingItem.content.blocks || [])];
    currentBlocks.splice(index, 1);
    setEditingItem({
      ...editingItem,
      content: { ...editingItem.content, blocks: currentBlocks }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === "projects") {
      if (isAdding) {
        const maxId = projects.reduce((max, p) => (p.id > max ? p.id : max), 0);
        setProjects([...projects, { ...editingItem, id: maxId + 1 }]);
      } else {
        setProjects(projects.map(p => p.id === editingItem.id ? editingItem : p));
      }
    } else {
      if (isAdding) {
        const maxId = demos.reduce((max, d) => (d.id > max ? d.id : max), 0);
        setDemos([...demos, { ...editingItem, id: maxId + 1 }]);
      } else {
        setDemos(demos.map(d => d.id === editingItem.id ? editingItem : d));
      }
    }
    setEditingItem(null);
    setIsAdding(false);
  };

  const startAdding = () => {
    setIsAdding(true);
    if (activeTab === "projects") {
      setEditingItem({ category: "vfx / edição", content: { title: "", src: "", blocks: [{ type: 'text', value: '' }] } });
    } else {
      setEditingItem({ title: "", url: "" });
    }
  };

  if (loading && projects.length === 0) return <div style={{ color: "#fff", padding: "50px", textAlign: "center" }} className="thefont">Carregando Painel...</div>;

  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff", padding: "40px 20px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px", borderBottom: "1px solid #222", paddingBottom: "20px" }}>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <h1 className="thefont" style={{ color: "#fff", margin: 0, fontSize: '1.5rem' }}>PAINEL ADMIN</h1>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => setActiveTab("projects")} style={activeTab === "projects" ? tabActiveStyle : tabStyle}><FaThLarge /> Projetos</button>
            <button onClick={() => setActiveTab("demos")} style={activeTab === "demos" ? tabActiveStyle : tabStyle}><FaMusic /> Demos de Voz</button>
          </div>
        </div>

        <div style={{ display: "flex", gap: "15px" }}>
          <button onClick={startAdding} style={btnPrimaryStyle}><FaPlus /> Novo {activeTab === "projects" ? "Projeto" : "Áudio"}</button>
          <button onClick={handleSaveAll} style={btnSecondaryStyle}><FaSave /> Salvar {activeTab === "projects" ? "Projetos" : "Demos"}</button>
        </div>
      </header>

      <div style={{ display: "grid", gap: "15px" }}>
        {activeTab === "projects" ? (
          projects.map((p, index) => (
            <motion.div layout key={p.id} style={cardStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <img src={p.content.src.replace('dkbqg1jiq', 'dje6clroh')} alt="" style={thumbStyle} />
                <div>
                  <strong style={{ fontSize: "1.1rem" }}>{p.content.title}</strong>
                  <span style={{ color: "#666", fontSize: "0.8rem", marginLeft: '10px' }}>{p.category}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => moveItem(index, -1, "projects")} style={iconBtnStyle} disabled={index === 0}><FaArrowUp /></button>
                <button onClick={() => moveItem(index, 1, "projects")} style={iconBtnStyle} disabled={index === projects.length - 1}><FaArrowDown /></button>
                <button onClick={() => setEditingItem(p)} style={iconBtnStyle}><FaEdit /></button>
                <button onClick={() => deleteItem(p.id)} style={{ ...iconBtnStyle, color: "#ff4444" }}><FaTrash /></button>
              </div>
            </motion.div>
          ))
        ) : (
          demos.map((d, index) => (
            <motion.div layout key={d.id} style={cardStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <div style={{ backgroundColor: '#222', padding: '10px', borderRadius: '50%' }}><FaMusic color="#fff" /></div>
                <div>
                  <strong style={{ fontSize: "1.1rem" }}>{d.title}</strong>
                  <span style={{ color: "#666", fontSize: "0.8rem", display: 'block' }}>{d.url}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => moveItem(index, -1, "demos")} style={iconBtnStyle} disabled={index === 0}><FaArrowUp /></button>
                <button onClick={() => moveItem(index, 1, "demos")} style={iconBtnStyle} disabled={index === demos.length - 1}><FaArrowDown /></button>
                <button onClick={() => setEditingItem(d)} style={iconBtnStyle}><FaEdit /></button>
                <button onClick={() => deleteItem(d.id)} style={{ ...iconBtnStyle, color: "#ff4444" }}><FaTrash /></button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <AnimatePresence>
        {(editingItem || isAdding) && (
          <div style={modalOverlayStyle}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} style={modalContentStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
                <h2 className="thefont" style={{ color: "#fff", margin: 0 }}>{isAdding ? "Adicionar" : "Editar"} {activeTab === "projects" ? "Projeto" : "Demo"}</h2>
                <button onClick={() => { setEditingItem(null); setIsAdding(false); }} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><FaTimes size={24} /></button>
              </div>

              <form onSubmit={handleSubmit} style={{ display: "grid", gap: "15px" }}>
                {activeTab === "projects" ? (
                  <>
                    <div style={inputGroupStyle}><label>Título</label><input style={inputStyle} value={editingItem?.content?.title || ""} onChange={e => setEditingItem({ ...editingItem, content: { ...editingItem.content, title: e.target.value } })} required /></div>
                    <div style={inputGroupStyle}><label>Capa URL</label><input style={inputStyle} value={editingItem?.content?.src || ""} onChange={e => setEditingItem({ ...editingItem, content: { ...editingItem.content, src: e.target.value } })} required /></div>
                    <div style={inputGroupStyle}><label>Categoria</label><input style={inputStyle} value={editingItem?.category || ""} onChange={e => setEditingItem({ ...editingItem, category: e.target.value })} /></div>

                    {/* GERENCIADOR DE BLOCOS (RESTAURADO) */}
                    <div style={{ marginTop: '10px', borderTop: '1px solid #333', paddingTop: '15px' }}>
                      <label style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '10px', display: 'block' }}>Blocos de Conteúdo</label>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {(editingItem.content.blocks || []).map((block, bIdx) => (
                          <div key={bIdx} style={{ backgroundColor: '#181818', padding: '10px', borderRadius: '5px', border: '1px solid #222' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                              <select value={block.type} onChange={e => updateBlock(bIdx, 'type', e.target.value)} style={{ backgroundColor: '#333', color: '#fff', border: 'none', padding: '2px 5px', borderRadius: '3px', fontSize: '0.7rem' }}>
                                <option value="text">Texto</option>
                                <option value="video">Vídeo</option>
                                <option value="media">GIF/Mídia</option>
                              </select>
                              <button type="button" onClick={() => removeBlock(bIdx)} style={{ color: '#ff4444', background: 'none', border: 'none', cursor: 'pointer' }}><FaTrash size={10} /></button>
                            </div>
                            {block.type === 'text' ? (
                              <textarea style={inputStyle} value={block.value} onChange={e => updateBlock(bIdx, 'value', e.target.value)} />
                            ) : (
                              <input style={inputStyle} value={block.value} onChange={e => updateBlock(bIdx, 'value', e.target.value)} />
                            )}
                          </div>
                        ))}
                        <button type="button" onClick={addBlock} style={{ ...btnSecondaryStyle, fontSize: '0.8rem', padding: '5px' }}>+ Adicionar Bloco</button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={inputGroupStyle}><label>Título do Áudio</label><input style={inputStyle} value={editingItem?.title || ""} onChange={e => setEditingItem({ ...editingItem, title: e.target.value })} required /></div>
                    <div style={inputGroupStyle}><label>URL do Arquivo</label><input style={inputStyle} value={editingItem?.url || ""} onChange={e => setEditingItem({ ...editingItem, url: e.target.value })} required /></div>
                  </>
                )}
                <button type="submit" style={{ ...btnPrimaryStyle, justifyContent: 'center', marginTop: '20px' }}>Salvar Alterações</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {loading && <div style={loadingOverlayStyle}>Aguarde...</div>}
    </div>
  );
}

// Estilos
const tabStyle = { backgroundColor: 'transparent', color: '#666', border: 'none', padding: '10px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' };
const tabActiveStyle = { ...tabStyle, color: '#fff', borderBottom: '2px solid #fff' };
const btnPrimaryStyle = { backgroundColor: "#fff", color: "#000", border: "none", padding: "10px 20px", borderRadius: "5px", fontWeight: "bold", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" };
const btnSecondaryStyle = { backgroundColor: "#222", color: "#fff", border: "1px solid #444", padding: "10px 20px", borderRadius: "5px", fontWeight: "bold", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" };
const cardStyle = { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 20px", backgroundColor: "#111", border: "1px solid #222", borderRadius: "8px" };
const thumbStyle = { width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px" };
const iconBtnStyle = { background: "#222", border: "none", color: "#fff", padding: "8px", borderRadius: "4px", cursor: "pointer", display: 'flex', alignItems: 'center', justifyContent: 'center' };
const modalOverlayStyle = { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.9)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 };
const modalContentStyle = { backgroundColor: "#111", border: "1px solid #333", padding: "30px", borderRadius: "12px", width: "95%", maxWidth: "600px", maxHeight: '90vh', overflowY: 'auto' };
const inputGroupStyle = { display: "flex", flexDirection: "column", gap: "5px" };
const inputStyle = { backgroundColor: "#222", border: "1px solid #444", color: "#fff", padding: "10px", borderRadius: "5px", outline: "none", width: '100%' };
const loadingOverlayStyle = { position: "fixed", bottom: "20px", right: "20px", backgroundColor: "#fff", color: "#000", padding: "10px 20px", borderRadius: "5px", fontWeight: "bold", zIndex: 2000 };
