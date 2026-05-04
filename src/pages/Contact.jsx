import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchConfig } from '../services/dataService';
import PageWrapper from '../Components/PageWrapper';

const Contact = () => {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    fetchConfig().then(setConfig);
  }, []);

  if (!config) return null;

  return (
    <PageWrapper>
      <main style={{ 
        padding: '100px 20px', 
        textAlign: 'center' 
      }}>
        <h2 className='thefont' style={{ color: '#00d2ff', marginBottom: '20px', fontSize: '2.5rem' }}>CONTATOS</h2>
        <p style={{ color: '#888', marginBottom: '50px' }}>Estou disponível para novos projetos e colaborações.</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
          <motion.a
            href={config.social.instagram}
            target="_blank"
            whileHover={{ scale: 1.05 }}
            style={{ 
              padding: '20px 40px', 
              border: '2px solid #00d2ff', 
              color: 'white', 
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              letterSpacing: '2px'
            }}
          >
            INSTAGRAM
          </motion.a>
          <motion.a
            href={config.social.whatsapp}
            target="_blank"
            whileHover={{ scale: 1.05 }}
            style={{ 
              padding: '20px 40px', 
              border: '2px solid #25D366', 
              color: 'white', 
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              letterSpacing: '2px'
            }}
          >
            WHATSAPP
          </motion.a>
        </div>
      </main>
    </PageWrapper>
  );
};

export default Contact;
