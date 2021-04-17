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

const eventId = 73498

const estados = [{"Text":"Selecione"},{"Text":"AC"},{"Text":"AL"},{"Text":"AM"},{"Text":"AP"},{"Text":"BA"},{"Text":"CE"},{"Text":"DF"},{"Text":"ES"},{"Text":"GO"},{"Text":"MA"},{"Text":"MG"},{"Text":"MS"},{"Text":"MT"},{"Text":"PA"},{"Text":"PB"},{"Text":"PE"},{"Text":"PI"},{"Text":"PR"},{"Text":"RJ"},{"Text":"RN"},{"Text":"RO"},{"Text":"RR"},{"Text":"RS"},{"Text":"SC"},{"Text":"SE"},{"Text":"SP"},{"Text":"TO"}];


const validationSchema = yup.object({
  nome: yup.string('').required('Nome é requerida'),
  crm: yup.string('').trim().required('CRM é requerido'),
  cpf: yup.string('').trim().required('CPF é requerido'),
  celular: yup.string('').trim().required('CELULAR é requerido'),
  cidade: yup.string('').trim().required('CIDADE é requerido'),
  estado: yup.string('').trim().required('ESTADO é requerido'),
  especialidade: yup.string('').trim().required('ESPECIALIDADE é requerido'),
});

function Main() {
  const [areaSelected, setAreaSelected] = useState('');
  const [isVisibleTerm, setIsVisibleTerm] = useState(false);
  const formik = useFormik({
    initialValues: {
      nome: '',
      email: '',
      crm: '',
      cpf: '',
      celular: '',
      cidade: '',
      estado: '',
      especialidade: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      let arrayObj = [];
      let objValue = {};
      let _email = '';
      Object.keys(values).forEach((e) => {
        if (e === 'nome') {
          objValue = { id: 193380, value: values[e] };
        }
        if (e === 'email') {
          objValue = { id: 193381, value: values[e] };
        }
        if (e === 'crm') {
          objValue = { id: 194575, value: values[e] };
        }
        if (e === 'cpf') {
          _email = values[e];
          objValue = { id: 194576, value: values[e] };
        }
        if (e === 'celular') {
          objValue = { id: 194577, value: `${values[e]}` };
        }
        if (e === 'cidade') {
          objValue = { id: 194578, value: values[e] };
        }
        if (e === 'estado') {
          objValue = { id: 194579, value: values[e] };
        }
        if (e === 'especialidade') {
          objValue = { id: 194588, value: values[e] };
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
        window.location.href = `https://hall.inteegra.com.br/73498?token=${_token}`;
      } else {
        addNewUserApi(arrayObj, false, grupoId, eventId)
          .then(async (res) => {
            resetForm({ values: '' });
            var _textHtml = getHtmlString()/* .replace(
              '{NOMECONVIDADO}',
              res.name
            ); */
            
             await sendEmailApi(res.email, 'JORNADA ONLINE DE ATUALIZAÇÃO MÉDICA', _textHtml)
              .then(() => {
                console.log("Email enviado com sucesso");
                //window.location.href = `/success`;
              })
              .catch(() => {
                console.log("Erro ao enviar email");
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
  }, []);

  const lista = cardioRepList
    .sort((a, b) => a.nome.localeCompare(b.nome))
    .map((e) => (
      <option key={e.nome} value={e.nome}>
        {e.nome}
      </option>
    ));
  return (
    <div className="main">
      <div className="main-sub">
        <div className="main-body"  style={{ width: "100%"}}>
          <div className="form-wrapper" style={{ width: "100%"}}>
            <form onSubmit={formik.handleSubmit}>
            <div style={{ padding: "9%"}}>
              <div id="div_189658" className="form-group" style={{textAlign: "left"}}>
                <label id="label_189658">Nome Completo (*)</label> 
                <input 
                    id="nome" 
                    enabled 
                    name="nome" 
                    style={{fontSize: '12px'}} 
                    className="form-control Enabled" 
                    autoComplete="off" 
                    required 
                    title 
                    maxLength={300} 
                    data-original-title 
                    aria-required="true" 
                    onChange={formik.handleChange}
                    value={formik.values.nome}
                    />
              </div>              
              <div id="div_189659" className="form-group" style={{textAlign: "left"}}>
                <label id="label_189659">Email (*)</label> 
                <input 
                  id="email" 
                  enabled 
                  name="email" 
                  style={{fontSize: '12px'}} 
                  className="form-control Enabled" 
                  autoComplete="off" 
                  required 
                  title 
                  maxLength={100} 
                  data-original-title 
                  aria-required="true" 
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  />
              </div>
              <div id="div_189671" className="form-group" style={{textAlign: "left"}}>
                <label id="label_189671">CRM (*)</label> 
                <input 
                  id="crm" 
                  enabled 
                  name="crm" 
                  style={{fontSize: '12px'}} 
                  className="form-control Enabled" 
                  autoComplete="off" 
                  required 
                  data-mascara-value="(00)00000-0000" 
                  title maxLength={15} 
                  data-original-title 
                  aria-required="true" 
                  onChange={formik.handleChange}
                  value={formik.values.crm}
                />
              </div>
              <div id="div_189671" className="form-group" style={{textAlign: "left"}}>
                <label id="label_189671">CPF (*)</label> 
                <input 
                  id="cpf" 
                  enabled 
                  name="cpf" 
                  style={{fontSize: '12px'}} 
                  className="form-control Enabled" 
                  autoComplete="off" 
                  required 
                  data-mascara-value="(00)00000-0000" 
                  title maxLength={15} 
                  data-original-title 
                  aria-required="true" 
                  onChange={formik.handleChange}
                  value={formik.values.cpf}
                />
              </div>
              <div id="div_189671" className="form-group" style={{textAlign: "left"}}>
                <label id="label_189671">Celular (*)</label> 
                <input 
                  id="celular" 
                  enabled 
                  name="celular" 
                  style={{fontSize: '12px'}} 
                  className="form-control Enabled" 
                  autoComplete="off" 
                  required 
                  data-mascara-value="(00)00000-0000" 
                  title maxLength={15} 
                  data-original-title 
                  aria-required="true" 
                  onChange={formik.handleChange}
                  value={formik.values.celular}
                />
              </div>
              <div id="div_189666" className="form-group" style={{textAlign: "left"}}>
                <label id="label_189666">Estado (*)</label> 
                <select 
                  id="estado" 
                  name="estado" 
                  style={{height: '35px', fontSize: '12px'}} 
                  className="form-control cssNotReadOnly valid" 
                  required 
                  title 
                  data-original-title 
                  aria-required="true" 
                  aria-invalid="false"
                  onChange={formik.handleChange}
                  value={formik.values.estado}
                  >
                    {estados.map((e,index)=> 
                      <option selected value={e.Text}>
                        {e.Text}
                      </option>
                    )}                  
                </select>
              </div>
              <div id="div_189671" className="form-group" style={{textAlign: "left"}}>
                <label id="label_189671">Cidade (*)</label> 
                <input 
                  id="cidade" 
                  enabled 
                  name="cidade" 
                  style={{fontSize: '12px'}} 
                  className="form-control Enabled" 
                  autoComplete="off" 
                  required 
                  data-mascara-value="(00)00000-0000" 
                  title maxLength={15} 
                  data-original-title 
                  aria-required="true" 
                  onChange={formik.handleChange}
                  value={formik.values.cidade}
                />
              </div>
              <div id="div_189671" className="form-group" style={{textAlign: "left"}}>
                <label id="label_189671">Especialidade (*)</label> 
                <input 
                  id="especialidade" 
                  enabled 
                  name="especialidade" 
                  style={{fontSize: '12px'}} 
                  className="form-control Enabled" 
                  autoComplete="off" 
                  required 
                  data-mascara-value="(00)00000-0000" 
                  title maxLength={15} 
                  data-original-title 
                  aria-required="true" 
                  onChange={formik.handleChange}
                  value={formik.values.especialidade}
                />
              </div>
            </div>            
            <div className="form-group div_button_register" style={{marginBottom: "9%"}}>
              <button type="submit" style={{
                    width: 300,
                    margin: "0 auto",
                    fontSize: 15,
                    backgroundColor: "#696969",
                    color: 'white'
              }} name="btnSalvarLandingPage" value="LandingPage" id="btnSalvar" onclick="AdicionarSubmitButtonFormulario()" className="btn btn-secondary button_register" data-original-title title>Registrar-se</button>
              <div id="imgLoadingResponsive" className="hidden" style={{marginTop: '20px'}}>
                <div className="progress" style={{height: '25px'}}>
                  <div style={{height: '35px'}} className="progress-bar progress-bar-striped progress-bar-animated" id="progressBar" role="progressbar" aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}>
                    <p id="nmrPerc" />
                  </div>
                </div>
              </div>
            </div>
            </form>
          </div>
        </div>
        <div className="main-footer">
          <img src={logoFooter} alt="logo_sandoz" width="100%" height="0px"/>
        </div>
      </div>
    </div>
  );
}

export default Main;
