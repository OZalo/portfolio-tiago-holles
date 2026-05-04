import React, { useEffect, useState } from 'react';
import Carousel from './Components/Carousel';
import { motion } from 'framer-motion';
import { FaStar, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { fetchConfig } from './services/dataService';



const App = () => {

  const [width, setWidth] = React.useState(window.innerWidth)

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth)
  }

  const isMobile = width <= 768


  const [config, setConfig] = useState(null);

  useEffect(() => {
    const loadConfig = async () => {
      const data = await fetchConfig();
      setConfig(data);
    };
    loadConfig();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange)
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange)
    }
  }, [])

  if (!config) return null;

  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: 'black', color: 'white', paddingBottom: '50px' }}>
      
      {/* Header Estilo Print */}
      <header style={{ 
        padding: '40px 20px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        gap: '20px',
        backgroundColor: '#111',
        borderBottom: '1px solid #333',
        position: 'relative'
      }}>
        {/* Título e Tagline */}
        <div style={{ textAlign: 'center' }}>
          <h1 className='thefont' style={{ 
            fontSize: isMobile ? '2.2rem' : '3.5rem', 
            color: '#cf0a0a', 
            textTransform: 'uppercase',
            letterSpacing: '6px',
            margin: 0,
            textShadow: '0 0 15px rgba(207, 10, 10, 0.5)'
          }}>
            Tiago Holles
          </h1>
          <p className='thefont' style={{ 
            fontSize: '0.8rem', 
            color: '#888', 
            letterSpacing: '3px', 
            margin: '5px 0 0 0',
            textTransform: 'uppercase' 
          }}>
            EDIÇÃO | AMV | DUBLAGEM | VFX
          </p>
        </div>

        {/* Redes Sociais (Direita no Desktop, Centro no Mobile) */}
        <div style={{ 
          display: 'flex', 
          gap: '20px', 
          position: isMobile ? 'static' : 'absolute',
          right: '40px',
          top: '50%',
          transform: isMobile ? 'none' : 'translateY(-50%)'
        }}>
          <motion.a href={config.social.instagram} target="_blank" whileHover={{ scale: 1.2, color: '#cf0a0a' }} style={{ color: 'white' }}>
            <FaInstagram size={22} />
          </motion.a>
          <motion.a href={config.social.whatsapp} target="_blank" whileHover={{ scale: 1.2, color: '#cf0a0a' }} style={{ color: 'white' }}>
            <FaWhatsapp size={22} />
          </motion.a>
          <motion.a href={config.social.twitter} target="_blank" whileHover={{ scale: 1.2, color: '#cf0a0a' }} style={{ color: 'white' }}>
            <FaXTwitter size={22} />
          </motion.a>
        </div>

        <nav style={{ 
          display: 'flex', 
          gap: '20px', 
          flexWrap: 'wrap', 
          justifyContent: 'center',
          maxWidth: '1000px',
          marginTop: '10px'
        }}>
          {[...Array(10)].map((_, i) => (
            <motion.a
              key={i}
              href="#"
              whileHover={{ color: '#cf0a0a', scale: 1.1 }}
              style={{ 
                color: '#aaa', 
                textDecoration: 'none', 
                fontSize: '0.8rem', 
                textTransform: 'uppercase',
                transition: 'color 0.2s'
              }}
            >
              coisa {i + 1}
            </motion.a>
          ))}
        </nav>
      </header>

      {/* Grid de Projetos */}
      <main style={{ marginTop: '20px' }}>
        <Carousel />
      </main>

      {/* Footer Simples */}
      <footer style={{ 
        marginTop: '60px', 
        textAlign: 'center', 
        color: '#555', 
        fontSize: '0.8rem',
        padding: '20px'
      }}>
        © 2025 Tiago Holles - All Rights Reserved
      </footer>

    </div>
  );
};

export default App;
