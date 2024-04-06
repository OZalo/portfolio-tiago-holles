import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from "framer-motion";
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { Modal } from 'react-bootstrap';


import fundo from './assets/miscellaneous/background.png'
import firstImage from './assets/squares/firstImage.png'
import secondImage from './assets/squares/secondImage.png'
import thirdImage from './assets/squares/thirdImage.png'
import fourthImage from './assets/squares/fourthImage.png'
import fifthImage from './assets/squares/fifthImage.png'
import sixthImage from './assets/squares/sixthImage.png'
import image1 from './assets/miscellaneous/numero1.png'
import image2 from './assets/miscellaneous/numero3.png'



const imageArray = [
  { src: firstImage, title: "Pior Que Dor de Dente"},
  { src: secondImage, title: "História em Dados: As Infinitas Possibilidades do RPG"},
  { src: thirdImage, title: "Reflexo da Maldade"},
  { src: fourthImage, title: "Oficina de Desenho Performática"},
  { src: fifthImage, title: "Canal Grid"},
  { src: sixthImage, title: "Outros Trabalhos"}
]

const headerStyle = {
  backgroundColor: '#27221e', 
  color: '#fff',  
  display: 'flex', 
  justifyContent: 'space-between', 
  position: 'fixed', 
  top: '0', 
  left: '0', 
  right: '0', 
  zIndex: '1000',
}

const style = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '15px',
    marginLeft: '10px', 
    marginRight: '10px', 
  },
  image: {
    width: '100%',
    height: '100%', 
    borderRadius: '20px'
  },
  textSection: {
    gridColumn: '1 / -1',
    color: 'black',
    padding: '20px',
    textAlign: 'center',
  },
  button: {
    display: 'flex',
    marginTop: '20px',
    padding: '10px',
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};

function App() {
  
  const [showModal, setShowModal] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState('');
  const [selectedTitle, setSelectedTitle] = React.useState('');
  const [width, setWidth] = React.useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  const handleImageClick = (src, title) => {
    setSelectedImage(src);
    setSelectedTitle(title);
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  const isMobile = width <= 768;

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return (
    
    <div style={{backgroundImage: `url(${fundo})`}}>
      <div style={{ paddingBottom: isMobile? 60 : 70}}>
        <nav style={headerStyle}>
          <div>
            <h1 style={{ marginLeft:5 }}>Tiago Holles</h1>
          </div>

          <div style={{display:'flex', flexDirection:'row', marginRight:5}}>

          <i class="fa fa-instagram fa-2x pt-3"/>
          <i class="fa fa-linkedin fa-2x pt-3 mx-4"/>
          <i class="fa fa-youtube fa-2x pt-3"/>

          </div>
        </nav>
      </div>

      <div style={style.container}>
        {imageArray.map((image, index) => (
          <div key={index} className='mx-2'>
            <motion.div  whileHover={{ scale: 1.02, cursor: 'pointer' }} whileTap={{ scale: 0.8 }}>
              <motion.img
                style={style.image}
                onClick={() => handleImageClick(image.src, image.title)}
                src={image.src}
                alt={image.title}
              />
            </motion.div>
          </div>
        ))}
      </div>

      <div style={style.textSection}>
        <h3>
          Olá. Me chamo Tiago Holles, sou editor, roteirista e nos tempos livres dublador. Busco oportunidade de aprender<br />
          mais na minha área de formação, crescimento profissional e estabilidade no mercado de trabalho,<br />
          sempre melhorando minhas habilidades de roteiro, edição e narração.
        </h3>
      </div>

      <div className="d-flex justify-content-center">
        <motion.button
          className='mb-5'
          whileHover={{ scale: 1.02, cursor: 'pointer' }} 
          whileTap={{ scale: 0.8 }} 
          style={style.button}
        > 
          Contato
        </motion.button>
      </div>

      <Modal centered show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactCompareSlider
            itemOne={<ReactCompareSliderImage src={image2} />}
            itemTwo={<ReactCompareSliderImage src={image1} />}
          />
          <img src={selectedImage} style={{width: '100%'}} alt='selected' />
        </Modal.Body>
        <Modal.Footer>
          Eu sempre tive vontade de fazer um áudio drama, devido à complexidade do mesmo, e então eu juntei alguns amigos meus para testar como seria fazer um. Esse projeto foi bastante pessoal, mas tinha como objetivo também portifólio para todos que me ajudaram nele, então juntou o útil ao agradável. O propósito do áudio drama e ensinar e descrever o que é o RPG de Mesa, um jogo de tabuleiro em turnos que vem ganhado força cada vez mais nas redes sociais.
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default App;
