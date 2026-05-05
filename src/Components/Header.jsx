import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link, useLocation } from 'react-router-dom';
import { fetchConfig } from '../services/dataService';

const Header = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [config, setConfig] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    fetchConfig().then(setConfig);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = width <= 768;
  if (!config) return null;

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'SOBRE MIM', path: '/sobre' },
    { name: 'DEMO DE VOZ', path: '/demo' },
    { name: 'CONTATOS', path: '/contato' }
  ];

  return (
    <header style={{
      padding: '40px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
      backgroundColor: '#111',
      borderBottom: '1px solid #333',
      position: 'relative',
      zIndex: 1100
    }}>
      <div style={{ textAlign: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 className='thefont' style={{
            fontSize: isMobile ? '2.2rem' : '3.5rem',
            color: '#ffffff',
            textTransform: 'uppercase',
            letterSpacing: '6px',
            margin: 0,
            textShadow: '0 0 15px rgba(255, 255, 255, 0.3)'
          }}>
            Tiago Holles
          </h1>
        </Link>
        <p className='thefont' style={{
          fontSize: '0.8rem',
          color: '#888',
          letterSpacing: '3px',
          margin: '5px 0 0 0',
          textTransform: 'uppercase'
        }}>
          EDIÇÃO | MMV | DUBLAGEM | VFX
        </p>
      </div>

      <div style={{
        display: 'flex',
        gap: '20px',
        position: isMobile ? 'static' : 'absolute',
        right: '40px',
        top: '50%',
        transform: isMobile ? 'none' : 'translateY(-50%)'
      }}>
        <motion.a href={config.social.instagram} target="_blank" whileHover={{ scale: 1.2, color: '#ffffff' }} style={{ color: 'white' }}>
          <FaInstagram size={22} />
        </motion.a>
        <motion.a href={config.social.whatsapp} target="_blank" whileHover={{ scale: 1.2, color: '#ffffff' }} style={{ color: 'white' }}>
          <FaWhatsapp size={22} />
        </motion.a>
        <motion.a href={config.social.twitter} target="_blank" whileHover={{ scale: 1.2, color: '#ffffff' }} style={{ color: 'white' }}>
          <FaXTwitter size={22} />
        </motion.a>
      </div>

      <nav style={{
        display: 'flex',
        gap: '30px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: '1000px',
        marginTop: '10px'
      }}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              color: location.pathname === item.path ? '#ffffff' : '#aaa',
              textDecoration: 'none',
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              letterSpacing: '2px',
              borderBottom: location.pathname === item.path ? '1px solid #fff' : 'none',
              paddingBottom: '3px'
            }}
          >
            <motion.span whileHover={{ scale: 1.1 }}>{item.name}</motion.span>
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
