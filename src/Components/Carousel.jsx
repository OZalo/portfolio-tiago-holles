import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Modal, CloseButton } from 'react-bootstrap';
import { fetchProjects } from '../services/dataService';
import 'bootstrap/dist/css/bootstrap.min.css';

const Carousel = () => {
  const [contentArray, setContentArray] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedContent, setselectedContent] = useState({});
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const loadProjects = async () => {
      const data = await fetchProjects();
      setContentArray(data);
    };
    loadProjects();
  }, []);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = width <= 768;

  const handleCardClick = (card) => {
    setselectedContent(card);
    setShowModal(true);
  };

  // Função para garantir que o link do Cloudinary aponte para o seu usuário real
  const fixCloudinaryUrl = (url) => {
    if (!url) return '';
    return url.replace('dkbqg1jiq', 'dje6clroh');
  };

  return (
    <div style={{ 
      width: '100%', 
      marginTop: '10px', 
      backgroundColor: 'black',
      padding: '0 10px',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
        gap: '10px',
        width: '100%'
      }}>
        {contentArray.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02, cursor: 'pointer', zIndex: 2 }}
            whileTap={{ scale: 0.98 }}
            style={{ 
              aspectRatio: '1/1', 
              width: '100%',
              overflow: 'hidden',
              backgroundColor: '#111',
              position: 'relative'
            }}
            onClick={() => handleCardClick(item.content)}
          >
            <motion.img
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              src={fixCloudinaryUrl(item.content.src)}
              alt={item.content.title}
            />
            {/* Overlay com Título em Ciano */}
            <div style={{
              position: 'absolute',
              top: '15px',
              left: '15px',
              color: '#00d2ff',
              fontSize: '0.7rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              textShadow: '1px 1px 3px rgba(0,0,0,0.9)',
              pointerEvents: 'none'
            }}>
              {item.content.title}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Simplificado: Texto + GIFs/Vídeos */}
      <Modal 
        centered 
        size='xl' 
        show={showModal} 
        onHide={() => setShowModal(false)}
        contentClassName='bg-dark text-white'
      >
        <Modal.Header style={{ backgroundColor: '#040509', borderBottom: '1px solid #111' }}>
          <Modal.Title className='thefont' style={{ color: '#00d2ff' }}>{selectedContent.title}</Modal.Title>
          <CloseButton onClick={() => setShowModal(false)} variant='white' />
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#040509', padding: '30px' }}>
          {/* Texto no Topo */}
          <div style={{ marginBottom: '30px' }}>
            <p className='thefont' style={{ 
              fontSize: '1.1rem', 
              lineHeight: '1.8', 
              color: '#ccc',
              textAlign: 'justify',
              margin: 0
            }}>
              {selectedContent.firstText}
            </p>
          </div>

          {/* Vídeo Menor e Centralizado */}
          {(selectedContent.video || selectedContent.upperVideo) && (
            <div style={{ 
              maxWidth: '900px', 
              margin: '0 auto', 
              boxShadow: '0 0 30px rgba(0, 210, 255, 0.1)' 
            }}>
              <div style={{ position: 'relative', paddingTop: '56.25%', backgroundColor: '#000', borderRadius: '8px', overflow: 'hidden' }}>
                <iframe 
                  title="Vídeo do Projeto"
                  src={selectedContent.video || selectedContent.upperVideo} 
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  frameBorder="0" 
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* GIFs ou Mídia Secundária */}
          {(selectedContent.firstMedia || selectedContent.secondMedia) && (
            <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
              {selectedContent.firstMedia && (
                <img src={fixCloudinaryUrl(selectedContent.firstMedia)} style={{ maxWidth: '80%', borderRadius: '8px' }} alt="Mídia" />
              )}
              {selectedContent.secondMedia && (
                <img src={fixCloudinaryUrl(selectedContent.secondMedia)} style={{ maxWidth: '80%', borderRadius: '8px' }} alt="Mídia" />
              )}
            </div>
          )}

          {selectedContent.secondText && (
            <p className='thefont' style={{ fontSize: '1.1rem', marginTop: '30px', color: '#ccc' }}>
              {selectedContent.secondText}
            </p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Carousel;
