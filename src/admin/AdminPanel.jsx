import React, { useState, useEffect } from "react";
import { fetchProjects, fetchDemos, fetchConfig } from "../services/dataService";
import { uploadJsonToCloudinary } from "../services/dataCloudRaw";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrash, FaArrowUp, FaArrowDown, FaPlus, FaSave, FaTimes, FaMusic, FaThLarge, FaCog, FaEye } from "react-icons/fa";
import PageWrapper from "../Components/PageWrapper";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [demos, setDemos] = useState([]);

  // Importando o fallback local (embora o fetchConfig já o retorne em caso de erro)
  const [config, setConfig] = useState({
    title: "Sobre Mim",
    image: "",
    text: ""
  });
  
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
        const [pData, dData, cData] = await Promise.all([
          fetchProjects(),
          fetchDemos(),
          fetchConfig()
        ]);

        setProjects(pData);
        setDemos(dData);

        // Agora cData contém o objeto completo { title, image, text }
        if (cData && cData.text) {
          setConfig(cData);
        }
      } catch (err) {
        console.error("Erro ao carregar:", err);
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
      } else if (activeTab === "demos") {
        await uploadJsonToCloudinary("demos", demos);
      } else {
        // Ao salvar aqui, o arquivo "aboutMeData.json" é criado na sua Cloudinary.
        await uploadJsonToCloudinary("about", config);
      }
      alert("Salvo com sucesso!");
    } catch (err) {
      alert("Erro ao salvar: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ... (resto das funções de movimentação e edição que já funcionam)
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
      if (activeTab === "projects") setProjects(projects.filter(p => p.id !== id));
      else setDemos(demos.filter(d => d.id !== id));
    }
  };

  const handleEdit = (item) => {
    let updatedItem = { ...item };
    if (!updatedItem.content.blocks) {
      const blocks = [];
      const c = updatedItem.content;
      if (c.firstText) blocks.push({ type: 'text', value: c.firstText });
      if (c.video || c.upperVideo) blocks.push({ type: 'video', value: c.video || c.upperVideo });
      if (c.firstMedia) blocks.push({ type: 'media', value: c.firstMedia });
      if (c.secondMedia) blocks.push({ type: 'media', value: c.secondMedia });
      if (c.secondText) blocks.push({ type: 'text', value: c.secondText });
      updatedItem.content = { ...c, blocks };
    }
    setEditingItem(updatedItem);
  };

  const addBlock = () => {
    const currentBlocks = editingItem.content.blocks || [];
    setEditingItem({ ...editingItem, content: { ...editingItem.content, blocks: [...currentBlocks, { type: 'text', value: '' }] } });
  };

  const updateBlock = (index, field, value) => {
    const currentBlocks = [...(editingItem.content.blocks || [])];
    currentBlocks[index][field] = value;
    setEditingItem({ ...editingItem, content: { ...editingItem.content, blocks: currentBlocks } });
  };

  const removeBlock = (index) => {
    const currentBlocks = [...(editingItem.content.blocks || [])];
    currentBlocks.splice(index, 1);
    setEditingItem({ ...editingItem, content: { ...editingItem.content, blocks: currentBlocks } });
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
    if (activeTab === "projects") setEditingItem({ category: "vfx / edição", content: { title: "", src: "", blocks: [{ type: 'text', value: '' }] } });
    else setEditingItem({ title: "", url: "" });
  };

  const handleFileUpload = async (e, callback) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setLoading(true);
    try {
      const resSign = await fetch(`/api/cloudSignMedia?cb=${Date.now()}`);
      if (!resSign.ok) throw new Error("Erro ao obter assinatura de upload");
      const { cloudName, apiKey, timestamp, folder, signature } = await resSign.json();

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp);
      formData.append("folder", folder);
      formData.append("signature", signature);

      const resourceType = 'auto'; // Deixa a Cloudinary descobrir se é imagem, vídeo ou áudio
      
      const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) throw new Error("Erro no upload para a Cloudinary");
      const data = await uploadRes.json();
      
      callback(data.secure_url);
    } catch (err) {
      console.error(err);
      alert("Falha no upload: " + err.message);
    } finally {
      setLoading(false);
      // Limpa o input file para permitir o mesmo arquivo se necessário
      e.target.value = null;
    }
  };

  const tabStyle = { backgroundColor: 'transparent', color: '#666', border: 'none', padding: '10px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' };
  const tabActiveStyle = { ...tabStyle, color: '#fff', borderBottom: '2px solid #fff' };
  const btnPrimaryStyle = { backgroundColor: "#fff", color: "#000", border: "none", padding: "10px 20px", borderRadius: "5px", fontWeight: "bold", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" };
  const cardStyle = { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 20px", backgroundColor: "#111", border: "1px solid #222", borderRadius: "8px" };
  const thumbStyle = { width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px" };
  const iconBtnStyle = { background: "#222", border: "none", color: "#fff", padding: "8px", borderRadius: "4px", cursor: "pointer", display: 'flex', alignItems: 'center', justifyContent: 'center' };
  const modalOverlayStyle = { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.8)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 3000 };
  const modalContentStyle = { backgroundColor: "#111", border: "1px solid #333", padding: "30px", borderRadius: "12px", width: "95%", maxWidth: "600px", maxHeight: '90vh', overflowY: 'auto' };
  const inputGroupStyle = { display: "flex", flexDirection: "column", gap: "5px" };
  const inputStyle = { backgroundColor: "#222", border: "1px solid #444", color: "#fff", padding: "10px", borderRadius: "5px", outline: "none", width: '100%' };

  return (
    <PageWrapper>
      <div style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff", padding: "40px 20px" }}>
        {loading && projects.length === 0 ? (
          <div style={{ color: "#fff", padding: "50px", textAlign: "center" }} className="thefont">Carregando...</div>
        ) : (
          <>
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px", borderBottom: "1px solid #222", paddingBottom: "20px" }}>
              <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                <h1 className="thefont" style={{ color: "#fff", margin: 0, fontSize: '1.5rem' }}>PAINEL ADMIN</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => setActiveTab("projects")} style={activeTab === "projects" ? tabActiveStyle : tabStyle}><FaThLarge /> Projetos</button>
                  <button onClick={() => setActiveTab("demos")} style={activeTab === "demos" ? tabActiveStyle : tabStyle}><FaMusic /> Demos</button>
                  <button onClick={() => setActiveTab("config")} style={activeTab === "config" ? tabActiveStyle : tabStyle}><FaCog /> Sobre Mim</button>
                </div>
              </div>
              <div style={{ display: "flex", gap: "15px", flexShrink: 0 }}>
                <button onClick={startAdding} style={{ ...btnPrimaryStyle, whiteSpace: 'nowrap' }}><FaPlus /> Novo {activeTab === "projects" ? "Projeto" : "Áudio"}</button>
                <button onClick={handleSaveAll} style={{ ...btnPrimaryStyle, whiteSpace: 'nowrap' }}><FaSave /> Salvar Alterações</button>
              </div>
            </header>

            <div style={{ display: "grid", gap: "15px" }}>
              {activeTab === "projects" && projects.map((p, index) => (
                <div key={p.id} style={cardStyle}>
                  <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <img src={p.content.src.replace('dkbqg1jiq', 'dje6clroh')} alt="" style={thumbStyle} />
                    <div><strong>{p.content.title}</strong><span style={{ color: "#666", fontSize: "0.8rem", marginLeft: '10px' }}>{p.category}</span></div>
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button onClick={() => moveItem(index, -1, "projects")} style={iconBtnStyle} disabled={index === 0}><FaArrowUp /></button>
                    <button onClick={() => moveItem(index, 1, "projects")} style={iconBtnStyle} disabled={index === projects.length - 1}><FaArrowDown /></button>
                    <button onClick={() => handleEdit(p)} style={iconBtnStyle}><FaEdit /></button>
                    <button onClick={() => deleteItem(p.id)} style={{ ...iconBtnStyle, color: "#ff4444" }}><FaTrash /></button>
                  </div>
                </div>
              ))}
              {activeTab === "demos" && demos.map((d, index) => (
                <div key={d.id} style={cardStyle}>
                  <div style={{ display: "flex", alignItems: "center", gap: "20px" }}><FaMusic /><strong>{d.title}</strong></div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button onClick={() => moveItem(index, -1, "demos")} style={iconBtnStyle} disabled={index === 0}><FaArrowUp /></button>
                    <button onClick={() => moveItem(index, 1, "demos")} style={iconBtnStyle} disabled={index === demos.length - 1}><FaArrowDown /></button>
                    <button onClick={() => setEditingItem(d)} style={iconBtnStyle}><FaEdit /></button>
                    <button onClick={() => deleteItem(d.id)} style={{ ...iconBtnStyle, color: "#ff4444" }}><FaTrash /></button>
                  </div>
                </div>
              ))}
              {activeTab === "config" && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                  <div style={{ ...cardStyle, flexDirection: 'column', alignItems: 'flex-start', gap: '20px', padding: '30px' }}>
                    <div style={{ width: '100%', ...inputGroupStyle }}>
                      <label>Título</label>
                      <input style={inputStyle} value={config.title || ""} onChange={(e) => setConfig({ ...config, title: e.target.value })} />
                    </div>
                    <div style={{ width: '100%', ...inputGroupStyle }}>
                      <label>Imagem URL</label>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <input style={inputStyle} value={config.image || ""} onChange={(e) => setConfig({ ...config, image: e.target.value })} />
                        <label style={{ ...btnPrimaryStyle, cursor: 'pointer', whiteSpace: 'nowrap', margin: 0, fontSize: '0.8rem', padding: '10px' }}>
                          ☁️ Upload
                          <input type="file" style={{ display: 'none' }} accept="image/*" onChange={e => handleFileUpload(e, url => setConfig({ ...config, image: url }))} />
                        </label>
                      </div>
                    </div>
                    <div style={{ width: '100%', ...inputGroupStyle }}>
                      <label>Texto Principal</label>
                      <textarea style={{ ...inputStyle, minHeight: '300px' }} value={config.text || ""} onChange={(e) => setConfig({ ...config, text: e.target.value })} />
                    </div>
                  </div>
                  <div style={{ ...cardStyle, flexDirection: 'column', alignItems: 'flex-start', gap: '20px', padding: '30px', backgroundColor: '#050505', overflowY: 'auto', maxHeight: '700px' }}>
                    <h2 className="thefont" style={{ color: '#fff', fontSize: '2rem', textTransform: 'uppercase', margin: 0 }}>{config.title}</h2>
                    {config.image && <img src={config.image} alt="Sobre" style={{ width: '100%', borderRadius: '8px', maxHeight: '250px', objectFit: 'cover' }} />}
                    <div style={{ color: '#ccc', lineHeight: '1.8', whiteSpace: 'pre-wrap', textAlign: 'justify' }}>{config.text}</div>
                  </div>
                </div>
              )}
            </div>

            <AnimatePresence>
              {(editingItem || isAdding) && (
                <div style={modalOverlayStyle}>
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} style={modalContentStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
                      <h2 className="thefont">{isAdding ? "Novo" : "Editar"}</h2>
                      <button onClick={() => { setEditingItem(null); setIsAdding(false); }} style={{ background: 'none', border: 'none', color: '#fff' }}><FaTimes size={24} /></button>
                    </div>
                    <form onSubmit={handleSubmit} style={{ display: "grid", gap: "15px" }}>
                      {activeTab === "projects" ? (
                        <>
                          <div style={inputGroupStyle}><label>Título</label><input style={inputStyle} value={editingItem?.content?.title || ""} onChange={e => setEditingItem({ ...editingItem, content: { ...editingItem.content, title: e.target.value } })} required /></div>
                          <div style={inputGroupStyle}>
                            <label>Capa URL</label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                              <input style={inputStyle} value={editingItem?.content?.src || ""} onChange={e => setEditingItem({ ...editingItem, content: { ...editingItem.content, src: e.target.value } })} required />
                              <label style={{ ...btnPrimaryStyle, cursor: 'pointer', whiteSpace: 'nowrap', margin: 0, fontSize: '0.8rem', padding: '10px' }}>
                                ☁️ Upload
                                <input type="file" style={{ display: 'none' }} accept="image/*,video/*" onChange={e => handleFileUpload(e, url => setEditingItem({ ...editingItem, content: { ...editingItem.content, src: url } }))} />
                              </label>
                            </div>
                          </div>
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
                                    <textarea style={{ ...inputStyle, minHeight: '80px' }} value={block.value} onChange={e => updateBlock(bIdx, 'value', e.target.value)} />
                                  ) : (
                                    <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                                      <input style={inputStyle} value={block.value} onChange={e => updateBlock(bIdx, 'value', e.target.value)} />
                                      <label style={{ ...btnPrimaryStyle, cursor: 'pointer', whiteSpace: 'nowrap', margin: 0, fontSize: '0.8rem', padding: '10px' }}>
                                        ☁️ Upload
                                        <input type="file" style={{ display: 'none' }} accept="image/*,video/*" onChange={e => handleFileUpload(e, url => updateBlock(bIdx, 'value', url))} />
                                      </label>
                                    </div>
                                  )}
                                </div>
                              ))}
                              <button type="button" onClick={addBlock} style={{ ...btnPrimaryStyle, fontSize: '0.8rem', padding: '5px', justifyContent: 'center', backgroundColor: '#222', color: '#fff', border: '1px solid #444' }}>+ Adicionar Bloco</button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div style={inputGroupStyle}><label>Título do Áudio</label><input style={inputStyle} value={editingItem?.title || ""} onChange={e => setEditingItem({ ...editingItem, title: e.target.value })} required /></div>
                          <div style={inputGroupStyle}>
                            <label>URL do Áudio</label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                              <input style={inputStyle} value={editingItem?.url || ""} onChange={e => setEditingItem({ ...editingItem, url: e.target.value })} required />
                              <label style={{ ...btnPrimaryStyle, cursor: 'pointer', whiteSpace: 'nowrap', margin: 0, fontSize: '0.8rem', padding: '10px' }}>
                                ☁️ Upload
                                <input type="file" style={{ display: 'none' }} accept="audio/*,video/*" onChange={e => handleFileUpload(e, url => setEditingItem({ ...editingItem, url: url }))} />
                              </label>
                            </div>
                          </div>
                        </>
                      )}
                      <button type="submit" style={btnPrimaryStyle}>Salvar</button>
                    </form>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </PageWrapper>
  );
}
