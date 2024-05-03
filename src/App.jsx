import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { motion } from "framer-motion"
import { Modal } from 'react-bootstrap'
import './index.css'
import fundo from './assets/miscellaneous/background.png'

const contentArray = [
  { //video clipe
    content: {
      src: 'https://drive.google.com/thumbnail?id=1Wo9862X0Snb44bilgEOyjJbCK1jsiEij&sz=w1000', 
      title: "Pior Que Dor de Dente",
      firstText: "Pior Que Dor de Dente foi um vídeo clipe feito como projeto final do meu curso de filmmaker, eu contribuo como codiretor, roteirista e editor. O cantor Marcello Wall queria um novo clipe para a sua nova música Pior Que Dor de Dente, que havia sido feita com parcerias e outros aspectos de contrato, ou seja, o mesmo não teve tanta liberdade criativa para com a história, takes de cenas ou roteiro.",
      firstMedia: 'https://drive.google.com/thumbnail?id=19xQy1mMdv991MOuUPfTTKYRHKquXr-Mj&sz=w1000',
      secondText: 'Então, ele aceitou nossa proposta de fazer um clipe para ele como projeto final, o que seria benéfico para ambos os lados. Nós ganhamos uma música conhecida nacionalmente, um cantor de nome e facilidade de locação devido aos contatos do Marcello e ele ganha um clipe novinho saindo do forno. O Marcello queria uma história bem serena como a própria música, mas meio fantasiosa no sentido de encontrar a pessoa perfeita, histórias que terminam com um final feliz apesar dos problemas durante a "aventura"',
      secondMedia: "https://drive.google.com/thumbnail?id=1V1kb6Gph7gj4RiNFVfOYn8ILVrFGEvO8&sz=w1000",
      thirdText: "E apesar dos problemas de locação e da pouca disponibilidade do cantor devido ser muito ocupado, só tivemos 1 dia para gravar o clipe todo, então se não conseguimos alguma cena ela simplesmente não iria existir e não teria como fazer nada a respeito. No fim o clipe foi um sucesso ganhando o Festival de Vídeos Universitários (OSGA), como melhor vídeo clipe em 2023.",
      // thirdMedia: "https://drive.google.com/thumbnail?id=aqui&sz=w1000",
    }
  },
  { //rpg
    content: {
      title: "As infinitas possibilidades do RPG",
      src: 'https://drive.google.com/thumbnail?id=1XS9iVXvWl6Ug27MSm6vOupAOOxhX3UvQ&sz=w1000',
      video: 'https://www.youtube.com/embed/rPQUkV3--7c?si=NTKcl1fRetekRUzK',
      firstText: "Eu tive a oportunidade de fazer um áudio drama como projeto de faculdade, o objetivo aqui é fazer uma partidade de RPG através de uma visão dramatizada de quem está jogando, afinal, ver por fora pessoas jogando RPG, faz o mesmo parecer complexo confuso.",
      firstMedia: 'https://drive.google.com/thumbnail?id=1Lzkh7Dsozq0W7jYMWhCpWWfgZTJDm1VJ&sz=w1000',
      secondText: "Então, tanto em roteiro quanto em uma pequena atuação como Mestre de Mesa, eu tive que transformar uma sessão de RPG em algo fácil de digerir até mesmo para que não sabe nada de mundos medievais fantásticos.",
      secondMedia: "https://drive.google.com/thumbnail?id=1hSJjt4mBdxVIWzmSBICZaWrXrEV4ib-6&sz=w1000",
      thirdText: "Esse projeto foi bastante pessoal, mas tinha como objetivo também portifólio para todos os integrantes que ajudaram nele, então juntou o útil ao agradável. O propósito do áudio drama é ensinar e descrever o que é o RPG de Mesa, um jogo de tabuleiro em turnos que se tornou cada vez mais raro mundo a fora, devido a natureza social que o jogo trás.",
      thirdMedia: "https://drive.google.com/thumbnail?id=12XuLE2sFYRkUGSzAxriXqos9hYhRZXUI&sz=w1000"
    }
  },
  { //reflexo da maldade
    content: {
      src: 'https://drive.google.com/thumbnail?id=1TUAyAVdK77CkFNPmCevg0tF_Lhx4Rp6N&sz=w1000', 
      title: "Curta Metragem",
      firstText: "",
      firstMedia: 'https://drive.google.com/thumbnail?id=aqui&sz=w1000',
      secondText: "",
      secondMedia: "https://drive.google.com/thumbnail?id=aqui&sz=w1000",
      thirdText: "",
      thirdMedia: "https://drive.google.com/thumbnail?id=aqui&sz=w1000",

    }
  },
  { //grid
    content: {
      src: 'https://drive.google.com/thumbnail?id=1NfAOXw8eXqx8bETPA1xdZ2Bi2_hyiwBc&sz=w1000', 
      title: "Grid",
      firstText: "Grid é meu canal do YouTube que tem como objetivo tocar em assuntos aleatórios como treinamento geral de produção, eu sempre busco um assunto que não tem nada a ver com o vídeo passado para me forçar a criar roteiros diferentes, designs novos e propostas de construções de vídeo que eu não posso roubar do vídeo anterior, afinal é bem natural criar um canal no YouTube com uma estética e proposta de construção de vídeo e ir usando ela e todos os vídeos tanto por um padrão quanto por simplicidade de se editar vários vídeos de uma só fez. No fim é apenas um grande playground para eu testar habilidades novas e propostas de vídeo que são usadas mundo a fora e tentar fazer do meu jeito.",
      firstMedia: 'https://drive.google.com/thumbnail?id=1_s5MswiIP6qSMN5C0X6OWKH5KbtLozZQ&sz=w1000',
      secondText: "A parte mais complicada é sempre a construção visual do que você quer. Eu queria passar um ar neutro para quem entrasse no meu canal, através do banner ou títulos dos vídeos. Vocês não sabem qual é o assunto principal desse canal, é uma área aberta para todo tipo de conteúdo.",
      secondMedia: "https://drive.google.com/thumbnail?id=1_s5MswiIP6qSMN5C0X6OWKH5KbtLozZQ&sz=w1000",
    }
  },
  { // motion
    content: {
      src: 'https://drive.google.com/thumbnail?id=1UtDzONkaYtFMxBN5R8aET2jQ5pUK2m8W&sz=w1000', 
      title: "Motion Comics/Mangá",
      firstText: "O objetivo do Motion Comics é trazer movimento para desenhos que não foram planejados para serem animados, porém, ainda valorizando o pouco movimento do próprio desenho, afinal, quanto menos movimento, mais detalhe um desenho pode ter. O sentido geral desse tipo de animação é construir um design, um cenário em volta do desenho que está imóvel, e que isso faça sentido na composição final daquele desenho.",
      firstMedia: 'https://drive.google.com/thumbnail?id=1C2RUAjDy-6pLFAv16GYuktWvc_T1wj8X&sz=w1000',
      secondText: "Você precisa estudar o desenho muito antes de levá-lo a um editor, pois antes de animar, esse desenho precisa ser recortado em detalhes, apenas nas partes que serão animadas ou destacadas com algum efeito posteriormente. Como, por exemplo, a espada do personagem Higuruma, que poderia ser pintada dentro do After Effects (programa usado para essa animação), porém, como eu já tinha certeza de que a cor seria essa, então é menos trabalho e gasto de processamento dentro do editor.",
      secondMedia: "https://drive.google.com/thumbnail?id=1HLtAKiswuVRSmRvBlps4CBeqVkrAJNOn&sz=w1000",
      thirdText: 'É bastante interessante o detalhe de que esse tipo de "animação" não é complicado de ser feita, boa parte dessas animações pode ser feita em poucos minutos, caso queria uma coisa bem polida, talvez horas. O que faz essas animações serem complicadas e caras de se fazer é a construção e sensibilidade do que deve ter movimento e o que não deve ter, o que precisa de cor e o que não precisa. Na minha opinião, para fazer um bom Motion Comics você não precisa ser um bom animador, você precisa ser um bom diretor.',
      thirdMedia: "https://drive.google.com/thumbnail?id=1v3MkN-HHY0STyLY3-oiLHUP47aNP7hjM&sz=w1000",
      fourthMedia: "https://drive.google.com/thumbnail?id=aqui&sz=w1000",
      fifthMedia: "https://drive.google.com/thumbnail?id=aqui&sz=w1000",
      sixthMedia: "https://drive.google.com/thumbnail?id=aqui&sz=w1000",
    }
  },
  { //dublagem
    content: {
      src: 'https://drive.google.com/thumbnail?id=1ixLBKay3bcSIk8xay6bQ-XSOOHTiXvSq&sz=w1000', 
      title: "Dublagem e Tratamento de Aúdio",
      firstText: "",
      firstMedia: 'https://drive.google.com/thumbnail?id=aqui&sz=w1000',
      secondText: "",
      secondMedia: "https://drive.google.com/thumbnail?id=aqui&sz=w1000",
      thirdText: "",
      thirdMedia: "https://drive.google.com/thumbnail?id=aqui&sz=w1000",
    }
  },
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
    gap: '20px',
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
    color: 'white',
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
  modalImage: {
    maxWidth: '90%', 
    height: 'auto',
    display: 'block',
    margin: 'auto',
  },
  modalText: {
    color: 'white', 
    fontSize:24, 
    textAlign:'left', 
    display:'flex', 
    marginTop:30, 
    marginBottom:30
  }
}

function App() {
  const [showModal, setShowModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')
  const [selectedTitle, setSelectedTitle] = useState('')
  const [selectedContent, setSelectedContent] = useState({})
  const [width, setWidth] = useState(window.innerWidth)

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth)
  }

  const handleImageClick = (src, title, content) => {
    setSelectedImage(src)
    setSelectedTitle(title)
    setSelectedContent(content)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const isMobile = width <= 768

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange)
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange)
    }
  }, [])

  return (
    <div style={{ backgroundImage: `url(${fundo})` }}>

      <div style={{ paddingBottom: isMobile ? 60 : 70 }}>
        <nav style={headerStyle}>
          <div>
            <h1 className='thefont' style={{ marginLeft: 5 }}>Tiago Holles</h1>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', marginRight: 5 }}>

            <i
              onClick={() => { window.open('https://www.instagram.com/tiago_holles', '_blank') }}
              className="fa fa-instagram fa-2x pt-3"
              style={{ cursor: 'pointer' }}
            />
            <i className="fa fa-linkedin fa-2x pt-3 mx-4" />
            <i
              onClick={() => { window.open('https://www.youtube.com/@Grid_Zone', '_blank') }}
              className="fa fa-youtube fa-2x pt-3"
              style={{ cursor: 'pointer' }}
            />

          </div>
        </nav>
      </div>

      <div style={style.container}>
        {contentArray.map((image, index) => (
          <div key={index} className='mx-2'>

            <motion.div whileHover={{ scale: 1.02, cursor: 'pointer' }} whileTap={{ scale: 0.8 }}>
              <motion.img
                style={style.image}
                onClick={() => handleImageClick(image.content.src, image.content.title, image.content)}
                src={image.content.src}
                alt={image.content.title}
              />
            </motion.div>

          </div>
        ))}
      </div>

      <div style={style.textSection}>
        <h3 className='thefont'>
          Olá. Me chamo Tiago Holles, sou editor, roteirista e nos tempos livres dublador. Busco oportunidade de aprender<br />
          mais na minha área de formação, crescimento profissional e estabilidade no mercado de trabalho,<br />
          sempre melhorando minhas habilidades de roteiro, edição e narração.
        </h3>
      </div>

      <div className="d-flex justify-content-center">
        <motion.button
          className='mb-5 thefont'
          whileHover={{ scale: 1.02, cursor: 'pointer' }}
          whileTap={{ scale: 0.8 }}
          style={style.button}
          onClick={() => { window.open('https://www.instagram.com/tiago_holles', '_blank') }}
        >
          Contato
        </motion.button>
      </div>



      <Modal contentClassName='bg-dark' centered size='xl' show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title className='thefont' style={{ color: 'white' }}>{selectedTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {selectedContent.video? 
          <iframe src={selectedContent.video} style={{...style.modalImage, height:'500px', width:'3000px'}} ></iframe>
          :
          <React.Fragment></React.Fragment>
          }
          
          <span>
            <hr style={{borderTop:'2px', color:'white', width:'100vh'}} />
            </span> 

          <text className='thefont' style={style.modalText}>
            {selectedContent.firstText}
          </text>

          <img src={selectedContent.firstMedia} style={style.modalImage} alt='selected' />

          <text className='thefont' style={style.modalText}>
            {selectedContent.secondText}
          </text>

          <img src={selectedContent.secondMedia} style={style.modalImage} alt='selected' />

          <text className='thefont' style={style.modalText}>
            {selectedContent.thirdText}
          </text>

          <img src={selectedContent.thirdMedia} style={style.modalImage} alt='selected' />


        </Modal.Body>
        
      </Modal>

    </div>
  )
}

export default App
