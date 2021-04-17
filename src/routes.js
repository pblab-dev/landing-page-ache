import React from "react";
import { Switch, Route } from "react-router-dom";

import Abertura from "./pages/PageInitial";
import Abertura2 from "./pages/PageInitialPos0903";
import Cardiologia from "./pages/Cardiologialistaeventos";
import Snc from "./pages/Snclistaeventos";

import Cadastro from "./pages/Main";
import Event160321 from "./pages/eventos/cardiologia/event160321";
import Event230321 from "./pages/eventos/cardiologia/event230321";
import Event300321 from "./pages/eventos/cardiologia/event300321";
import Event130421 from "./pages/eventos/cardiologia/event130421";

import Event240321 from "./pages/eventos/snc/event240321";
import Event270421 from "./pages/eventos/snc/event270421";


function Routes(){
  return (
    <Switch>
      <Route exact path="/" component={Cadastro} />
      <Route exact path="/eventpos0903" component={Abertura2} />
      <Route exact path="/cardiologia" component={Cardiologia} />
      <Route exact path="/success" component={Snc} />
      <Route exact path="/event240321" component={Event240321} />
      <Route exact path="/event270421" component={Event270421} />
      <Route exact path="/cadastro" component={Cadastro} />
      <Route exact path="/event160321" component={Event160321} />
      <Route exact path="/event230321" component={Event230321} />
      <Route exact path="/event300321" component={Event300321} />
      <Route exact path="/event130421" component={Event130421} />

    </Switch>
  );
};

export default Routes;