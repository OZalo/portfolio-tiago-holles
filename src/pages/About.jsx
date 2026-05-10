import React, { useState, useEffect } from 'react';
import PageWrapper from '../Components/PageWrapper';
import { fetchAbout } from '../services/dataService';

const About = () => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAbout = async () => {
      try {
        const data = await fetchAbout();
        setConfig(data);
      } catch (err) {
        console.error("Erro ao carregar sobre:", err);
      } finally {
        setLoading(false);
      }
    };
    loadAbout();
  }, []);

  return (
    <PageWrapper>
      <main style={{ 
        padding: '80px 20px', 
        maxWidth: '800px', 
        margin: '0 auto', 
        textAlign: 'center' 
      }}>
        {loading || !config ? (
          <p style={{ color: '#444' }} className="thefont">Carregando...</p>
        ) : (
          <>
            <h2 className='thefont' style={{ 
              color: '#ffffff', 
              fontSize: '2.5rem', 
              marginBottom: '40px', 
              textTransform: 'uppercase',
              letterSpacing: '4px' 
            }}>
              {config.title || "Sobre Mim"}
            </h2>

            {config.image && (
              <img 
                src={config.image} 
                alt={config.title || "Sobre Mim"} 
                style={{
                  width: '100%',
                  borderRadius: '12px',
                  marginBottom: '40px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  objectFit: 'cover'
                }}
              />
            )}

            <div style={{ 
              color: '#ccc', 
              lineHeight: '2', 
              fontSize: '1.2rem', 
              textAlign: 'justify',
              whiteSpace: 'pre-wrap'
            }}>
              {config.text}
            </div>
          </>
        )}
      </main>
    </PageWrapper>
  );
};

export default About;
