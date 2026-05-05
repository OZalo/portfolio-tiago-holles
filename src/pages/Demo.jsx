import React from 'react';
import PageWrapper from '../Components/PageWrapper';

const Demo = () => {
  return (
    <PageWrapper>
      <main style={{ 
        padding: '80px 20px', 
        textAlign: 'center' 
      }}>
        <h2 className='thefont' style={{ color: '#ffffff', marginBottom: '50px', fontSize: '2.5rem', letterSpacing: '4px' }}>DEMO DE VOZ</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
          <div style={{ 
            padding: '30px', 
            backgroundColor: '#111', 
            borderRadius: '12px', 
            border: '1px solid #222',
            width: '350px' 
          }}>
            <p style={{ color: '#ffffff', fontWeight: 'bold', marginBottom: '15px', letterSpacing: '1px' }}>DEMO COMERCIAL</p>
            <audio controls style={{ width: '100%' }} />
          </div>
          <div style={{ 
            padding: '30px', 
            backgroundColor: '#111', 
            borderRadius: '12px', 
            border: '1px solid #222',
            width: '350px' 
          }}>
            <p style={{ color: '#ffffff', fontWeight: 'bold', marginBottom: '15px', letterSpacing: '1px' }}>DEMO PERSONAGEM</p>
            <audio controls style={{ width: '100%' }} />
          </div>
        </div>
      </main>
    </PageWrapper>
  );
};

export default Demo;
