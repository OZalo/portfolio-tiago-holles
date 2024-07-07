import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { motion } from "framer-motion"
import { Modal } from 'react-bootstrap'
import './index.css'
import fundo from './assets/miscellaneous/background.png'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import sliderImageOne from './assets/miscellaneous/numero1.png'
import sliderImageTwo from './assets/miscellaneous/numero3.png'
import motionhiguruma from './assets/miscellaneous/motionhiguruma.gif'
import motionyhwach from './assets/miscellaneous/motionyhwach.gif'
import rpgrpg from './assets/miscellaneous/rpgrpg.gif'
import motionmash from './assets/miscellaneous/motionmash.gif'
//comentario
const contentArray = [
  { //video clipe
    content: {
      src: 'https://drive.google.com/thumbnail?id=1Wo9862X0Snb44bilgEOyjJbCK1jsiEij&sz=w1000', 
      title: "Pior Que Dor de Dente",
      upperVideo: "https://drive.google.com/file/d/1_ZoJ_-bBIeEpHQY3uQJDMRsnZXdtqUpI/preview",
      firstText: "Pior Que Dor de Dente foi um vídeo clipe feito como projeto final do meu curso de filmmaker, eu contribuo como codiretor, roteirista e editor. O cantor Marcello Wall queria um novo clipe para a sua nova música Pior Que Dor de Dente, que havia sido feita com parcerias e outros aspectos de contrato, ou seja, o mesmo não teve tanta liberdade criativa para com a história, takes de cenas ou roteiro.",
      firstMedia: 'https://drive.google.com/thumbnail?id=19xQy1mMdv991MOuUPfTTKYRHKquXr-Mj&sz=w1000',
      secondText: 'Então, ele aceitou nossa proposta de fazer um clipe para ele como projeto final, o que seria benéfico para ambos os lados. Nós ganhamos uma música conhecida nacionalmente, um cantor de nome e facilidade de locação devido aos contatos do Marcello e ele ganha um clipe novinho saindo do forno. O Marcello queria uma história bem serena como a própria música, mas meio fantasiosa no sentido de encontrar a pessoa perfeita, histórias que terminam com um final feliz apesar dos problemas durante a "aventura"',
      secondMedia: "https://drive.google.com/thumbnail?id=1V1kb6Gph7gj4RiNFVfOYn8ILVrFGEvO8&sz=w1000",
      thirdText: "E apesar dos problemas de locação e da pouca disponibilidade do cantor devido ser muito ocupado, só tivemos 1 dia para gravar o clipe todo, então se não conseguimos alguma cena ela simplesmente não iria existir e não teria como fazer nada a respeito. No fim o clipe foi um sucesso ganhando o Festival de Vídeos Universitários (OSGA), como melhor vídeo clipe em 2023.",
    }
  },
  { //rpg
    content: {
      title: "As infinitas possibilidades do RPG",
      src: 'https://drive.google.com/thumbnail?id=1XS9iVXvWl6Ug27MSm6vOupAOOxhX3UvQ&sz=w1000',
      video: 'https://www.youtube.com/embed/rPQUkV3--7c?si=NTKcl1fRetekRUzK',
      firstText: 'Eu tive a oportunidade de fazer um áudio drama como projeto de faculdade, o objetivo aqui é fazer uma partida de RPG através de uma visão dramatizada de quem está jogando, afinal, ver por fora pessoas jogando RPG, faz o mesmo parecer complexo confuso, e com esse vídeo eu queria trazer o sentimento de "não é tão complicado assim, e olha o quanto pode ser divertido e interessante.',
      firstMedia: rpgrpg,
      secondText: "Então, tanto em roteiro quanto em uma pequena atuação como Mestre de Mesa, eu tive que transformar uma sessão de RPG em algo fácil de digerir, até mesmo para quem não sabe nada de mundos medievais fantásticos, e explicar que o RPG traz várias consequências psicológicas positivas para quem os joga. Como criatividade, socialização, autoexpressão e vários outros bens, podendo jogar da sua própria casa com inúmeras pessoas com os mais diversos tipos de pensamento, cultura e formas de ver o mundo.",
      secondMedia: "https://drive.google.com/thumbnail?id=1hSJjt4mBdxVIWzmSBICZaWrXrEV4ib-6&sz=w1000",
      thirdText: "Esse projeto foi bastante pessoal, mas tinha como objetivo também portifólio para todos os integrantes que ajudaram nele, então juntou o útil ao agradável. O propósito do áudio drama é ensinar e descrever o que é o RPG de Mesa, um jogo de tabuleiro em turnos que se tornou cada vez mais raro mundo a fora, devido a natureza social que o jogo trás.",
      thirdMedia: "https://drive.google.com/thumbnail?id=12XuLE2sFYRkUGSzAxriXqos9hYhRZXUI&sz=w1000"
    }
  },
  { //reflexo da maldade
    content: {
      src: 'https://drive.google.com/thumbnail?id=1TUAyAVdK77CkFNPmCevg0tF_Lhx4Rp6N&sz=w1000', 
      title: "Curta Metragem",
      firstText: "Reflexo da Maldade foi um curta-metragem feito como projeto final de curso, eu fui convidado com editor por fora, o que é muito interessante porque tem a visão da equipe que produziu e a visão que eu tenho de olhar o projeto do lado de fora. No geral, não era um projeto desafiador no sentido geral, o que realmente precisava de muita atenção era um efeito especial referente ao espelho onde acontecia todo o drama do curta. Se essa parte ficasse ruim, ou não fosse convincente, estragaria toda a experiência de quem está assistindo.",
      upperVideo: "https://drive.google.com/file/d/1XYd0o72mtAd1jj-qVZMhpADggpGuPWpv/preview",
      secondText: "Outra parte complicada, era compensar a falta de atores com cenários, já que eles não tinham como chamar atores para o curta, alguns membros da equipe tiveram que suprir essa falta de recurso, e obviamente por não terem conhecimento de atuação, eu tive que na edição dar grandes focos nos cenários, efeitos e ambientes escuros, que escondam esses detalhes.",
      secondMedia: "https://drive.google.com/thumbnail?id=1cMq54cA3PpMR2OjaPNsmbDrDHfQR_Ftq&sz=w1000",
      sliderImageOne: sliderImageOne,
      sliderImageTwo: sliderImageTwo
    }
  },
  { //grid
    content: {
      src: 'https://drive.google.com/thumbnail?id=1NfAOXw8eXqx8bETPA1xdZ2Bi2_hyiwBc&sz=w1000', 
      title: "Grid",
      upperVideo: "https://www.youtube.com/embed/-grurfbGB6U?si=pM-jfGS58vb6pKVW",
      firstText: "Grid é meu canal do YouTube que tem como objetivo tocar em assuntos aleatórios como treinamento geral de produção, eu sempre busco um assunto que não tem nada a ver com o vídeo passado para me forçar a criar roteiros diferentes, designs novos e propostas de construções de vídeo que eu não posso roubar do vídeo anterior, afinal é bem natural criar um canal no YouTube com uma estética e proposta de construção de vídeo e ir usando ela e todos os vídeos tanto por um padrão quanto por simplicidade de se editar vários vídeos de uma só fez. No fim é apenas um grande playground para eu testar habilidades novas e propostas de vídeo que são usadas mundo a fora e tentar fazer do meu jeito.",
      firstMedia: 'https://drive.google.com/thumbnail?id=1sPjTpP_NQaXM1GGsbW9gBOcO8SoyaOPT&sz=w1000',
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
      thirdMedia: motionhiguruma,
      fourthMedia: motionmash,
      fifthMedia: motionyhwach
    }
  },
  { //dublagem
    content: {
      src: 'https://drive.google.com/thumbnail?id=1ixLBKay3bcSIk8xay6bQ-XSOOHTiXvSq&sz=w1000', 
      title: "Dublagem e Tratamento de Aúdio",
      firstText: "Dublagem segue em dificuldades do começo ao fim, desde o tratamento acústico que você tem em sua sala até a qualidade de configuração do seu microfone e conhecimento orgânico de mixagem e pós-produção. Eu tive a oportunidade de fazer parte de um projeto de fan-dublagem para dublar o jogo Street Fighter 6, que chegou ao Brasil sem dublagem oficial. Obviamente, parte das complexidades começa com o fato de ter gravado em um quarto sem tratamento acústico.",
      secondText: "A parte artística de atuação é muito importante, mas para fan-dublagens tende a não ser tão dramático quanto para dublagens oficiais. Toda minha dublagem é baseada em edição para compensar o lugar que gravo, já que qualquer grito ou som de fora da vizinhança pode destruir o áudio em questão. No fim usei plugins da Wave de compressão, De Reverbs (para controle de sala) com SPL De-Reverb da Alliance, tudo isso dentro do programa Reaper para essa gravação e edição.",
      thirdText: "Essas são outras fan-dublagens que acabei fazendo. Também com o mesmo problema, gravando em um local ruim que acaba sendo o único disponível para mim, porém, com o tratamento de áudio certo e conhecimentos sobre como melhor aproveitar o microfone que tenho (Blue Yeti Classic nessa situação), deu para chegar em um desempenho muito próximo de uma gravação profissional.",
      firstVideo: "https://drive.google.com/file/d/1w0McaHtNqMSn-hs0xalQE_e-GWinYAaM/preview",
      secondVideo: "https://drive.google.com/file/d/11UVc1wsWVSi1bWDd_dApaEIzI-6yF4G8/preview",
      thirdVideo: "https://drive.google.com/file/d/1bPHaux38JGZhx6Gr0OJ56rq9UGPD2vDx/preview",
      fourthVideo: "https://drive.google.com/file/d/1BTase7CFPYdCzA646HBrwxgLqB1I55Tx/preview",
      fifthVideo: "https://drive.google.com/file/d/10dS309di16rvgopznbWcdJa-RM_ZJ0Fy/preview",
    }
  },
]

const headerStyle = {
  backgroundColor: '#040509', 
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
  mobileContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 2fr)',
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
    marginTop:30
  },
  button: {
    display: 'flex',
    marginTop: '20px',
    padding: '10px',
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: 10
  },
  modalImage: {
    maxWidth: '90%', 
    height: 'auto',
    display: 'block',
    margin: 'auto',
  },
  modalVideo: {
    display: 'block',
    margin: 'auto',
    marginTop:30, 
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
  const [selectedTitle, setSelectedTitle] = useState('')
  const [selectedContent, setSelectedContent] = useState({})
  const [width, setWidth] = useState(window.innerWidth)

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth)
  }

  const handleImageClick = (src, title, content) => {
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
            <h1 className='thefont' style={isMobile? { marginLeft: 5, paddingTop:5 } : { marginLeft: 5 }}>Tiago Holles</h1>
          </div>

          <div 
          style={
            isMobile? 
              {
                display: 'flex', 
                flexDirection: 'row', 
                marginRight: 5, 
                paddingRight:8
                } 
              : 
              {
                display: 'flex', 
                flexDirection: 'row', 
                marginRight: 5, 
                paddingRight:8, 
                paddingTop:5
              }}>

            <i
              onClick={() => { window.open('https://www.instagram.com/tiago_holles', '_blank') }}
              className="fa fa-instagram fa-2x pt-2"
              style={{ cursor: 'pointer' }}
            />
            <i 
              onClick={() => { window.open('https://www.linkedin.com/in/tiago-holles-30a81a308', '_blank') }}
              style={{ cursor: 'pointer' }}
            
            className="fa fa-linkedin fa-2x pt-2 mx-4" />
            <i
              onClick={() => { window.open('https://www.youtube.com/@Grid_Zone', '_blank') }}
              className="fa fa-youtube fa-2x pt-2"
              style={{ cursor: 'pointer' }}
            />

          </div>
        </nav>
      </div>

      <div style={isMobile? style.mobileContainer : style.container}>
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

      {isMobile?
      <React.Fragment></React.Fragment>
      :
      <div style={style.textSection} >
        <h3 className='thefont'>
          Olá. Me chamo Tiago Holles, sou editor, roteirista e nos tempos livres dublador. Busco oportunidade de aprender<br />
          mais na minha área de formação, crescimento profissional e estabilidade no mercado de trabalho,<br />
          sempre melhorando minhas habilidades de roteiro, edição e narração.
        </h3>
      </div>

      }


      <div style={{marginTop: 36}} className="d-flex justify-content-center">
        <motion.button
          className='mb-5 thefont'
          whileHover={{ scale: 1.02, cursor: 'pointer' }}
          whileTap={{ scale: 0.8 }}
          style={style.button}
          onClick={() => { window.open('https://www.instagram.com/tiago_holles', '_blank') }}
        >
          <text style={{fontSize:24}}>

          Contato
          </text>
        </motion.button>
      </div>



      <Modal style={{color:'white'}} contentClassName='text-white btn-close-white ' centered size='xl' show={showModal} onHide={handleCloseModal}>
        <Modal.Header style={{ backgroundColor: '#040509'  }} closeButton>
          <Modal.Title  className='thefont' >{selectedTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body  style={{ backgroundColor: '#040509' }} >

          {selectedContent.video? 
          <iframe src={selectedContent.video} allowFullScreen={true} style={{...style.modalImage, height:'500px', width:'3000px'}} />
          :
          <React.Fragment></React.Fragment>
          }
          
          {selectedContent.upperVideo?          
          <iframe src={selectedContent.upperVideo} allowFullScreen={true} width="90%" height={isMobile? "220px" : "550px"} style={{...style.modalVideo}}  allow="autoplay"/>
          :
          <React.Fragment/>
          }

          <text className='thefont' style={style.modalText}>
            {selectedContent.firstText}
          </text>

          <img src={selectedContent.firstMedia} style={style.modalImage} />

          {selectedContent.firstVideo?          
          <iframe src={selectedContent.firstVideo} allowFullScreen={true} width="90%" height={isMobile? "220px" : "550px"} style={{...style.modalVideo}}  allow="autoplay"/>
          :
          <React.Fragment/>
          }


          <ReactCompareSlider
            style={style.modalImage}
            itemOne={<ReactCompareSliderImage src={selectedContent.sliderImageOne}/>}
            itemTwo={<ReactCompareSliderImage src={selectedContent.sliderImageTwo}/>}
          />

          <text className='thefont' style={style.modalText}>
            {selectedContent.secondText}
          </text>

          {selectedContent.secondVideo?          
          <iframe src={selectedContent.secondVideo} allowFullScreen={true} width="90%" height={isMobile? "220px" : "550px"} style={{...style.modalVideo}}  allow="autoplay"/>
          :
          <React.Fragment/>
          }

          <img src={selectedContent.secondMedia} style={style.modalImage} />

          <text className='thefont' style={style.modalText}>
            {selectedContent.thirdText}
          </text>

          {selectedContent.thirdVideo?          
          <iframe src={selectedContent.thirdVideo} allowFullScreen={true} width="90%" height={isMobile? "220px" : "550px"} style={{...style.modalVideo}}  allow="autoplay"/>
          :
          <React.Fragment/>
          }

          {selectedContent.fourthVideo?          
          <iframe src={selectedContent.fourthVideo} allowFullScreen={true} width="90%" height={isMobile? "220px" : "550px"} style={{...style.modalVideo}}  allow="autoplay"/>
          :
          <React.Fragment/>
          }

          {selectedContent.fifthVideo?          
          <iframe src={selectedContent.fifthVideo} allowFullScreen={true} width="90%" height={isMobile? "220px" : "550px"} style={{...style.modalVideo}}  allow="autoplay"/>
          :
          <React.Fragment/>
          }

          <img src={selectedContent.thirdMedia} style={{...style.modalImage}} />

          {selectedContent.fourthMedia?
          <img src={selectedContent.fourthMedia} style={{...style.modalImage, marginTop:50}} />
          :
          <React.Fragment/>
          }

          {selectedContent.fifthMedia?
          <img src={selectedContent.fifthMedia} style={{...style.modalImage, marginTop:50}} />
          :
          <React.Fragment/>
          }




        </Modal.Body>
        
      </Modal>

    </div>
  )
}

export default App
