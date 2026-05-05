import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Modal, CloseButton } from 'react-bootstrap';
import { fetchProjects } from '../services/dataService';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProjectGrid = () => {
  const [contentArray, setContentArray] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedContent, setselectedContent] = useState({});
  const [width, setWidth] = useState(window.innerWidth);
  const [hoveredIndex, setHoveredIndex] = useState(null);

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
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            whileTap={{ scale: 0.98 }}
            style={{ 
              aspectRatio: '1/1', 
              width: '100%',
              overflow: 'hidden',
              backgroundColor: '#111',
              position: 'relative',
              cursor: 'pointer'
            }}
            onClick={() => handleCardClick(item.content)}
          >
            <motion.img
              animate={{ scale: hoveredIndex === index ? 1.05 : 1 }}
              transition={{ duration: 0.4 }}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              src={fixCloudinaryUrl(item.content.src)}
              alt={item.content.title}
            />
            
            {/* Overlay com Título no Hover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.4)', // Overlay suave, não muito cinza
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                textAlign: 'center'
              }}
            >
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: hoveredIndex === index ? 0 : 10, opacity: hoveredIndex === index ? 1 : 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
              >
                <h3 className='thefont' style={{ 
                  color: '#fff', 
                  fontSize: '1.2rem', 
                  margin: 0,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontWeight: 'bold',
                  textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                }}>
                  {item.content.title}
                </h3>
                <div style={{ 
                  width: '30px', 
                  height: '2px', 
                  backgroundColor: '#fff', 
                  margin: '10px auto 0' 
                }} />
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <Modal 
        centered 
        size='xl' 
        show={showModal} 
        onHide={() => setShowModal(false)}
        contentClassName='bg-dark text-white'
      >
        <Modal.Header style={{ backgroundColor: '#040509', borderBottom: '1px solid #111' }}>
          <Modal.Title className='thefont' style={{ color: '#fff' }}>{selectedContent.title}</Modal.Title>
          <CloseButton onClick={() => setShowModal(false)} variant='white' />
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#040509', padding: '30px' }}>
          
          {selectedContent.blocks ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {selectedContent.blocks.map((block, idx) => {
                if (block.type === 'text') {
                  return (
                    <p key={idx} className='thefont' style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ccc', textAlign: 'justify', margin: 0 }}>
                      {block.value}
                    </p>
                  );
                }
                if (block.type === 'video') {
                  return (
                    <div key={idx} style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
                      <div style={{ position: 'relative', paddingTop: '56.25%', backgroundColor: '#000', borderRadius: '8px', overflow: 'hidden' }}>
                        <iframe 
                          title="Vídeo do Projeto"
                          src={block.value} 
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                          frameBorder="0" 
                          allowFullScreen
                        />
                      </div>
                    </div>
                  );
                }
                if (block.type === 'media') {
                  return (
                    <div key={idx} style={{ textAlign: 'center' }}>
                      <img src={fixCloudinaryUrl(block.value)} style={{ maxWidth: '80%', borderRadius: '8px' }} alt="Mídia" />
                    </div>
                  );
                }
                return null;
              })}
            </div>
          ) : (
            <>
              <div style={{ marginBottom: '30px' }}>
                <p className='thefont' style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ccc', textAlign: 'justify', margin: 0 }}>
                  {selectedContent.firstText}
                </p>
              </div>
              {(selectedContent.video || selectedContent.upperVideo) && (
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
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
              {(selectedContent.firstMedia || selectedContent.secondMedia) && (
                <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
                  {selectedContent.firstMedia && <img src={fixCloudinaryUrl(selectedContent.firstMedia)} style={{ maxWidth: '80%', borderRadius: '8px' }} alt="Mídia" />}
                  {selectedContent.secondMedia && <img src={fixCloudinaryUrl(selectedContent.secondMedia)} style={{ maxWidth: '80%', borderRadius: '8px' }} alt="Mídia" />}
                </div>
              )}
              {selectedContent.secondText && <p className='thefont' style={{ fontSize: '1.1rem', marginTop: '30px', color: '#ccc' }}>{selectedContent.secondText}</p>}
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProjectGrid;
