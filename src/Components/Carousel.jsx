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

import sliderImageOne from '../Assets/numero1.png'
import sliderImageTwo from '../Assets/numero3.png'
import marcello from '../Assets/Banners/marcello.png'
// import mixagem from '../Assets/Banners/mixagem.png'
import maldade from '../Assets/Banners/maldade.png'
import instagram from '../Assets/Banners/instagram.png'
import MMV from '../Assets/Banners/MMV.png'
import rpg from '../Assets/Banners/rpg.png'
import youtube from '../Assets/Banners/youtube.png'
import conquista from '../Assets/conquista.gif'
import diobrando from '../Assets/diobrando.gif'
import ripper from '../Assets/ripper.gif'
import reivoltou from '../Assets/reivoltou.gif'
import { FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FaInstagram } from 'react-icons/fa';
import line from '../Assets/line.png'

const contentArray = [
  { //video clipe
    content: {
      src: marcello, 
      title: "Pior Que Dor de Dente",
      upperVideo: "https://drive.google.com/file/d/1_ZoJ_-bBIeEpHQY3uQJDMRsnZXdtqUpI/preview",
      firstText: "“Pior Que Dor de Dente” é um videoclipe produzido como projeto final do meu curso de filmmaker. Atuei como codiretor, roteirista e editor. O cantor Marcello Wall buscava um novo clipe para sua música Pior Que Dor de Dente, que havia sido produzida em parceria com outros profissionais e dentro de certos contratos, o que limitou sua liberdade criativa em relação à história, aos takes e ao roteiro.",
      firstMedia: 'https://drive.google.com/thumbnail?id=19xQy1mMdv991MOuUPfTTKYRHKquXr-Mj&sz=w1000',
      secondText: 'Diante disso, ele aceitou nossa proposta de produzir um clipe como projeto final, o que acabou sendo benéfico para ambos. Ganhamos uma música já conhecida nacionalmente, um cantor de renome e facilidade nas locações graças aos contatos do Marcello. Por outro lado, ele recebeu um clipe novo, feito com muito cuidado e dedicação. A proposta criativa era desenvolver uma história leve, que refletisse o tom sereno da música, mas com um toque de fantasia — uma busca pela pessoa perfeita, com direito a final feliz, mesmo com os desafios enfrentados ao longo dessa “aventura”.',
      secondMedia: "https://drive.google.com/thumbnail?id=1V1kb6Gph7gj4RiNFVfOYn8ILVrFGEvO8&sz=w1000",
      thirdText: "Apesar dos desafios com locações e da agenda apertada do cantor, que é bastante ocupado, tivemos apenas um dia para gravar todo o clipe. Isso significava que, se alguma cena não fosse feita, ela simplesmente não existiria — não haveria chance de regravação. Mesmo assim, o resultado superou as expectativas. O clipe foi um sucesso e venceu o Festival de Vídeos Universitários (OSGA) como Melhor Videoclipe de 2023.",
    }
  },
  { //rpg
    content: {
      title: "As infinitas possibilidades do RPG",
      src: rpg,
      video: 'https://www.youtube.com/embed/rPQUkV3--7c?si=NTKcl1fRetekRUzK',
      firstText: 'Tive a oportunidade de desenvolver um áudio drama como projeto da faculdade. A proposta era simular uma partida de RPG sob uma perspectiva dramatizada, como se estivéssemos dentro da cabeça de quem joga. Afinal, para quem observa de fora, o RPG pode parecer algo confuso e complexo. Com esse projeto, meu objetivo era justamente quebrar essa impressão, mostrando que não é tão complicado assim — e, mais do que isso, destacar o quanto pode ser divertido, envolvente e criativo.',
      firstMedia: rpgrpg,
      secondText: "Atuei tanto na roteirização e como Mestre de Mesa. Meu desafio foi transformar uma sessão de RPG em uma experiência acessível, até mesmo para quem não conhece o universo de mundos medievais e fantásticos. Além disso, quis evidenciar os benefícios psicológicos que o RPG proporciona, como desenvolvimento da criatividade, socialização, autoconfiança, empatia e expressão pessoal. É uma atividade que conecta pessoas, independentemente de cultura, pensamentos ou vivências, e que pode ser jogada de qualquer lugar do mundo.",
      secondMedia: "https://drive.google.com/thumbnail?id=1hSJjt4mBdxVIWzmSBICZaWrXrEV4ib-6&sz=w1000",
      thirdText: "Esse projeto foi muito pessoal, mas também teve como propósito fortalecer o portfólio de todos os envolvidos, unindo o útil ao agradável. O áudio drama tem como objetivo ensinar e apresentar o que é o RPG de Mesa — um jogo de narrativa colaborativa e por turnos, que, infelizmente, se tornou cada vez mais raro em muitos lugares, justamente por depender da interação social presencial, algo que é tanto seu maior desafio quanto sua maior riqueza.",
      thirdMedia: "https://drive.google.com/thumbnail?id=12XuLE2sFYRkUGSzAxriXqos9hYhRZXUI&sz=w1000"
    }
  },
  { //reflexo da maldade
    content: {
      src: maldade, 
      title: "Reflexo da Maldade",
      firstText: "“Reflexo da Maldade” é um curta-metragem realizado como projeto final de curso. Fui convidado a participar como editor externo, o que tornou a experiência particularmente interessante — pude trabalhar com o olhar de quem não esteve presente em toda a produção, oferecendo uma perspectiva de fora sobre o material da equipe. No geral, o projeto não apresentava grandes desafios técnicos, mas exigia atenção especial em um ponto crucial: um efeito visual envolvendo um espelho, que é o centro do drama do curta. Esse elemento precisava funcionar perfeitamente, pois, se não fosse convincente, comprometeria toda a imersão e a experiência do espectador.",
      upperVideo: "https://drive.google.com/file/d/1XYd0o72mtAd1jj-qVZMhpADggpGuPWpv/preview",
      secondText: "Outro desafio do projeto foi compensar a ausência de atores profissionais. Por limitações de recursos, alguns membros da própria equipe precisaram assumir os papéis no curta. Naturalmente, como não tinham experiência em atuação, meu trabalho na edição ganhou ainda mais importância. Para equilibrar essa limitação, foquei em destacar os cenários, criar atmosferas através de efeitos visuais e utilizar ambientes escuros, que ajudassem a disfarçar essas imperfeições e a manter a imersão do público.",
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
      fifthVideo: 'https://www.youtube.com/embed/tTHaQzkNj7M?si=78wJTjEYucJPJnzY',
      youtubutton: "true"
    }
  },
  { // motion
    content: {
      src: MMV, 
      title: "MMV",
      firstText: "Gosto de editar com ritmo, impacto e clareza. Trabalho com foco total na entrega rápida e precisa, alinhado com a demanda do mercado atual. Minha edição valoriza os punchs da música e sabe quando brilhar, seja em algo mais limpo e dinâmico ou numa estética mais pesada, cinematográfica e realista. Cada corte é pensado pra amplificar a energia da música e destacar o detalhe que o artista quis trazer para esse música ou personagem em questão.",
      firstMedia: conquista,
      // secondText: "Você precisa estudar o desenho muito antes de levá-lo a um editor, pois antes de animar, esse desenho precisa ser recortado em detalhes, apenas nas partes que serão animadas ou destacadas com algum efeito posteriormente. Como, por exemplo, a espada do personagem Higuruma, que poderia ser pintada dentro do After Effects (programa usado para essa animação), porém, como eu já tinha certeza de que a cor seria essa, então é menos trabalho e gasto de processamento dentro do editor.",
      secondMedia: reivoltou,
      // thirdText: 'É bastante interessante o detalhe de que esse tipo de "animação" não é complicado de ser feita, boa parte dessas animações pode ser feita em poucos minutos, caso queria uma coisa bem polida, talvez horas. O que faz essas animações serem complicadas e caras de se fazer é a construção e sensibilidade do que deve ter movimento e o que não deve ter, o que precisa de cor e o que não precisa. Na minha opinião, para fazer um bom Motion Comics você não precisa ser um bom animador, você precisa ser um bom diretor.',
      thirdMedia: ripper,
      fourthMedia: diobrando,
      blockx: "true"

    }
  },
  { //dublagem
    content: {
      src: 'https://drive.google.com/thumbnail?id=1TtD0mdM0lLedz-Nb1PrEoXSLOJfggZ7P&sz=w1000', 
      title: "Dublagem e Tratamento de Aúdio",
      firstText: "Amante de dublagem, voz original, sonorização e mixagem de áudio. Meu trabalho une duas grandes paixões: interpretar com a voz e dar vida ao som através da edição, efeitos e trilhas que transformam qualquer cena em uma experiência imersiva. Atualmente, estou em processo para obtenção do meu DRT de ator, mas já conto com alguma experiência prática tanto na área de voz quanto na de pós-produção de áudio. Minha demo foi inteiramente produzida por mim, desde a gravação e interpretação até a edição. Estou aberto para trabalhos de dublagem, voz original e mixagem de áudio.",
      firstVideo: "https://www.youtube.com/embed/DpdHIX_2WCI?si=ggsZQeg00LZSQYKZ",

    }
  },
  { //instagram
    content: {
      src: instagram, 
      title: "Instagram",
      firstText: "Estou dando meus primeiros passos no universo dos vídeos curtos, mas já trago na bagagem a prática de edição e criação de conteúdo dinâmico. Faço cortes de podcasts, vídeos para vendas e adaptações que realmente se conectam com quem assiste. Já produzi cortes de podcast para o Grupo Polaro e já desenvolvi vídeos curtos para a Universidade da Amazônia (UNAMA) e para a Fluxo.",
      blockquoted: "true",
      firstMedia: line
    }
  },
]

const badgeStyle = {
  display: 'inline-flex',
  fontFamily: 'Arial, sans-serif',
  overflow: 'hidden',
  borderRadius: '4px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
};

const labelStyle = {
  backgroundColor: '#4c4c4c',
  color: '#fff',
  padding: '6px 10px'
};

const valueStyle = {
  backgroundColor: '#007ec6',
  color: '#fff',
  padding: '6px 10px'
};

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
  const [isLoading, setIsLoading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50 }); // Posição relativa em %

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setMousePos({ x });
  };
  

  const isMobile = width <= 768



  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth)
  }

  const handleCardClick = (card) => {
    setselectedContent(card);
    setIsLoading(true);
    setShowModal(true);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange)
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange)
    }
  }, [])

  useEffect(() => {
    if (selectedContent.blockquoted) {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      } else {
        const script = document.createElement('script');
        script.src = "https://www.instagram.com/embed.js";
        script.async = true;
        script.onload = () => {
          window.instgrm.Embeds.process();
        };
        document.body.appendChild(script);
      }
    }
  }, [selectedContent]);
  

  return (
    <div style={{ 
      width: '100%', 
      overflow: 'hidden', 
      marginTop: '20px', 
      backgroundColor: 'black',
      padding: 0,
      margin: 0
      }}>
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={isMobile ? 1 : 4}
        navigation
        loop
        style={{
          '--swiper-navigation-color': 'white',
          '--swiper-pagination-color': 'white',
          backgroundColor: 'black',
          padding: 0,
          margin: 0
        }}
        >
        {contentArray.map((item, index) => (

          <SwiperSlide
            key={index}
            style={{
              backgroundColor: 'black',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <motion.div
              whileHover={{ scale: 1.02, cursor: 'pointer' }}
              whileTap={{ scale: 0.8 }}
              style={{ width: '70%', height: 'auto', minHeight: '350px' }}
              onClick={() => handleCardClick(item.content)}
            >
              <motion.img
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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

        <Modal.Body style={{ backgroundColor: '#040509', position: 'relative' }}>

{/* Overlay de Loading no topo */}
{isLoading && (

<div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '50px',
  }}>
    <div style={{
      position: 'relative',
      display: 'inline-block',
      fontSize: '48px',
      fontWeight: 'bold',
      fontFamily: 'Arial, sans-serif',
      color: 'white',
      overflow: 'hidden'
    }}>
      <span
        className='thefont'
        style={{
        position: 'relative',
        zIndex: 1,
        color: 'white',
      }}>
        Carregando
      </span>

      <motion.span
        className='thefont'
        initial={{ width: 0 }}
        animate={{ width: isLoading ? '100%' : '0%' }}
        transition={{ 
          duration: isLoading ? 2 : 0.2, 
          ease: 'easeInOut' 
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          color: 'red',
          textShadow: '0 0 10px rgba(255, 0, 0, 0.8), 0 0 20px rgba(255, 0, 0, 0.5)',  
          zIndex: 2
        }}
      >
        Carregando
      </motion.span>
    </div>
  </div>

)}

{selectedContent.video && 
  <iframe 
    title='Vídeo Principal' 
    src={selectedContent.video} 
    allowFullScreen={true}
    style={{ ...style.modalImage, height: '500px', width: '3000px' }}
    onLoad={() => setIsLoading(false)}
  />
}

{selectedContent.upperVideo && 
  <iframe 
    title='Vídeo de cima' 
    src={selectedContent.upperVideo} 
    allowFullScreen={true}
    width="90%" 
    height={isMobile ? "220px" : "550px"} 
    style={{ ...style.modalVideo }}  
    allow="autoplay"
    onLoad={() => setIsLoading(false)}
  />
}

<div style={{
  display: 'inline-flex',
  overflow: 'hidden',
  borderRadius: '4px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
  fontFamily: 'Arial, sans-serif'
}}>



</div>

<text className='thefont' style={style.modalText}>
  {selectedContent.firstText}
</text>

<div style={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  marginTop: '20px'
}}
onClick={() => window.open('https://www.instagram.com/tiago_holles', '_blank')}
>


{selectedContent.youtubutton &&


<motion.button
className='thefont'
whileHover={{
  scale: 1.1,
  boxShadow: '0 0 20px rgba(207, 10, 10, 0.8), 0 0 40px rgba(207, 10, 10, 0.5)'
}}
whileTap={{ scale: 0.95 }}
style={{
  backgroundColor: '#000', // Interior preto
  border: '2px solid #cf0a0a', // Vermelho
  borderRadius: '8px',
  padding: '12px 24px',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '16px',
  cursor: 'pointer',
  outline: 'none',
  boxShadow: '0 0 10px rgba(207, 10, 10, 0.6)', // Glow inicial
  transition: 'all 0.3s ease',
  position: 'relative',
  boxSizing: 'border-box'
}}
  onClick={() => window.open('https://www.instagram.com/tiago_holles', '_blank')}
>
  
<FaYoutube size={18} style={{ marginRight: '8px' }} />
TheCake - YouTube

</motion.button>


}


{selectedContent.blockx &&


<motion.button
className='thefont'
whileHover={{
  scale: 1.1,
  boxShadow: '0 0 20px rgba(207, 10, 10, 0.8), 0 0 40px rgba(207, 10, 10, 0.5)'
}}
whileTap={{ scale: 0.95 }}
style={{
  backgroundColor: '#000', // Interior preto
  border: '2px solid #cf0a0a', // Vermelho
  borderRadius: '8px',
  padding: '12px 24px',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '16px',
  cursor: 'pointer',
  outline: 'none',
  boxShadow: '0 0 10px rgba(207, 10, 10, 0.6)', // Glow inicial
  transition: 'all 0.3s ease',
  position: 'relative',
  boxSizing: 'border-box',
  marginBottom: '8px'
}}
  onClick={() => window.open('https://x.com/the_cakeeeee', '_blank')}
>
  
<FaXTwitter size={18} style={{ marginRight: '8px'}} />
TheCake

</motion.button>


}

{selectedContent.blockquoted &&


<motion.button
className='thefont'
whileHover={{
  scale: 1.1,
  boxShadow: '0 0 20px rgba(207, 10, 10, 0.8), 0 0 40px rgba(207, 10, 10, 0.5)'
}}
whileTap={{ scale: 0.95 }}
style={{
  backgroundColor: '#000', // Interior preto
  border: '2px solid #cf0a0a', // Vermelho
  borderRadius: '8px',
  padding: '12px 24px',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '16px',
  cursor: 'pointer',
  outline: 'none',
  boxShadow: '0 0 10px rgba(207, 10, 10, 0.6)', // Glow inicial
  transition: 'all 0.3s ease',
  position: 'relative',
  boxSizing: 'border-box',
  marginBottom: '8px'
}}
  onClick={() => window.open('https://www.instagram.com/tiago_holles', '_blank')}
>

<FaInstagram size={18} style={{ marginRight: '8px'}} />
TheCake - Instagram

</motion.button>


}

</div>



<img 
  alt='' 
  src={selectedContent.firstMedia} 
  style={style.modalImage} 
  onLoad={() => setIsLoading(false)}
/>

{selectedContent.firstVideo &&
  <iframe 
    title='Primeiro Vídeo' 
    src={selectedContent.firstVideo} 
    allowFullScreen={true} 
    width="90%" 
    height={isMobile ? "220px" : "550px"} 
    style={{ ...style.modalVideo }}  
    allow="autoplay"
    onLoad={() => setIsLoading(false)}
  />
}

<ReactCompareSlider
  style={style.modalImage}
  itemOne={<ReactCompareSliderImage src={selectedContent.sliderImageOne} />}
  itemTwo={<ReactCompareSliderImage src={selectedContent.sliderImageTwo} />}
/>

<text className='thefont' style={style.modalText}>
  {selectedContent.secondText}
</text>

{selectedContent.secondVideo &&
  <iframe 
    title='Segundo Vídeo' 
    src={selectedContent.secondVideo} 
    allowFullScreen={true} 
    width="90%" 
    height={isMobile ? "220px" : "550px"} 
    style={{ ...style.modalVideo }}  
    allow="autoplay"
    onLoad={() => setIsLoading(false)}
  />
}

<img 
  alt='' 
  src={selectedContent.secondMedia} 
  style={style.modalImage} 
  onLoad={() => setIsLoading(false)}
/>

<text className='thefont' style={style.modalText}>
  {selectedContent.thirdText}
</text>

{selectedContent.thirdVideo &&
  <iframe 
    title='Terceiro Vídeo' 
    src={selectedContent.thirdVideo} 
    allowFullScreen={true} 
    width="90%" 
    height={isMobile ? "220px" : "550px"} 
    style={{ ...style.modalVideo }}  
    allow="autoplay"
    onLoad={() => setIsLoading(false)}
  />
}

{selectedContent.fourthVideo &&
  <iframe 
    title='Quarto Vídeo' 
    src={selectedContent.fourthVideo} 
    allowFullScreen={true} 
    width="90%" 
    height={isMobile ? "220px" : "550px"} 
    style={{ ...style.modalVideo }}  
    allow="autoplay"
    onLoad={() => setIsLoading(false)}
  />
}

{selectedContent.fifthVideo &&
  <iframe 
    title='Quinto Vídeo' 
    src={selectedContent.fifthVideo} 
    allowFullScreen={true} 
    width="90%" 
    height={isMobile ? "220px" : "550px"} 
    style={{ ...style.modalVideo }}  
    allow="autoplay"
    onLoad={() => setIsLoading(false)}
  />
}

{selectedContent.thirdMedia &&
  <img 
    alt='' 
    src={selectedContent.thirdMedia} 
    style={{ ...style.modalImage }} 
    onLoad={() => setIsLoading(false)}
  />
}

{selectedContent.fourthMedia &&
  <img 
    alt='' 
    src={selectedContent.fourthMedia} 
    style={{ ...style.modalImage, marginTop: 50 }} 
    onLoad={() => setIsLoading(false)}
  />
}

{selectedContent.fifthMedia &&
  <img 
    alt='' 
    src={selectedContent.fifthMedia} 
    style={{ ...style.modalImage, marginTop: 50 }} 
    onLoad={() => setIsLoading(false)}
  />
}



</Modal.Body>




      </Modal>

          {/* colocar profile.jpg */}

    </div>
  );
};

export default Carousel;
