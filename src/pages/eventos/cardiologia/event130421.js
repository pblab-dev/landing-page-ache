import React, { useState, useEffect } from 'react';
import '../../../styles/main.css';
import logoIni from '../../../assets/img/sandoz_logo_ini.png';

import logoFooter from '../../../assets/img/logo_footer.png';
import { useFormik, Field } from 'formik';
import * as yup from 'yup';

import { addNewUserApi } from '../../../services/userService';
import { sendEmailApi, getHtmlString } from '../../../services/emailService';
import { getTokenUserApi } from '../../../services/tokenService';
import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';

const linkTermo = 'https://s3.us-east-1.amazonaws.com/bucket.aws.public/hall_72692/TERMO%20DE%20ACEITE/Template%20Aviso%20de%20Privacidade%20Sandoz%20Talks.pdf'
const eventId = 72769
const linkCadastro = 'event130421'

const cardioRepList = [
  { nome: '', grupoId: 0 },
  { nome: 'Natalia Garbeline', grupoId: 21093 },
  { nome: 'Sergio Ricardo Ribeiro', grupoId: 21094 },
  { nome: 'Joao Ricardo Alves Franca', grupoId: 21095 },
  { nome: 'William Hokama', grupoId: 21096 },
  { nome: 'Valeria Ferreira De Lima', grupoId: 21097 },
  { nome: 'Lucas Dos Santos Eifler', grupoId: 21098 },
  { nome: 'Gisele Fernandes De Oliveira', grupoId: 21099 },
  { nome: 'Talitha Policarpo', grupoId: 21100 },
  { nome: 'Wesley Morais De Freitas', grupoId: 21101 },
  { nome: 'Raquel de Araujo', grupoId: 21102 },
  { nome: 'Gisele Fernandes De Oliveira', grupoId: 21103 },
  { nome: 'Luigi Oliveira', grupoId: 21110 },
];

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
  const [areaSelected, setAreaSelected] = useState('');
  const [isVisibleTerm, setIsVisibleTerm] = useState(false);
  const formik = useFormik({
    initialValues: {
      areaInteresse: 'cardiologia',
      representante: '',
      nome: '',
      crm: '',
      email: '',
      termoPrivacidade: false,
      informacoes: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      let arrayObj = [];
      let objValue = {};
      let _email = '';
      Object.keys(values).forEach((e) => {
        if (e === 'areaInteresse') {
          objValue = { id: 189964, value: values[e] };
        }
        if (e === 'crm') {
          objValue = { id: 189960, value: values[e] };
        }
        if (e === 'email') {
          _email = values[e];
          objValue = { id: 189568, value: values[e] };
        }
        if (e === 'informacoes') {
          objValue = { id: 189963, value: `${values[e]}` };
        }
        if (e === 'nome') {
          objValue = { id: 189567, value: values[e] };
        }
        if (e === 'representante') {
          objValue = { id: 189961, value: values[e] };
        }
        if (e === 'termoPrivacidade') {
          objValue = { id: 189962, value: `${values[e]}` };
        }
        arrayObj.push(objValue);
      });

      const grupoId = cardioRepList
        .filter((e) => e.nome === formik.values.representante)
        .map((e) => e.grupoId)[0];

      // Verifica se o usuário já possui cadastro
      var _token = null;
      await getTokenUserApi(_email, eventId)
        .then((res) => {
          _token = res;
        })
        .catch((err) => {
          console.log(err);
        });

      if (_token) {
        window.location.href = `https://hall.inteegra.com.br/72769?token=${_token}`;
      } else {
        addNewUserApi(arrayObj, false, grupoId, eventId)
          .then(async (res) => {
            resetForm({ values: '' });
            var _textHtml = getHtmlString(linkCadastro).replace(
              '{NOMECONVIDADO}',
              res.name
            );

            await sendEmailApi(res.email, 'EVENTO SANDOZ TALKS', _textHtml)
              .then(() => {
                console.log("Email enviado com sucesso");
              })
              .catch(() => {
                console.log("Erro ao enviar email");
              });

            await getTokenUserApi(_email, eventId)
              .then((res) => {
                _token = res;
                window.location.href = `https://hall.inteegra.com.br/72769?token=${_token}`;
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            alert(
              'Erro, não foi possível realizar o cadastro: ',
              err.toString()
            );
          });
      }
    },
  });
  useEffect(() => {
    formik.setFieldValue('areaInteresse', 'cardiologia');
  }, []);

  // useEffect(() => {
  //   formik.setFieldValue('representante', '');
  // }, [areaSelected]);
  const lista = cardioRepList
    .sort((a, b) => a.nome.localeCompare(b.nome))
    .map((e) => (
      <option key={e.nome} value={e.nome}>
        {e.nome}
      </option>
    ));
  // const lista =
  //   areaSelected === 'cardiologia'
  //     ? cardioRepList
  //         .sort((a, b) => a.nome.localeCompare(b.nome))
  //         .map((e) => <option key={e.nome} value={e.nome}>{e.nome}</option>)
  //     : areaSelected !== ''
  //     ? sncRepList
  //         .sort((a, b) => a.nome.localeCompare(b.nome))
  //         .map((e) => <option key={e.nome} value={e.nome}>{e.nome}</option>)
  //     : [];

  return (
    <div className="main">
      {/* {isVisibleTerm && <button style={{marginLeft: '20%', width: '5%'}}>Fechar Termo</button> }
      {isVisibleTerm && <iframe  style={{marginTop: '2%', marginLeft: '20%', position: 'absolute', width: '60%', height: '80%', index:999}} src={linkTermo} title="Termo "></iframe>} */}

      {/* <header className="header"> */}
      {/* <image className="header-logo">
          <img src={logo} alt="logo_sandoz" width="100" height="40" />
        </image>
        <nav className="header-menu">
          <a href="#">Cadastre-se</a>
          <div className="header-menu-item">
            <a href="https://hall.inteegra.com.br/72769">Entrar</a>
          </div>
          <div style={{ marginTop: '2%' }}>
            <a href=" https://hall.inteegra.com.br/72769">
              <img src={btnEntrar} alt="entrar" />
            </a>
          </div>
        </nav> */}
      {/* </header> */}

      <div className="logo-ini-cad">
        <img src={logoIni} alt="logo_sandoz" height="50%" />
      </div>
      <div className="main-body">
        <div className="form-wrapper">
          <div className="data-event-title">Data: 13/04/2021</div>
          <form onSubmit={formik.handleSubmit}>
            {/* <div className="form-row">
            <div className="input-label">
              <div className="input-label-first-row">* Selecione a área</div>
              <div>de interesse:</div>
            </div>
            <div className="input-wrapper">
              <select
                id="areainteresse"
                name="areainteresse"
                style={{ width: '92%' }}
                onChange={(e) => {
                  formik.setFieldValue('areaInteresse', e.target.value);
                  setAreaSelected(e.target.value);
                }}
                value={formik.values.areaInteresse}
              > */}
            {/* <option value=""></option> */}
            {/* <option value="cardiologia">Cardiologia</option> */}
            {/* <option value="SNC">SNC</option> */}
            {/* </select> */}
            {/* </div> */}
            {/* </div> */}
            {/* <div className="formik-message-error">
            {formik.touched.areaInteresse && formik.errors.areaInteresse}
          </div> */}
            <div className="form-row">
              <div className="input-label">
                <div className="input-label-first-row">* Selecione o seu</div>
                <div>Representante:</div>
              </div>
              <div className="input-wrapper">
                <select
                  id="representante"
                  name="representante"
                  style={{ width: '92%' }}
                  value={formik.values.representante}
                  onChange={(e) => {
                    formik.setFieldValue('representante', e.target.value);
                  }}
                >
                  {lista}
                </select>
              </div>
            </div>
            <div className="formik-message-error">
              {formik.touched.representante && formik.errors.representante}
            </div>

            <div className="form-row">
              <div className="input-label">
                <div className="input-label-first-row">* Nome</div>
                <div>Completo:</div>
              </div>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formik.values.nome}
                  placeholder="Digite o nome completo"
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <div className="formik-message-error">
              {formik.touched.nome && formik.errors.nome}
            </div>

            <div className="form-row">
              <div className="input-label">
                <div>* e-mail:</div>
              </div>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  placeholder="Digite o e-mail completo"
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <div className="formik-message-error">
              {formik.touched.email && formik.errors.email}
            </div>

            <div className="form-row">
              <div className="input-label">
                <div>* CRM:</div>
              </div>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="crm"
                  name="crm"
                  value={formik.values.crm}
                  placeholder="Digite o CRM"
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <div className="formik-message-error">
              {formik.touched.crm && formik.errors.crm}
            </div>

            {/* termos  */}

            <div className="term-wrapper">
              <div className="form-row-term">
                <div className="term-input-label" >
                  *
                </div>
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        id="termoPrivacidade"
                        color="primary"
                        name="termoPrivacidade"
                        value={formik.values.termoPrivacidade}
                        onChange={(values) =>
                          formik.setFieldValue(
                            'termoPrivacidade',
                            !formik.values.termoPrivacidade
                          )
                        }
                      />
                    }
                    label={
                      <div className="term-input-wrapper">
                        <p style={{ margin: 0 }}>Concordo com os <span><a target="_blank" href={linkTermo}>termos de privacidade.</a></span> </p>
                      </div>
                    }
                  />
                </FormGroup>
              </div>
              <div className="formik-message-error-term">
                {formik.touched.termoPrivacidade &&
                  formik.errors.termoPrivacidade}
              </div>
              <div className="form-row-term">
                <div className="term-input-label" >
                  *
                </div>
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        id="informacoes"
                        color="primary"
                        name="informacoes"
                        value={formik.values.informacoes}
                        onChange={(values) =>
                          formik.setFieldValue(
                            'informacoes',
                            !formik.values.informacoes
                          )
                        }
                      />
                    }
                    label={
                      <div className="term-input-wrapper">
                        <div className="term-input-wrapper">
                          <div>Eu declaro que sou um profissional </div>
                          <div>de saúde habilitado no Brasil e confirmo </div>
                          <div>a veracidade das informações preenchidas. </div>
                        </div>
                      </div>
                    }
                  />
                </FormGroup>
              </div>
              <div className="formik-message-error-term">
                {formik.touched.informacoes &&
                  formik.errors.informacoes}
              </div>
            </div>
            <div className="form-row">
              <div className="button-wrapper">
                <button type="submit">Salvar Cadastro</button>
              </div>
            </div>
          </form>

          <div className="form-row">
            <div className="button-wrapper">
              <button
                onClick={() =>
                  (window.location.href = 'https://hall.inteegra.com.br/72769')
                }
              >
                Entrar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="main-footer">
        <img src={logoFooter} alt="logo_sandoz" />
      </div>
    </div>
  );
}

export default Main;
