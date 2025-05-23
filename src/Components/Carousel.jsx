import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Modal, CloseButton } from 'react-bootstrap';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import rpgrpg from '../Assets/rpgrpg.gif'
import motionmash from '../Assets/motionmash.gif'
import motionhiguruma from '../Assets/motionhiguruma.gif'
import sliderImageOne from '../Assets/numero1.png'
import sliderImageTwo from '../Assets/numero3.png'
import marcello from '../Assets/Banners/marcello.png'
import mixagem from '../Assets/Banners/mixagem.png'
import maldade from '../Assets/Banners/maldade.png'
import instagram from '../Assets/Banners/instagram.png'
import MMV from '../Assets/Banners/MMV.png'
import rpg from '../Assets/Banners/rpg.png'
import youtube from '../Assets/Banners/youtube.png'

const contentArray = [
  { //video clipe
    content: {
      src: marcello, 
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
      src: rpg,
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
      src: maldade, 
      title: "Curta Metragem",
      firstText: "Reflexo da Maldade foi um curta-metragem feito como projeto final de curso, eu fui convidado com editor por fora, o que é muito interessante porque tem a visão da equipe que produziu e a visão que eu tenho de olhar o projeto do lado de fora. No geral, não era um projeto desafiador no sentido geral, o que realmente precisava de muita atenção era um efeito especial referente ao espelho onde acontecia todo o drama do curta. Se essa parte ficasse ruim, ou não fosse convincente, estragaria toda a experiência de quem está assistindo.",
      upperVideo: "https://drive.google.com/file/d/1XYd0o72mtAd1jj-qVZMhpADggpGuPWpv/preview",
      secondText: "Outra parte complicada, era compensar a falta de atores com cenários, já que eles não tinham como chamar atores para o curta, alguns membros da equipe tiveram que suprir essa falta de recurso, e obviamente por não terem conhecimento de atuação, eu tive que na edição dar grandes focos nos cenários, efeitos e ambientes escuros, que escondam esses detalhes.",
      secondMedia: "https://drive.google.com/thumbnail?id=1cMq54cA3PpMR2OjaPNsmbDrDHfQR_Ftq&sz=w1000",
      sliderImageOne: sliderImageOne,
      sliderImageTwo: sliderImageTwo
    }
  },
  { //youtube
    content: {
      src: youtube, 
      title: "YouTube",
      firstText: "Trabalho com vídeos rápidos, com um timing de comédia dinâmico e bem marcado, como no meu canal do YouTube TheCake — mas meu foco principal está em edições cinematográficas, com força visual e ritmo envolvente. Gosto de criar vídeos que causem impacto, seja com cortes precisos, som bem trabalhado ou uma montagem com peso e intenção. Já produzi esse tipo de edição em trailers para projetos como os mods dublados de Elden Ring, Street Fighter 6 e outros. Além disso, venho entrando no mercado de MMVs (Music Motion Videos), colaborando há cerca de um ano com cantores do cenário geek.",
      firstVideo: 'https://www.youtube.com/embed/fOXJZA_Uh3g?si=fagTJ5BIq1S1-TjS',
      secondVideo: "https://www.youtube.com/embed/NByp69XM358?si=VvFGxpCW_LRF8Ynx",
      thirdVideo: 'https://www.youtube.com/embed/Min9JZII5k8?si=OckB8fLYYgQgERiz',
      fourthVideo: 'https://www.youtube.com/embed/P1a9L_cI_MU?si=0lEer3__C8jUaho7',
      fifthVideo: 'https://www.youtube.com/embed/tTHaQzkNj7M?si=78wJTjEYucJPJnzY'
    }
  },
  { // motion
    content: {
      src: MMV, 
      title: "Motion Comics/Mangá",
      firstText: "Gosto de editar com ritmo, impacto e clareza. Trabalho com foco total na entrega rápida e precisa, alinhado com a demanda do mercado atual. Minha edição valoriza os punchs da música e sabe quando brilhar, seja em algo mais limpo e dinâmico ou numa estética mais pesada, cinematográfica e realista. Cada corte é pensado pra amplificar a energia da música e destacar o detalhe que o artista quis trazer para esse música ou personagem em questão.",
      firstMedia: 'https://drive.google.com/thumbnail?id=1C2RUAjDy-6pLFAv16GYuktWvc_T1wj8X&sz=w1000',
      // secondText: "Você precisa estudar o desenho muito antes de levá-lo a um editor, pois antes de animar, esse desenho precisa ser recortado em detalhes, apenas nas partes que serão animadas ou destacadas com algum efeito posteriormente. Como, por exemplo, a espada do personagem Higuruma, que poderia ser pintada dentro do After Effects (programa usado para essa animação), porém, como eu já tinha certeza de que a cor seria essa, então é menos trabalho e gasto de processamento dentro do editor.",
      secondMedia: "https://drive.google.com/thumbnail?id=1HLtAKiswuVRSmRvBlps4CBeqVkrAJNOn&sz=w1000",
      // thirdText: 'É bastante interessante o detalhe de que esse tipo de "animação" não é complicado de ser feita, boa parte dessas animações pode ser feita em poucos minutos, caso queria uma coisa bem polida, talvez horas. O que faz essas animações serem complicadas e caras de se fazer é a construção e sensibilidade do que deve ter movimento e o que não deve ter, o que precisa de cor e o que não precisa. Na minha opinião, para fazer um bom Motion Comics você não precisa ser um bom animador, você precisa ser um bom diretor.',
      thirdMedia: motionhiguruma,
      fourthMedia: motionmash,
      seventhVideo: "https://drive.google.com/file/d/1CnpWz54muD65nXzykiZLKyoeO5Cr83Np/preview",
      eighteenth: "https://drive.google.com/file/d/1jTqKrCPflXHly-nbQA4ilhmzoMQdfoEo/preview",
    }
  },
  { //dublagem
    content: {
      src: 'https://drive.google.com/thumbnail?id=1TtD0mdM0lLedz-Nb1PrEoXSLOJfggZ7P&sz=w1000', 
      title: "Dublagem e Tratamento de Aúdio",
      firstText: "Dublagem segue em dificuldades do começo ao fim, desde o tratamento acústico que você tem em sua sala até a qualidade de configuração do seu microfone e conhecimento orgânico de mixagem e pós-produção. Eu tive a oportunidade de fazer parte de um projeto de fan-dublagem para dublar o jogo Street Fighter 6, que chegou ao Brasil sem dublagem oficial. Obviamente, parte das complexidades começa com o fato de ter gravado em um quarto sem tratamento acústico.",
      secondText: "A parte artística de atuação é muito importante, mas para fan-dublagens tende a não ser tão dramático quanto para dublagens oficiais. Toda minha dublagem é baseada em edição para compensar o lugar que gravo, já que qualquer grito ou som de fora da vizinhança pode destruir o áudio em questão. No fim usei plugins da Wave de compressão, De Reverbs (para controle de sala) com SPL De-Reverb da Alliance, tudo isso dentro do programa Reaper para essa gravação e edição.",
      thirdText: "Essas são outras fan-dublagens que acabei fazendo. Também com o mesmo problema, gravando em um local ruim que acaba sendo o único disponível para mim, porém, com o tratamento de áudio certo e conhecimentos sobre como melhor aproveitar o microfone que tenho (Blue Yeti Classic nessa situação), deu para chegar em um desempenho muito próximo de uma gravação profissional.",
      firstVideo: "https://drive.google.com/file/d/1w0McaHtNqMSn-hs0xalQE_e-GWinYAaM/preview",
      secondVideo: "https://drive.google.com/file/d/1isd41huNbSWHQJaEBqRb4WTZDSUxmbFJ/preview",
      thirdVideo: "https://drive.google.com/file/d/1RL0EWhL3iSRGIbBzzyeUe1eRaPN1VOFT/preview",
      fourthVideo: "https://drive.google.com/file/d/1nFkXiU7gujJ0VVZaR3HQqVqj69tpUWWt/preview",
      fifthVideo: "https://drive.google.com/file/d/1aYdXQIN2o2BnI5CLbDAhR3v-hsWsx_jd/preview",
      sixthVideo: "https://drive.google.com/file/d/1C3EUN9CDmlvd_z9cjpT5uws3DCMIpRBB/preview"
    }
  },
  { //dublagem
    content: {
      src: instagram, 
      title: "Instagram",
      firstText: "Estou dando meus primeiros passos no universo dos vídeos curtos, mas já trago na bagagem a prática de edição e criação de conteúdo dinâmico. Faço cortes de podcasts, vídeos para vendas e adaptações que realmente se conectam com quem assiste. Já produzi cortes de podcast para o Grupo Polaro e já desenvolvi vídeos curtos para a Universidade da Amazônia (UNAMA) e para a Fluxo.",
      blockquoted: "true"
    }
  },
]

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
    marginBottom:30, 
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

const Carousel = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedContent, setselectedContent] = useState({});
  const [width, setWidth] = useState(window.innerWidth)

  const isMobile = width <= 768

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth)
  }

  const handleCardClick = (card) => {
    setselectedContent(card);
    setShowModal(true);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange)
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange)
    }
  }, [])

  return (
    <div style={{ width: '100%', overflowX: 'hidden', marginTop: '20px' }}>
      <Swiper
        modules={[Navigation, Pagination]}
        // spaceBetween={-50}
        slidesPerView={isMobile? 1 : 4}
        navigation
        // pagination={{ clickable: true }}
        loop
        style={{
          '--swiper-navigation-color': 'white',
          '--swiper-pagination-color': 'white'
        }}
      >
        {contentArray.map((item, index) => (
          <SwiperSlide key={index}>
            <motion.div whileHover={{ scale: 1.02, cursor: 'pointer' }} whileTap={{ scale: 0.8 }}>
              <motion.img
                style={{ width: '70%', height: '70%', minHeight: '350px', objectFit: 'cover' }}
                onClick={() => handleCardClick(item.content)}
                src={item.content.src}
                alt={item.content.title}
              />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Modal style={{ color: 'white' }} contentClassName='text-white btn-close-white' centered size='xl' show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton={false} style={{ backgroundColor: '#040509' }}>
          <Modal.Title className='thefont'>{selectedContent.title}</Modal.Title>
          <CloseButton onClick={() => setShowModal(false)} variant='white' />
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#040509' }}>

          {selectedContent.video? 
          <iframe title='Vídeo Principal' src={selectedContent.video} allowFullScreen={true} style={{...style.modalImage, height:'500px', width:'3000px'}} />
          :
          <React.Fragment></React.Fragment>
          }
          
          {selectedContent.upperVideo?          
          <iframe title='Vídeo de cima' src={selectedContent.upperVideo} allowFullScreen={true} width="90%" height={isMobile? "220px" : "550px"} style={{...style.modalVideo}}  allow="autoplay"/>
          :
          <React.Fragment/>
          }

          <text className='thefont' style={style.modalText}>
            {selectedContent.firstText}
          </text>

          {/* ifelse img iframe */}
          <img alt='' src={selectedContent.firstMedia} style={style.modalImage} />

          {selectedContent.firstVideo?          
          <iframe title='Primeiro Vídeo' src={selectedContent.firstVideo} allowFullScreen={true} width="90%" height={isMobile? "220px" : "550px"} style={{...style.modalVideo}}  allow="autoplay"/>
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
          <iframe title='Segundo Vídeo' src={selectedContent.secondVideo} allowFullScreen={true} width="90%" height={isMobile? "220px" : "550px"} style={{...style.modalVideo}}  allow="autoplay"/>
          :
          <React.Fragment/>
          }

          <img alt='' src={selectedContent.secondMedia} style={style.modalImage} />

          <text className='thefont' style={style.modalText}>
            {selectedContent.thirdText}
          </text>

          {selectedContent.thirdVideo?          
          <iframe title='Terceiro Vídeo' src={selectedContent.thirdVideo} allowFullScreen={true} width="90%" height={isMobile? "220px" : "550px"} style={{...style.modalVideo}}  allow="autoplay"/>
          :
          <React.Fragment/>
          }

          {selectedContent.fourthVideo?          
          <iframe title='Quarto Vídeo' src={selectedContent.fourthVideo} allowFullScreen={true} width="90%" height={isMobile? "220px" : "550px"} style={{...style.modalVideo}}  allow="autoplay"/>
          :
          <React.Fragment/>
          }

          {selectedContent.fifthVideo?          
          <iframe title='Quinto Vídeo' src={selectedContent.fifthVideo} allowFullScreen={true} width="90%" height={isMobile? "220px" : "550px"} style={{...style.modalVideo}}  allow="autoplay"/>
          :
          <React.Fragment/>
          }

          {selectedContent.sixthVideo?          
          <iframe title='Sexto video' src={selectedContent.sixthVideo} allowFullScreen={true} width="90%" height={isMobile? "220px" : "550px"} style={{...style.modalVideo}}  allow="autoplay"/>
          :
          <React.Fragment/>
          }

          <img alt='' src={selectedContent.thirdMedia} style={{...style.modalImage}} />

          {selectedContent.fourthMedia?
          <img alt='' src={selectedContent.fourthMedia} style={{...style.modalImage, marginTop:50}} />
          :
          <React.Fragment/>
          }

          {selectedContent.fifthMedia?
          <img alt='' src={selectedContent.fifthMedia} style={{...style.modalImage, marginTop:50}} />
          :
          <React.Fragment/>
          }

          {selectedContent.seventhVideo?          
          <iframe title='Sétimo video' src={selectedContent.seventhVideo} allowFullScreen={true} width="90%" height={isMobile? "220px" : "550px"} style={{...style.modalVideo}}  allow="autoplay"/>
          :
          <React.Fragment/>
          }

          {selectedContent.eighteenth?          
          <iframe title='Oitavo video' src={selectedContent.eighteenth} allowFullScreen={true} width="90%" height={isMobile? "220px" : "550px"} style={{...style.modalVideo}}  allow="autoplay"/>
          :
          <React.Fragment/>
          }

          {selectedContent.blockquoted?
          
          <div width="90%" height={isMobile? "220px" : "550px"} style={{...style.modalVideo}}>
              <blockquote 
              className="instagram-media" 
              data-instgrm-permalink="https://www.instagram.com/tiago_holles" 
              data-instgrm-version="14">
            </blockquote> 
            <script async src="//www.instagram.com/embed.js"></script>
          </div>

        :

        <React.Fragment/>

        }

        </Modal.Body>
      </Modal>

          {/* colocar profile.jpg */}

    </div>
  );
};

export default Carousel;
