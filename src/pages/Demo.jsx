import React, { useState, useEffect } from 'react';
import PageWrapper from '../Components/PageWrapper';
import AudioPlayer from '../Components/AudioPlayer';
import { fetchDemos } from '../services/dataService';

const Demo = () => {
  const [demos, setDemos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDemos = async () => {
      try {
        const data = await fetchDemos();
        setDemos(data);
      } catch (err) {
        console.error("Erro ao carregar demos:", err);
      } finally {
        setLoading(false);
      }
    };
    loadDemos();
  }, []);

  return (
    <PageWrapper>
      <main style={{ 
        padding: '80px 20px', 
        textAlign: 'center',
        minHeight: '80vh'
      }}>
        <h2 className='thefont' style={{ 
          color: '#ffffff', 
          marginBottom: '50px', 
          fontSize: '2.5rem', 
          letterSpacing: '4px',
          textTransform: 'uppercase' 
        }}>
          Demo de Voz
        </h2>

        {loading ? (
          <p style={{ color: '#666' }} className="thefont">Carregando demos...</p>
        ) : (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: '20px', 
            maxWidth: '1000px',
            margin: '0 auto',
            paddingBottom: '50px'
          }}>
            {demos.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '30px'
              }}>
                {demos.map((demo) => (
                  <AudioPlayer 
                    key={demo.id} 
                    src={demo.url} 
                    title={demo.title} 
                  />
                ))}
              </div>
            ) : (
              <p style={{ color: '#444' }} className="thefont">Nenhuma demo cadastrada ainda.</p>
            )}
          </div>
        )}
      </main>
    </PageWrapper>
  );
};

export default Demo;
