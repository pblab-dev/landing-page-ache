import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import '../styles/pageinitial.css';
import logo from '../assets/img/sandoz_logo.png';
import logoIni from '../assets/img/sandoz_logo_ini.png';

import btnEntrar from '../assets/img/btn_entrar.png';
import logoFooter from '../assets/img/logo_footer.png';

function PageInitial() {
  let history = useHistory();

  return (
    <div className="main-ini">
      {/* <header className="header">
        <image className="header-logo">
          <img src={logo} alt="logo_sandoz" width="100" height="40" />
        </image>
        <nav className="header-menu">
          <a href="#">Cadastre-se</a>
          <div className="header-menu-item">
            <a href="https://hall.inteegra.com.br/72692">Entrar</a>
          </div>
          <div style={{ marginTop: '2%' }}>
            <a href=" https://hall.inteegra.com.br/72692">
              <img src={btnEntrar} alt="entrar" />
            </a>
          </div>
        </nav>
      </header> */}

      <div className="main-body-wrapper">
        <div className="main-body-content">
          <p >Bem-vindo(a) ao</p>
          <div className="logo-sandoz-ini">
            <img src={logoIni} alt="logo_sandoz" height="100%" />
          </div>
          {/* <p style={{fontSize: '18px'}}>Escolha sua área de interesse</p> */}
          <div className="button-wrapper-start">
            <button onClick={() => history.push('/cadastro')}>
              Cadastre-se
            </button>
          </div>
          {/* <div className="button-wrapper">
              <button onClick={()=> history.push("/cadastro")}>SNC</button>
            </div> */}
        </div>
      </div>

      <div className="main-footer-ini">
        <img src={logoFooter} alt="logo_sandoz" />
      </div>
    </div>
  );
}

export default PageInitial;
