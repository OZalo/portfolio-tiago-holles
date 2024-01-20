import React from 'react'
import { Container, Row, Col, Image, Modal } from 'react-bootstrap'
import fundo from './assets/miscellaneous/background.png'
import firstImage from './assets/squares/firstImage.png'
import secondImage from './assets/squares/secondImage.png'
import thirdImage from './assets/squares/thirdImage.png'
import fourthImage from './assets/squares/fourthImage.png'
import fifthImage from './assets/squares/fifthImage.png'
import sixthImage from './assets/squares/sixthImage.png'
import profile from './assets/miscellaneous/profile.png'
import image1 from './assets/miscellaneous/numero1.png'
import image2 from './assets/miscellaneous/numero3.png'

import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { motion } from "framer-motion"

const mainContainerStyle = {
  height: '200vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  marginTop: '70vh'
}
const imageArray1 = [
  { src: firstImage, title: "Pior Que Dor de Dente"},
  { src: secondImage, title: "História em Dados: As Infinitas Possibilidades do RPG"},
  { src: thirdImage, title: "Reflexo da Maldade"},
]

const imageArray2 = [
  { src: fourthImage, title: "Oficina de Desenho Performática"},
  { src: fifthImage, title: "Canal Grid"},
  { src: sixthImage, title: "Outros Trabalhos"},
]

function App() {
  const [showModal, setShowModal] = React.useState(false)
  const [selectedImage, setSelectedImage] = React.useState('')
  const [selectedTitle, setSelectedTitle] = React.useState('')

  const handleImageClick = (src, title) => {
    setSelectedImage(src)
    setSelectedTitle(title)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }


  return (
    <div style={{ backgroundImage: `url(${fundo})`, height: '250vh', backgroundSize: 'cover', display: 'flex', flexDirection: 'column' }}>

      <Container style={mainContainerStyle}>

          {/* quadrados superiores */}

          <Row className="justify-content-between mb-4 align-items-center">
            {imageArray1.map((image, index) => (
              <Col key={index} className='mx-2'>
                <motion.div  whileHover={{ scale: 1.09, cursor: 'pointer', opacity:0.3 }} whileTap={{ scale: 0.8 }}>
                  <motion.img
                    onClick={() => handleImageClick(image.src, image.title)}
                    src={image.src}
                  />

                </motion.div>
              </Col>
            ))}
        </Row>

        
          {/* Divs inferiores */}

          <Row className="justify-content-between mb-4 align-items-center">
            {imageArray2.map((image, index) => (
              <Col key={index} className='mx-2'>
                <motion.div whileHover={{ scale: 1.09, cursor: 'pointer', opacity:0.3 }} whileTap={{ scale: 0.8 }}>
                  <motion.img
                    onClick={() => handleImageClick(image.src, image.title)}
                    src={image.src}
                  />
                </motion.div>
              </Col>
            ))}
          </Row>

      </Container>

      {/* Footer */}
      
              <div style={{justifyContent:'center',display:'flex',flexDirection:'row', marginTop:150,marginBottom:100}}>

                <Image roundedCircle src={profile}/>
              
                <div style={{marginLeft:100}}>
              
                <h1 style={{marginBottom:20}}>Tiago Holles</h1>
                <h4 style={{maxInlineSize:1000}}>Busco oportunidade de aprender mais na minha área de formação, crescimento profissional e estabilidade no mercado de trabalho, sempre melhorando minhas habilidades de roteiro e edição.</h4>
              
                </div>
              </div>
              <div>

              </div>

      {/* Modal */}
      <Modal centered show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            
            
            <ReactCompareSlider
              itemOne={<ReactCompareSliderImage src={image2} />}
              itemTwo={<ReactCompareSliderImage src={image1} />}
            />

          <img src={selectedImage} fluid />
            
          <iframe src='https://www.youtube.com/embed/rPQUkV3--7c?si=kJV0ZieuoDyS5R3C'></iframe>
        </Modal.Body>
        <Modal.Footer>
        Eu sempre tive vontade de fazer um áudio drama, devido à complexidade do mesmo, e então eu juntei alguns amigos meus para testar como seria fazer um. Esse projeto foi bastante pessoal, mas tinha como objetivo também portifólio para todos que me ajudaram nele, então juntou o útil ao agradável. O proposito do áudio drama e ensinar e descrever o que é o RPG de Mesa, um jogo de tabuleiro em turnos que vem ganhado força cada vez mais nas redes sociais.
        </Modal.Footer>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>


    </div>
  )
}

export default App
