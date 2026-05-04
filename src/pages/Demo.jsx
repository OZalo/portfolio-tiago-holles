import React from 'react';
import PageWrapper from '../Components/PageWrapper';

const Demo = () => {
  return (
    <PageWrapper>
      <main style={{ 
        padding: '80px 20px', 
        textAlign: 'center' 
      }}>
        <h2 className='thefont' style={{ color: '#00d2ff', marginBottom: '50px', fontSize: '2.5rem' }}>DEMO DE VOZ</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
          <div style={{ 
            padding: '30px', 
            backgroundColor: '#111', 
            borderRadius: '12px', 
            border: '1px solid #333',
            width: '350px' 
          }}>
            <p style={{ color: '#00d2ff', fontWeight: 'bold', marginBottom: '15px' }}>DEMO COMERCIAL</p>
            <audio controls style={{ width: '100%' }} />
          </div>
          <div style={{ 
            padding: '30px', 
            backgroundColor: '#111', 
            borderRadius: '12px', 
            border: '1px solid #333',
            width: '350px' 
          }}>
            <p style={{ color: '#00d2ff', fontWeight: 'bold', marginBottom: '15px' }}>DEMO PERSONAGEM</p>
            <audio controls style={{ width: '100%' }} />
          </div>
        </div>
      </main>
    </PageWrapper>
  );
};

export default Demo;
