import React, { useState, useEffect } from 'react';
import PageWrapper from '../Components/PageWrapper';
import { fetchConfig } from '../services/dataService';

const About = () => {
  const [aboutText, setAboutText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAbout = async () => {
      try {
        const data = await fetchConfig();
        if (data && data.aboutText) {
          setAboutText(data.aboutText);
        } else {
          // Texto padrão caso esteja vazio
          setAboutText(`Criar para o audiovisual é, acima de tudo, entender o ritmo. Com 6 anos de experiência em edição de vídeo e 2 anos dedicados à engenharia de áudio, foco em edições ágeis e narrativas orgânicas, onde o objetivo é contar uma história simples mas memorável.\n\nSou dublador e mixador há 2 anos, e atualmente estou na busca de meu DRT para dublagem, apesar disso já fiz trabalhos interessantes no ramo, tanto na comunidade de fandublagem, quanto no mercado real.`);
        }
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
        <h2 className='thefont' style={{ 
          color: '#ffffff', 
          fontSize: '2.5rem', 
          marginBottom: '50px', 
          textTransform: 'uppercase',
          letterSpacing: '4px' 
        }}>
          Sobre Mim
        </h2>

        {loading ? (
          <p style={{ color: '#444' }} className="thefont">Carregando...</p>
        ) : (
          <div style={{ 
            color: '#ccc', 
            lineHeight: '2', 
            fontSize: '1.2rem', 
            textAlign: 'justify',
            whiteSpace: 'pre-wrap' // Mantém as quebras de linha que você fizer no Admin
          }}>
            {aboutText}
          </div>
        )}
      </main>
    </PageWrapper>
  );
};

export default About;
