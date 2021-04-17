import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import '../styles/cardiologialistaeventos.css';
import logo from '../assets/img/sandoz_logo.png';
import logoIni from '../assets/img/sandoz_logo_ini.png';

import btnEntrar from '../assets/img/btn_entrar.png';
import logoFooter from '../assets/img/logo_footer.png';

function CardiologiaList() {
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

      <div className="cardio-main-body-wrapper-pos">
        <div className="main-body-content-pos">
          <p>Bem-vindo(a) ao</p>
          <div className="logo-sandoz-ini">
            <img src={logoIni} alt="logo_sandoz" height="100%" />
          </div>
          {/* <p style={{ marginTop: '2%', fontSize: '1.2vw' }}> */}
          <div className="cardio-title-above-button">Clique na data referente</div> 
           <div className="cardio-title-li2-above-button">ao seu convite:</div> 
          {/* </p> */}
          <div className="cardio-button-wrapper-start">
            <button onClick={() => history.push('/event160321')}>
              16/03/2021
            </button>
          </div>
          <div className="cardio-button-wrapper-start">
            <button onClick={() => history.push('/event230321')}>
              23/03/2021
            </button>
          </div>
          <div className="cardio-button-wrapper-start">
            <button onClick={() => history.push('/event300321')}>
              30/03/2021
            </button>
          </div>
          <div className="cardio-button-wrapper-start">
            <button onClick={() => history.push('/event130421')}>
              13/04/2021
            </button>
          </div>
        </div>
      </div>

      <div className="main-footer-ini">
        <img src={logoFooter} alt="logo_sandoz" />
      </div>
    </div>
  );
}

export default CardiologiaList;
