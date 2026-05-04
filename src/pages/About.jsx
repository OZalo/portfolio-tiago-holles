import React from 'react';
import PageWrapper from '../Components/PageWrapper';

const About = () => {
  return (
    <PageWrapper>
      <main style={{ 
        padding: '80px 20px', 
        maxWidth: '800px', 
        margin: '0 auto', 
        textAlign: 'center' 
      }}>
        <h2 className='thefont' style={{ color: '#00d2ff', marginBottom: '40px', fontSize: '2.5rem' }}>SOBRE MIM</h2>
        <div style={{ color: '#ccc', lineHeight: '2', fontSize: '1.2rem', textAlign: 'justify' }}>
          <p>
            Criar para o audiovisual é, acima de tudo, entender o ritmo. Com 6 anos de experiência em edição de vídeo e 2 anos dedicados à engenharia de áudio, foco em edições ágeis e narrativas orgânicas, onde o objetivo é contar uma história simples mas memorável.
          </p>
          <br />
          <p>
            Sou dublador e mixador há 2 anos, e atualmente estou na busca de meu DRT para dublagem, apesar disso já fiz trabalhos interessantes no ramo, tanto na comunidade de fandublagem, quanto no mercado real.
          </p>
        </div>
      </main>
    </PageWrapper>
  );
};

export default About;
