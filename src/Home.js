import React, { useState, useEffect } from 'react';
import { FaTelegram } from "react-icons/fa";
import { FaMediumM } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import Dino from './Dino';
import './Home.css'; // Import Dino component directly
import { MdDownloadDone } from "react-icons/md";

function Home() {
  const [showDino, setShowDino] = useState(false);
  const [walletId, setWalletId] = useState('');
  const [click, setClick] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [message, setMessage] = useState('');

  const handleClick = () => {
    const randomNumber = 2;
    if (randomNumber === 2) {
      setShowDino(true);
    } else {
      window.location.href = 'https://twitter.com';
    }
  };

  const handleWalletIdChange = (e) => {
    setWalletId(e.target.value);
  };

  function handleID() {
    setClick(true);
    setMessage('Wallet ID Submitted!');
    setTimeout(() => {
      setMessage('');
    }, 2000); // Clear the message after 3 seconds
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={click && showDino ? 'hactive' : 'Home'} >
      {windowWidth <= 100 && (
        <>
          <h1 className="desktop-warning" style={{color:'white'}}>Please use a desktop for optimal experience</h1>
          <div className="background-blur" />
        </>
      )}
      <h1 className={click && showDino ? 'active' : 'headline'}>COMING SOON</h1>
      <div className={click && showDino ? 'active' : 'logo'}>
        <img className='imgg' src={require('./logo.png')} alt="Logo" />
        <h1 className='verti'>vertigo.</h1>
      </div>
      <div className={click && showDino ? 'active' : 'links'}>
        <FaTelegram className='logo1' />
        <FaMediumM className='logo1' />
        <FaXTwitter onClick={handleClick} className='logo1' />
        <FaDiscord className='logo1' />
      </div>
      <input 
        type="text" 
        className={click && showDino ? 'active' : 'inp'}
        placeholder="Enter Wallet Id" 
        value={walletId} 
        onChange={handleWalletIdChange} 
      />
      <MdDownloadDone onClick={handleID} size={24} className={click && showDino ? 'active' : 'icons'} />

      {message && <p className={!click   ? 'active' : 'message'}>{message}</p>}
      {click && showDino && <Dino walletId={walletId}/>}
    </div>
  );
}

export default Home;
