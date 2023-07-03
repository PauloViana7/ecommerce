import React, { useEffect, useState } from 'react';
import logo from './img/logo.png';
import './Header.css';




function Header() {

  const [menuActive, setMenuActive] = useState(false);

  useEffect(() => {
    const toggleMenu = (event) => {
      if (event.type === 'touchstart') event.preventDefault();
      setMenuActive((prevState) => !prevState);
    };

    const btnMobile = document.getElementById('btn-mobile');
    const clickMobileHome = document.getElementById('click-mobile-home');
    const clickMobileAbout = document.getElementById('click-mobile-about');
    const clickMobileContact = document.getElementById('click-mobile-contact');
    const clickMobileLogin = document.getElementById('click-mobile-login');

    btnMobile.addEventListener('click', toggleMenu);
    btnMobile.addEventListener('touchstart', toggleMenu);
    clickMobileHome.addEventListener('click', toggleMenu);
    clickMobileHome.addEventListener('touchstart', toggleMenu);
    clickMobileAbout.addEventListener('click', toggleMenu);
    clickMobileAbout.addEventListener('touchstart', toggleMenu);
    clickMobileContact.addEventListener('click', toggleMenu);
    clickMobileContact.addEventListener('touchstart', toggleMenu);
    clickMobileLogin.addEventListener('click', toggleMenu);
    clickMobileLogin.addEventListener('touchstart', toggleMenu);

    return () => {
      btnMobile.removeEventListener('click', toggleMenu);
      btnMobile.removeEventListener('touchstart', toggleMenu);
      clickMobileHome.removeEventListener('click', toggleMenu);
      clickMobileHome.removeEventListener('touchstart', toggleMenu);
      clickMobileAbout.removeEventListener('click', toggleMenu);
      clickMobileAbout.removeEventListener('touchstart', toggleMenu);
      clickMobileContact.removeEventListener('click', toggleMenu);
      clickMobileContact.removeEventListener('touchstart', toggleMenu);
      clickMobileLogin.removeEventListener('click', toggleMenu);
      clickMobileLogin.removeEventListener('touchstart', toggleMenu);
    };
  }, []);

  useEffect(() => {
    const nav = document.getElementById('nav');
    nav.classList.toggle('active', menuActive);
  }, [menuActive]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const storedData = localStorage.getItem('userId');
  
    if (storedData) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
  };

  return (
    <header id="header">

      <a id="logo" href="/">
        <img src={logo} alt='logo' />
        <div className="text-logo">
          <b>
            STOP TIME
          </b>
          <p>
            Compre, relaxe, aproveite!
          </p>
        </div>
      </a>
      <nav id="nav">
        <button
          aria-label="Abrir Menu"
          id="btn-mobile"
          aria-haspopup="true"
          aria-controls="menu"
          aria-expanded="false"
        >
          <span id="hotdog" />
        </button>
        <ul id="menu" role="menu">
          <li>
          {isLoggedIn && (
            <a id="" href="Cart">
              <i className='bx bx-cart'></i>
            </a>
            )}
          </li>
          <li>
            <a id="click-mobile-home" href="/">
              Loja{" "}
            </a>
          </li>
          <li>
            <a id="click-mobile-about" href="About">
              Sobre{" "}
            </a>
          </li>
          <li>
            <a id="click-mobile-contact" href="Contact">
              Contato{" "}
            </a>
          </li>
          <li>
            <nav id="nav">
              {isLoggedIn ? (
                <button onClick={handleLogout}>Sair</button>
              ) : (
                <a id="click-mobile-login" href="AuthForm">
                  Entrar
                </a>
              )}
            </nav>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;


