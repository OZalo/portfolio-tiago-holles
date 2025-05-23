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
        <video
          // autoPlay
          // loop
          muted
          // src={vi}
          style={{
            backgroundColor: 'black',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -2,
          }}
        />

        {/* Moldura PNG */}
        <img
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
        />

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
                src={'https://drive.google.com/thumbnail?id=1bQhaOCM6yFgp6ZlehNjRTOXiCz8bCHFk&sz=w1000'}
              />

            </motion.div>

          {/* Botões */}
          <div style={{ display: 'flex', gap: '15px', marginTop: '-200px' }}>
            <button
            className='thefont'
              style={{
                backgroundColor: '#cf0a0a',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
              onClick={() => window.open('https://www.instagram.com/tiago_holles', '_blank')}
            >
              Instagram
            </button>
            <button
            className='thefont'
              style={{
                backgroundColor: '#cf0a0a',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
              onClick={() => window.open('https://wa.me/91988486359', '_blank')}
            >
              Whatsapp
            </button>
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
          }}
        >
          <Carousel />
        </div>
      </div>

      <div
        style={{
          height: '10vh',
          backgroundColor: '#100f10',
          padding: '40px 20px',
        }}
      >
      </div>
    </div>
  );
};

export default App;
