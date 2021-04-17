import React, { useState, useEffect } from 'react';
import '../styles/main.css';
import logo from '../assets/img/IMAGEM001.png';
import btnEntrar from '../assets/img/btn_entrar.png';
import logoIni from '../assets/img/IMAGEM001.png';

import logoFooter from '../assets/img/IMAGEM002.png';
import { cardioRepList, sncRepList } from './static';
import { useFormik, Field } from 'formik';
import * as yup from 'yup';

import { addNewUserApi } from '../services/userService';
import { sendEmailApi, getHtmlString } from '../services/emailService';
import { getTokenUserApi } from '../services/tokenService';
import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';

const linkTermo = 'https://s3.us-east-1.amazonaws.com/bucket.aws.public/hall_72692/TERMO%20DE%20ACEITE/Template%20Aviso%20de%20Privacidade%20Sandoz%20Talks.pdf'
const eventId = 72692


const validationSchema = yup.object({
  areaInteresse: yup.string('').required('Area de interesse é requerida'),
  representante: yup.string('').required('Rerpresentante é requerido'),
  nome: yup.string('').trim().required('Nome completo é requerido'),
  crm: yup.string('').trim().required('CRM é requerido'),
  email: yup
    .string('')
    .email('Digite um email válido')
    .required('Email é requerido'),
  termoPrivacidade: yup
    .bool()
    .oneOf([true], 'Termo requerido'),
  informacoes: yup
    .bool()
    .oneOf([true], 'Termo requerido'),
});

function Main() {
  
  return (
    <div className="main">
      <div className="main-sub">
        {/* {isVisibleTerm && <button style={{marginLeft: '20%', width: '5%'}}>Fechar Termo</button> }
        {isVisibleTerm && <iframe  style={{marginTop: '2%', marginLeft: '20%', position: 'absolute', width: '60%', height: '80%', index:999}} src={linkTermo} title="Termo "></iframe>} */}

        {/* <header className="header">
          <image className="header-logo">
            <img src={logo} alt="logo_sandoz" width="100" height="40" />
          </image>        
        </header> */}

        {/* <div className="logo-ini-cad">
          <img src={logoIni} alt="logo_sandoz" height="50%" />
        </div> */}
        <div className="main-body"  style={{ width: "100%"}}>
          <div className="form-wrapper" style={{ width: "100%"}}>
            <div style={{
              borderRadius: 10,
              padding: 26,
              paddingBottom: 50,
              paddingTop: 50,
              marginBottom: 10,
              fontSize: 18,
              fontFamily: 'sans-serif',
              textAlign: "initial"
            }}>
              <p style={{marginLeft: 80, marginRight: 80}}><span style={{fontSize: 18}}><br/></span></p>
              <p style={{marginLeft: 80, marginRight: 80}}>Seja bem-vindo(a)!</p>
              <p style={{marginLeft: 80, marginRight: 80}}><span style={{fontSize: 18}}><br/></span></p>
              <p style={{marginLeft: 80, marginRight: 80}}>Seu cadastro para a JORNADA ONLINE DE ATUALIZAÇÃO MÉDICA  foi realizado com sucesso.</p>
              <p style={{marginLeft: 80, marginRight: 80}}><span style={{fontSize: 18}}><br/></span></p>
              <p style={{marginLeft: 80, marginRight: 80}}>Estamos preparando tudo para tornar esse dia ainda mais produtivo e especial.</p>
              <p style={{marginLeft: 80, marginRight: 80}}><span style={{fontSize: 18}}><br/></span></p>
              <p style={{marginLeft: 80, marginRight: 80}}>Para que lembre da data e não se atrase para o nosso evento, clique nos botões abaixo e salve no seu calendário.</p>
              <p style={{marginLeft: 80, marginRight: 80}}><span style={{fontSize: 18}}><br/></span></p>
              <p style={{marginLeft: 80, marginRight: 80}}><span style={{fontSize: 18}}><br/></span></p>
              <p style={{marginLeft: 80, marginRight: 80}}>Você receberá mais informações através do e-mail cadastrado.</p>
              <p style={{marginLeft: 80, marginRight: 80}}><span style={{fontSize: 18}}><br/></span></p>
              <p style={{marginLeft: 80, marginRight: 80}}>Nos vemos em breve!</p>
            </div>
          </div>
        </div>
        <div className="main-footer" style={{
          bottom: 0,
          position: "relative"
        }}>
          <img src={logoFooter} alt="logo_sandoz" width="100%" height="0px"/>
        </div>
      </div>
    </div>
  );
}

export default Main;
