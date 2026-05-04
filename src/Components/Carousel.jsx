import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Modal, CloseButton } from 'react-bootstrap';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'
import { fetchProjects } from '../services/dataService';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'bootstrap/dist/css/bootstrap.min.css';

import { FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FaInstagram } from 'react-icons/fa';

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
  const [contentArray, setContentArray] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedContent, setselectedContent] = useState({});
  const [width, setWidth] = useState(window.innerWidth)
  const [isLoading, setIsLoading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50 }); // Posição relativa em %

  useEffect(() => {
    const loadProjects = async () => {
      const data = await fetchProjects();
      setContentArray(data);
    };
    loadProjects();
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setMousePos({ x });
  };

  const isMobile = width <= 768;

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  const handleCardClick = (card) => {
    setselectedContent(card);
    setIsLoading(true);
    setShowModal(true);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

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
      marginTop: '10px', 
      backgroundColor: 'black',
      padding: '0 10px',
      display: 'flex',
      justifyContent: 'center'
      }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
        gap: '10px',
        width: '100%'
      }}>
        {contentArray.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02, cursor: 'pointer', zIndex: 2 }}
            whileTap={{ scale: 0.98 }}
            style={{ 
              aspectRatio: '1/1', 
              width: '100%',
              overflow: 'hidden',
              backgroundColor: '#111'
            }}
            onClick={() => handleCardClick(item.content)}
          >
            <motion.img
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              src={item.content.src}
              alt={item.content.title}
            />
          </motion.div>
        ))}
      </div>

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
