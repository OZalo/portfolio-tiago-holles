import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
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
        padding: '0 20px', 
        textAlign: 'center',
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ 
            color: '#ffffff', 
            marginBottom: '60px', 
            fontSize: '1.4rem', 
            letterSpacing: '1px',
            maxWidth: '600px',
            lineHeight: '1.5',
            fontWeight: '300'
          }}
        >
          Estou disponível para novos projetos e colaborações.
        </motion.p>

        <div style={{ display: 'flex', gap: '60px', justifyContent: 'center' }}>
          <motion.a 
            href={config.social.instagram} 
            target="_blank" 
            rel="noreferrer"
            whileHover={{ y: -10, scale: 1.1 }}
            style={{ ...socialIconStyle, color: '#E4405F' }} // Cor base Instagram
          >
            <FaInstagram size={70} />
          </motion.a>
          <motion.a 
            href={config.social.whatsapp} 
            target="_blank" 
            rel="noreferrer"
            whileHover={{ y: -10, scale: 1.1 }}
            style={{ ...socialIconStyle, color: '#25D366' }} // Verde WhatsApp
          >
            <FaWhatsapp size={70} />
          </motion.a>
          <motion.a 
            href={config.social.twitter} 
            target="_blank" 
            rel="noreferrer"
            whileHover={{ y: -10, scale: 1.1 }}
            style={{ ...socialIconStyle, color: '#ffffff' }} // Branco X
          >
            <FaXTwitter size={70} />
          </motion.a>
        </div>
      </main>
    </PageWrapper>
  );
};

const socialIconStyle = {
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none'
};

export default Contact;
