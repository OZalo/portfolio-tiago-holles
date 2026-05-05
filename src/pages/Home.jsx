import ProjectGrid from '../Components/ProjectGrid';
import PageWrapper from '../Components/PageWrapper';

const Home = () => {
  return (
    <PageWrapper>
      <main style={{ marginTop: '20px' }}>
        <ProjectGrid />
      </main>
      <footer style={{ 
        marginTop: '60px', 
        textAlign: 'center', 
        color: '#555', 
        fontSize: '0.8rem',
        padding: '40px 20px',
        borderTop: '1px solid #111'
      }}>
        © 2025 Tiago Holles - All Rights Reserved
      </footer>
    </PageWrapper>
  );
};

export default Home;
