import React, { useEffect } from 'react';
import moldura from '../src/Assets/moldura.png';
import Carousel from './Components/Carousel';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import logov2  from '../src/Assets/Banners/logo.png'



const App = () => {

  const [width, setWidth] = React.useState(window.innerWidth)

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth)
  }

  const isMobile = width <= 768


  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange)
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange)
    }
  }, [])

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      <div style={{ position: 'relative', height: '130vh', overflow: 'hidden' }}>
      <div style={{
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'black',
  zIndex: -1,
  opacity: 1
}} />


        {/* Moldura PNG */}
        {/* <img
          src={moldura}
          alt="Moldura decorativa"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1,
            pointerEvents: 'none',
          }}
        /> */}

        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            color: 'white',
            zIndex: 1,
            maxWidth: '500px',
          }}
        >

          <motion.div style={{display: 'flex', justifyContent:'space-between', gap: '150px'}} >
              
              {/* Logo */}
              <motion.img
                style={{ width: '100%', height: '100%', minHeight: isMobile? '310px' :'350px', minWidth: isMobile? '340px' :'690px' }}
                src={logov2}
              />
              
              {/* Foto */}
              <motion.img
                style={{ width: '100%', height: '100%', minHeight: '550px', minWidth: '890px' }}
                src={'https://drive.google.com/thumbnail?id=1pDdkctewGRhz8UaZgKaEsZnpYZanqtUz&sz=w1000'}
              />

            </motion.div>

          {/* Botões */}
          <div style={{ display: 'flex', gap: '30px', marginTop: '-200px' }}>
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
              Instagram
            </motion.button>
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
              onClick={() => window.open('https://wa.me/91988486359', '_blank')}
            >
              WhatsApp
            </motion.button>



          </div>


          <div className='thefont' style={{ display: 'flex', color: 'white', marginTop: '100px', gap: '10px', fontSize: 23, flexWrap: 'wrap' }}>
  <FaStar style={{ color: '#cf0a0a', marginTop: '5px' }} />
  <span>
    MINHAS HABILIDADES
    {isMobile && <br />}
    E PROJETOS
  </span>
</div>



        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '0%',
            width: '100%',
            zIndex: 1,
            padding: '0 20px',
            textAlign: 'center',
            backgroundColor: 'black'
          }}
        >
          <Carousel />
        </div>
      </div>

      <div
        style={{
          height: '10vh',
          backgroundColor: 'black',
          padding: '40px 20px',
        }}
      >
      </div>
    </div>
  );
};

export default App;
